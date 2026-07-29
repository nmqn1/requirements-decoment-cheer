import { GoogleGenAI, Type } from "@google/genai";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "50mb" }));

// Gemini helper
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is missing.");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// Analysis API endpoint
app.post("/api/analyze", async (req, res) => {
  try {
    const { reqDoc, propDoc, options } = req.body;

    if (!reqDoc || !propDoc) {
      return res.status(400).json({ error: "Both requirement and proposal documents are required." });
    }

    const ai = getGeminiClient();

    const strictness = options?.strictness || "standard";
    const customInstructions = options?.customInstructions || "";

    // Build prompt parts
    const parts: any[] = [];

    parts.push({
      text: `You are an expert Procurement, Legal, and Technical Compliance Auditor.
Your task is to analyze a Requirements Document against a Proposal Response Document.

Strictness level: ${strictness.toUpperCase()}
${customInstructions ? `Additional Instructions: ${customInstructions}` : ''}

CRITICAL INSTRUCTIONS:
1. Extract ALL individual requirement clauses from the Requirements Document.
2. For EACH requirement clause:
   - Identify requirement ID (e.g. REQ-001, REQ-002), title, category, and exact location/page in requirements document.
   - Cross-reference with the Proposal Document to see if the requirement is satisfied.
   - Assign Status: "COMPLIANT" (fully satisfied with evidence), "PARTIAL" (partially addressed or subject to extra fees/conditions), "MISSING" (not addressed or explicitly rejected), or "UNCLEAR" (vague/ambiguous).
   - Find direct supporting quote/evidence from proposal with page number or section location if available.
   - Highlight any gap, risk, or condition.
   - Provide an actionable recommendation or follow-up question for negotiators/auditors.
   - Set Priority ("CRITICAL", "HIGH", "MEDIUM", "LOW") and Confidence ("HIGH", "MEDIUM", "LOW").
3. Compute summary metrics: overall completion percentage (0-100), total count, compliant count, partial count, missing count, unclear count, and critical gaps count.
4. Generate category breakdown statistics.
5. Provide high-level executive strategic recommendations.`
    });

    // Handle Requirements document content
    if (reqDoc.base64 && reqDoc.mimeType) {
      parts.push({ text: `\n=== REQUIREMENTS DOCUMENT (${reqDoc.name}) ===\n` });
      parts.push({
        inlineData: {
          mimeType: reqDoc.mimeType === 'application/pdf' ? 'application/pdf' : 'text/plain',
          data: reqDoc.base64
        }
      });
    } else if (reqDoc.text) {
      parts.push({ text: `\n=== REQUIREMENTS DOCUMENT (${reqDoc.name}) ===\n${reqDoc.text}\n` });
    }

    // Handle Proposal document content
    if (propDoc.base64 && propDoc.mimeType) {
      parts.push({ text: `\n=== PROPOSAL DOCUMENT (${propDoc.name}) ===\n` });
      parts.push({
        inlineData: {
          mimeType: propDoc.mimeType === 'application/pdf' ? 'application/pdf' : 'text/plain',
          data: propDoc.base64
        }
      });
    } else if (propDoc.text) {
      parts.push({ text: `\n=== PROPOSAL DOCUMENT (${propDoc.name}) ===\n${propDoc.text}\n` });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: { parts },
      config: {
        temperature: 0.2,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING, description: "Executive summary of audit findings" },
            completionPercentage: { type: Type.NUMBER, description: "Overall compliance score between 0 and 100" },
            totalRequirements: { type: Type.INTEGER },
            compliantCount: { type: Type.INTEGER },
            partialCount: { type: Type.INTEGER },
            missingCount: { type: Type.INTEGER },
            unclearCount: { type: Type.INTEGER },
            criticalGapsCount: { type: Type.INTEGER },
            categoriesBreakdown: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  category: { type: Type.STRING },
                  total: { type: Type.INTEGER },
                  compliant: { type: Type.INTEGER },
                  partial: { type: Type.INTEGER },
                  missing: { type: Type.INTEGER },
                  unclear: { type: Type.INTEGER },
                  percentage: { type: Type.NUMBER }
                },
                required: ["category", "total", "compliant", "partial", "missing", "unclear", "percentage"]
              }
            },
            requirements: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  category: { type: Type.STRING },
                  title: { type: Type.STRING },
                  originalText: { type: Type.STRING },
                  reqPageLocation: { type: Type.STRING },
                  status: { type: Type.STRING, description: "COMPLIANT, PARTIAL, MISSING, or UNCLEAR" },
                  proposalMatch: { type: Type.STRING },
                  propPageLocation: { type: Type.STRING },
                  evidenceExcerpt: { type: Type.STRING },
                  gapDescription: { type: Type.STRING },
                  confidence: { type: Type.STRING, description: "HIGH, MEDIUM, or LOW" },
                  recommendation: { type: Type.STRING },
                  priority: { type: Type.STRING, description: "CRITICAL, HIGH, MEDIUM, or LOW" }
                },
                required: ["id", "category", "title", "originalText", "status", "confidence", "recommendation", "priority"]
              }
            },
            globalRecommendations: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: [
            "summary",
            "completionPercentage",
            "totalRequirements",
            "compliantCount",
            "partialCount",
            "missingCount",
            "unclearCount",
            "criticalGapsCount",
            "categoriesBreakdown",
            "requirements",
            "globalRecommendations"
          ]
        }
      }
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("No response generated from Gemini API.");
    }

    const parsedResult = JSON.parse(resultText);

    // Attach metadata
    parsedResult.analyzedAt = new Date().toISOString();
    parsedResult.reqDocName = reqDoc.name || "Requirements.pdf";
    parsedResult.propDocName = propDoc.name || "Proposal.pdf";

    return res.json(parsedResult);
  } catch (error: any) {
    console.error("Error in /api/analyze:", error);
    return res.status(500).json({
      error: error.message || "Failed to analyze document pair.",
      details: error.toString()
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Requirements & Document Checker server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
