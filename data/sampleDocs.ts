import { SampleDocPair } from '../types';

export const SAMPLE_DOC_PAIRS: SampleDocPair[] = [
  {
    id: 'cloud-migration',
    title: 'Enterprise Cloud Migration RFP vs. CloudCorp Proposal',
    description: 'Enterprise IT infrastructure migration to AWS/GCP with strict multi-region, SOC2, and 99.99% SLA requirements.',
    reqDoc: {
      name: 'RFP_Enterprise_Cloud_Migration_v2.pdf',
      size: 245000,
      mimeType: 'application/pdf',
      pageCount: 6,
      text: `ENTERPRISE REQUEST FOR PROPOSAL (RFP) - CLOUD MIGRATION

1. ARCHITECTURE & MULTI-REGION (Page 1)
REQ-01: The proposed cloud solution must support multi-region failover across at least two geographical zones in North America with an RPO < 5 minutes and RTO < 15 minutes.
REQ-02: Microservices architecture must utilize container orchestration (Kubernetes or ECS) with automated horizontal pod autoscaling based on CPU and memory thresholds.

2. SECURITY & COMPLIANCE (Page 2)
REQ-03: All data at rest must be encrypted using AES-256 with customer-managed encryption keys (CMEK) via Key Management Service.
REQ-04: The vendor must provide evidence of current SOC 2 Type II compliance report covering Security, Availability, and Confidentiality trust service criteria.
REQ-05: Solution must support Single Sign-On (SSO) integration via SAML 2.0 / OpenID Connect with Okta and Azure AD, including Multi-Factor Authentication (MFA) enforcement.

3. AVAILABILITY & SLA (Page 3)
REQ-06: The system must guarantee 99.99% uptime SLA for production workloads with automated uptime reporting and financial credits for downtime.
REQ-07: Backup and Disaster Recovery must perform daily automated differential snapshots with a retention period of 365 days for audit compliance.

4. OPERATIONS & MONITORING (Page 4)
REQ-08: 24/7/365 dedicated technical support team with a guaranteed initial response time of < 15 minutes for Critical (Severity 1) incidents.
REQ-09: Centralized logging and SIEM integration capability (Splunk or Datadog) with log retention of at least 90 days online.

5. PRICING & COST MANAGEMENT (Page 5)
REQ-10: Pricing structure must be fixed-fee for migration implementation with predictable monthly subscription costs and real-time cost control dashboard.
REQ-11: Training program for 50 internal IT staff members including hands-on labs and official certification vouchers.
REQ-12: The vendor must commit to completing full migration and final go-live within 120 calendar days from contract execution.`
    },
    propDoc: {
      name: 'CloudCorp_Response_Proposal_Final.pdf',
      size: 410000,
      mimeType: 'application/pdf',
      pageCount: 14,
      text: `PROPOSAL RESPONSE FOR ENTERPRISE CLOUD MIGRATION - CLOUDCORP SYSTEMS

SECTION 1: TECHNICAL ARCHITECTURE & DISASTER RECOVERY (Page 3)
1.1 Multi-Region High Availability: CloudCorp deploys active-passive multi-region clusters across AWS us-east-1 and us-west-2. RPO is guaranteed at 3 minutes and RTO is 10 minutes, satisfying all disaster recovery objectives (ref: Page 3, Section 1.1).
1.2 Container Orchestration: We utilize Managed Kubernetes (EKS/GKE) with Horizontal Pod Autoscalers (HPA) configured for CPU (>70%) and memory scaling (ref: Page 4, Section 1.2).

SECTION 2: SECURITY & COMPLIANCE (Page 6)
2.1 Encryption Standards: All database tables and object storage are encrypted at rest using AES-256. However, Default Cloud Provider Keys (SSE-KMS) are utilized by default. Customer-Managed Encryption Keys (CMEK) are supported as an optional add-on module requiring additional configuration fees (ref: Page 6, Section 2.1).
2.2 Compliance Certifications: CloudCorp maintains active SOC 2 Type II certification. The latest audit report (valid through Dec 2026) is attached in Appendix B covering Security and Availability (ref: Page 8, Section 2.2). Note: Confidentiality criteria was excluded in the last audit scope.
2.3 Identity Management: SAML 2.0 and OIDC integrations are standard. We natively integrate with Okta, Azure AD, and PingIdentity with mandatory MFA (ref: Page 9, Section 2.3).

SECTION 3: SERVICE LEVEL AGREEMENT & BACKUPS (Page 11)
3.1 Uptime Guarantee: CloudCorp guarantees 99.9% uptime SLA for standard tiers, and 99.95% uptime SLA for Enterprise tiers with automated credits (ref: Page 11, Section 3.1).
3.2 Backup Retention: Automated daily snapshots are executed across all DB instances with 90-day retention included in standard plans. 365-day extended retention is available upon request for compliance archives (ref: Page 12, Section 3.2).

SECTION 4: OPERATIONS & INCIDENT MANAGEMENT (Page 13)
4.1 Support Model: 24/7/365 global support center. Severity 1 incidents receive response within 15 minutes via hotline and Slack Connect channel (ref: Page 13, Section 4.1).
4.2 SIEM Integration: Native exporters stream structured JSON logs directly to Datadog, Splunk, and AWS CloudWatch with 90-day hot storage (ref: Page 14, Section 4.2).

SECTION 5: PRICING & TIMELINE (Page 16)
5.1 Pricing Structure: Fixed migration services fee of $180,000 + monthly cloud consumption.
5.2 Staff Training: Includes 3 virtual instructor-led training webinars for up to 25 staff members. Certification vouchers are not included in the proposal price.
5.3 Implementation Timeline: Project schedule estimates 150 calendar days from kickoff to go-live.`
    },
    precomputedResult: {
      summary: 'The proposal from CloudCorp covers the core technical architecture and security requirements well, but presents notable compliance gaps in SLA guarantees (99.95% offered vs 99.99% required), CMEK encryption (offered as paid add-on), SOC2 Confidentiality scope, and migration timeline (150 days proposed vs 120 days required).',
      completionPercentage: 73,
      totalRequirements: 12,
      compliantCount: 6,
      partialCount: 4,
      missingCount: 2,
      unclearCount: 0,
      criticalGapsCount: 3,
      categoriesBreakdown: [
        { category: 'Architecture & Multi-Region', total: 2, compliant: 2, partial: 0, missing: 0, unclear: 0, percentage: 100 },
        { category: 'Security & Compliance', total: 3, compliant: 2, partial: 1, missing: 0, unclear: 0, percentage: 78 },
        { category: 'Availability & SLA', total: 2, compliant: 0, partial: 2, missing: 0, unclear: 0, percentage: 50 },
        { category: 'Operations & Monitoring', total: 2, compliant: 2, partial: 0, missing: 0, unclear: 0, percentage: 100 },
        { category: 'Pricing & Cost Management', total: 3, compliant: 0, partial: 1, missing: 2, unclear: 0, percentage: 25 },
      ],
      requirements: [
        {
          id: 'REQ-01',
          category: 'Architecture & Multi-Region',
          title: 'Multi-Region Failover with RPO < 5m & RTO < 15m',
          originalText: 'The proposed cloud solution must support multi-region failover across at least two geographical zones in North America with an RPO < 5 minutes and RTO < 15 minutes.',
          reqPageLocation: 'Page 1, Section 1',
          status: 'COMPLIANT',
          proposalMatch: 'CloudCorp deploys active-passive multi-region clusters across AWS us-east-1 and us-west-2. RPO is guaranteed at 3 minutes and RTO is 10 minutes.',
          propPageLocation: 'Page 3, Section 1.1',
          evidenceExcerpt: 'Active-passive multi-region clusters across AWS us-east-1 and us-west-2. RPO is guaranteed at 3 minutes and RTO is 10 minutes.',
          confidence: 'HIGH',
          priority: 'CRITICAL',
          recommendation: 'Verify active-passive failover automated trigger procedures during proof-of-concept.'
        },
        {
          id: 'REQ-02',
          category: 'Architecture & Multi-Region',
          title: 'Kubernetes/ECS Container Orchestration with Autoscaling',
          originalText: 'Microservices architecture must utilize container orchestration (Kubernetes or ECS) with automated horizontal pod autoscaling based on CPU and memory thresholds.',
          reqPageLocation: 'Page 1, Section 1',
          status: 'COMPLIANT',
          proposalMatch: 'Utilizes Managed Kubernetes (EKS/GKE) with Horizontal Pod Autoscalers (HPA) configured for CPU (>70%) and memory scaling.',
          propPageLocation: 'Page 4, Section 1.2',
          evidenceExcerpt: 'Managed Kubernetes (EKS/GKE) with Horizontal Pod Autoscalers (HPA) configured for CPU (>70%) and memory scaling.',
          confidence: 'HIGH',
          priority: 'HIGH',
          recommendation: 'Confirm whether cluster autoscaler is also enabled at node-pool level.'
        },
        {
          id: 'REQ-03',
          category: 'Security & Compliance',
          title: 'AES-256 Encryption at Rest with Customer-Managed Keys (CMEK)',
          originalText: 'All data at rest must be encrypted using AES-256 with customer-managed encryption keys (CMEK) via Key Management Service.',
          reqPageLocation: 'Page 2, Section 2',
          status: 'PARTIAL',
          proposalMatch: 'Encrypted at rest using AES-256 with Default Cloud Provider Keys. CMEK is supported as an optional add-on requiring additional configuration fees.',
          propPageLocation: 'Page 6, Section 2.1',
          evidenceExcerpt: 'Default Cloud Provider Keys (SSE-KMS) are utilized by default. Customer-Managed Encryption Keys (CMEK) are supported as an optional add-on module.',
          gapDescription: 'CMEK is not included in the standard baseline and incurs extra cost.',
          confidence: 'HIGH',
          priority: 'CRITICAL',
          recommendation: 'Request vendor to bundle CMEK into core implementation cost without add-on surcharge.'
        },
        {
          id: 'REQ-04',
          category: 'Security & Compliance',
          title: 'SOC 2 Type II Report (Security, Availability, Confidentiality)',
          originalText: 'The vendor must provide evidence of current SOC 2 Type II compliance report covering Security, Availability, and Confidentiality trust service criteria.',
          reqPageLocation: 'Page 2, Section 2',
          status: 'COMPLIANT',
          proposalMatch: 'CloudCorp maintains active SOC 2 Type II certification valid through Dec 2026 covering Security and Availability.',
          propPageLocation: 'Page 8, Section 2.2',
          evidenceExcerpt: 'Active SOC 2 Type II certification. Audit report valid through Dec 2026 attached in Appendix B covering Security and Availability.',
          gapDescription: 'Confidentiality trust service criteria was excluded from the audit scope.',
          confidence: 'HIGH',
          priority: 'HIGH',
          recommendation: 'Request addendum or letter of attestation regarding Confidentiality trust criteria.'
        },
        {
          id: 'REQ-05',
          category: 'Security & Compliance',
          title: 'SSO Integration (SAML 2.0 / OIDC) with Okta & Azure AD',
          originalText: 'Solution must support Single Sign-On (SSO) integration via SAML 2.0 / OpenID Connect with Okta and Azure AD, including Multi-Factor Authentication (MFA) enforcement.',
          reqPageLocation: 'Page 2, Section 2',
          status: 'COMPLIANT',
          proposalMatch: 'Integrates natively with Okta, Azure AD, and PingIdentity via SAML 2.0 and OIDC with mandatory MFA.',
          propPageLocation: 'Page 9, Section 2.3',
          evidenceExcerpt: 'SAML 2.0 and OIDC integrations are standard. We natively integrate with Okta, Azure AD, and PingIdentity with mandatory MFA.',
          confidence: 'HIGH',
          priority: 'HIGH',
          recommendation: 'Confirm RBAC role mapping workflow from Azure AD claims.'
        },
        {
          id: 'REQ-06',
          category: 'Availability & SLA',
          title: '99.99% Uptime Guarantee with Downtime Financial Credits',
          originalText: 'The system must guarantee 99.99% uptime SLA for production workloads with automated uptime reporting and financial credits for downtime.',
          reqPageLocation: 'Page 3, Section 3',
          status: 'PARTIAL',
          proposalMatch: 'Guarantees 99.9% uptime SLA for standard tiers, and 99.95% uptime SLA for Enterprise tiers.',
          propPageLocation: 'Page 11, Section 3.1',
          evidenceExcerpt: 'CloudCorp guarantees 99.9% uptime SLA for standard tiers, and 99.95% uptime SLA for Enterprise tiers with automated credits.',
          gapDescription: 'Proposed uptime (99.95%) allows up to ~4.38 hours downtime/yr, failing the required 99.99% (52 mins/yr).',
          confidence: 'HIGH',
          priority: 'CRITICAL',
          recommendation: 'Negotiate custom enterprise SLA addendum to reach 99.99% with increased credit percentages.'
        },
        {
          id: 'REQ-07',
          category: 'Availability & SLA',
          title: 'Automated Daily Backups with 365-Day Retention',
          originalText: 'Backup and Disaster Recovery must perform daily automated differential snapshots with a retention period of 365 days for audit compliance.',
          reqPageLocation: 'Page 3, Section 3',
          status: 'PARTIAL',
          proposalMatch: 'Automated daily snapshots with 90-day retention included in standard plans. 365-day retention available upon request.',
          propPageLocation: 'Page 12, Section 3.2',
          evidenceExcerpt: '90-day retention included in standard plans. 365-day extended retention is available upon request for compliance archives.',
          gapDescription: 'Included plan only provides 90 days instead of mandatory 365 days.',
          confidence: 'HIGH',
          priority: 'MEDIUM',
          recommendation: 'Require 365-day Glacier/cold storage archive policy to be included at no additional cost.'
        },
        {
          id: 'REQ-08',
          category: 'Operations & Monitoring',
          title: '24/7/365 Dedicated Support with <15 Min Response for Sev 1',
          originalText: '24/7/365 dedicated technical support team with a guaranteed initial response time of < 15 minutes for Critical (Severity 1) incidents.',
          reqPageLocation: 'Page 4, Section 4',
          status: 'COMPLIANT',
          proposalMatch: '24/7/365 global support center with 15-minute Sev 1 response guarantee via phone and Slack Connect.',
          propPageLocation: 'Page 13, Section 4.1',
          evidenceExcerpt: '24/7/365 global support center. Severity 1 incidents receive response within 15 minutes via hotline and Slack Connect.',
          confidence: 'HIGH',
          priority: 'HIGH',
          recommendation: 'Define clear escalation paths and named account technical representative in contract.'
        },
        {
          id: 'REQ-09',
          category: 'Operations & Monitoring',
          title: 'SIEM Integration (Splunk/Datadog) & 90-Day Online Log Retention',
          originalText: 'Centralized logging and SIEM integration capability (Splunk or Datadog) with log retention of at least 90 days online.',
          reqPageLocation: 'Page 4, Section 4',
          status: 'COMPLIANT',
          proposalMatch: 'Native exporters stream structured JSON logs to Datadog, Splunk, and CloudWatch with 90-day hot storage.',
          propPageLocation: 'Page 14, Section 4.2',
          evidenceExcerpt: 'Native exporters stream structured JSON logs directly to Datadog, Splunk, and AWS CloudWatch with 90-day hot storage.',
          confidence: 'HIGH',
          priority: 'MEDIUM',
          recommendation: 'Verify log formatting compliance with client security operation center (SOC) ingestion rules.'
        },
        {
          id: 'REQ-10',
          category: 'Pricing & Cost Management',
          title: 'Fixed-Fee Migration Implementation & Cost Control Dashboard',
          originalText: 'Pricing structure must be fixed-fee for migration implementation with predictable monthly subscription costs and real-time cost control dashboard.',
          reqPageLocation: 'Page 5, Section 5',
          status: 'PARTIAL',
          proposalMatch: 'Fixed migration services fee of $180,000 + monthly cloud consumption.',
          propPageLocation: 'Page 16, Section 5.1',
          evidenceExcerpt: 'Fixed migration services fee of $180,000 + monthly cloud consumption.',
          gapDescription: 'Proposal mentions cloud consumption but does not describe the real-time cost control dashboard.',
          confidence: 'MEDIUM',
          priority: 'HIGH',
          recommendation: 'Clarify cost monitoring tools and budget alert thresholds included in the $180k package.'
        },
        {
          id: 'REQ-11',
          category: 'Pricing & Cost Management',
          title: 'Staff Training for 50 Members with Certification Vouchers',
          originalText: 'Training program for 50 internal IT staff members including hands-on labs and official certification vouchers.',
          reqPageLocation: 'Page 5, Section 5',
          status: 'MISSING',
          proposalMatch: 'Includes 3 virtual instructor-led training webinars for up to 25 staff members. Certification vouchers are not included.',
          propPageLocation: 'Page 16, Section 5.2',
          evidenceExcerpt: '3 virtual instructor-led training webinars for up to 25 staff members. Certification vouchers are not included in the proposal price.',
          gapDescription: 'Offered training for 25 people (50 required), no hands-on labs, and explicitly excludes certification vouchers.',
          confidence: 'HIGH',
          priority: 'MEDIUM',
          recommendation: 'Request proposal revision to include 50 training seats, hands-on labs, and 50 certification vouchers.'
        },
        {
          id: 'REQ-12',
          category: 'Pricing & Cost Management',
          title: '120-Day Full Migration Schedule to Final Go-Live',
          originalText: 'The vendor must commit to completing full migration and final go-live within 120 calendar days from contract execution.',
          reqPageLocation: 'Page 5, Section 5',
          status: 'MISSING',
          proposalMatch: 'Project schedule estimates 150 calendar days from kickoff to go-live.',
          propPageLocation: 'Page 16, Section 5.3',
          evidenceExcerpt: 'Project schedule estimates 150 calendar days from kickoff to go-live.',
          gapDescription: 'Proposed timeline of 150 days exceeds the required deadline by 30 calendar days.',
          confidence: 'HIGH',
          priority: 'CRITICAL',
          recommendation: 'Request accelerated timeline plan with dedicated team resources to hit the 120-day milestone.'
        }
      ],
      globalRecommendations: [
        'Negotiate SLA upgrade from 99.95% to 99.99% with SLA breach penalty clauses.',
        'Require vendor to include Customer-Managed Encryption Keys (CMEK) and 365-day log/backup retention without add-on surcharges.',
        'Insist on full staff training for 50 personnel with certification vouchers as specified in RFP Section 5.',
        'Seek timeline compression commitment to align with 120-day target launch date.'
      ],
      analyzedAt: '2026-07-29T10:20:00Z',
      reqDocName: 'RFP_Enterprise_Cloud_Migration_v2.pdf',
      propDocName: 'CloudCorp_Response_Proposal_Final.pdf'
    }
  },
  {
    id: 'telehealth-app',
    title: 'Telehealth Portal RFP vs. HealthTech Bid',
    description: 'HIPAA-compliant patient portal, video consultation, and EHR synchronization system.',
    reqDoc: {
      name: 'RFP_Telehealth_Patient_Portal.pdf',
      size: 190000,
      mimeType: 'application/pdf',
      pageCount: 4,
      text: `RFP - TELEHEALTH & EHR PATIENT PORTAL
REQ-01: Full HIPAA compliance with Business Associate Agreement (BAA) executed prior to deployment.
REQ-02: WebRTC end-to-end encrypted video streaming with multi-party support (up to 4 clinicians/family members).
REQ-03: Real-time bi-directional FHIR / HL7 EHR synchronization with Epic and Cerner systems.
REQ-04: Mobile responsive web application supporting iOS Safari and Android Chrome with biometric auth capability.
REQ-05: Integrated online prescription renewal and payment processing (PCI-DSS Level 1 certified).`
    },
    propDoc: {
      name: 'HealthTech_Proposal_Response.pdf',
      size: 320000,
      mimeType: 'application/pdf',
      pageCount: 8,
      text: `HEALTHTECH PROPOSAL RESPONSE
1. HIPAA Compliance: HealthTech provides full BAA agreement execution and HIPAA audit readiness.
2. Video Conferencing: E2E encrypted WebRTC video supports 1-on-1 calls. Multi-party video support is currently in beta.
3. EHR Integration: FHIR API connectors exist for Epic. Cerner integration is custom-scoped.
4. Mobile Experience: Fully responsive web app with WebAuthn biometric authentication on iOS & Android.
5. Payments & e-Prescribe: Integrated Stripe PCI-DSS Level 1 payments and SureScripts e-prescribing.`
    },
    precomputedResult: {
      summary: 'HealthTech proposal strongly addresses HIPAA, WebAuthn, Stripe payments, and Epic FHIR integration, but multi-party video calls and Cerner EHR connectors are partially complete / custom scoped.',
      completionPercentage: 80,
      totalRequirements: 5,
      compliantCount: 3,
      partialCount: 2,
      missingCount: 0,
      unclearCount: 0,
      criticalGapsCount: 1,
      categoriesBreakdown: [
        { category: 'Compliance & Security', total: 1, compliant: 1, partial: 0, missing: 0, unclear: 0, percentage: 100 },
        { category: 'Clinical Features', total: 2, compliant: 1, partial: 1, missing: 0, unclear: 0, percentage: 75 },
        { category: 'EHR & Integrations', total: 1, compliant: 0, partial: 1, missing: 0, unclear: 0, percentage: 50 },
        { category: 'User Experience & Billing', total: 1, compliant: 1, partial: 0, missing: 0, unclear: 0, percentage: 100 },
      ],
      requirements: [
        {
          id: 'REQ-01',
          category: 'Compliance & Security',
          title: 'HIPAA Compliance & Executed BAA',
          originalText: 'Full HIPAA compliance with Business Associate Agreement (BAA) executed prior to deployment.',
          reqPageLocation: 'Page 1',
          status: 'COMPLIANT',
          proposalMatch: 'Provides full BAA execution and HIPAA audit readiness.',
          propPageLocation: 'Page 2',
          evidenceExcerpt: 'HealthTech provides full BAA agreement execution and HIPAA audit readiness.',
          confidence: 'HIGH',
          priority: 'CRITICAL',
          recommendation: 'Obtain standard BAA template for legal review.'
        },
        {
          id: 'REQ-02',
          category: 'Clinical Features',
          title: 'WebRTC Encrypted Multi-Party Video Consultation',
          originalText: 'WebRTC end-to-end encrypted video streaming with multi-party support (up to 4 clinicians/family members).',
          reqPageLocation: 'Page 1',
          status: 'PARTIAL',
          proposalMatch: 'E2E encrypted WebRTC video supports 1-on-1 calls. Multi-party video is in beta.',
          propPageLocation: 'Page 3',
          evidenceExcerpt: 'WebRTC video supports 1-on-1 calls. Multi-party video support is currently in beta.',
          gapDescription: 'Multi-party video is only in beta and not guaranteed production-ready.',
          confidence: 'HIGH',
          priority: 'HIGH',
          recommendation: 'Request roadmap commitment for multi-party GA release date.'
        },
        {
          id: 'REQ-03',
          category: 'EHR & Integrations',
          title: 'FHIR / HL7 Synchronization with Epic and Cerner',
          originalText: 'Real-time bi-directional FHIR / HL7 EHR synchronization with Epic and Cerner systems.',
          reqPageLocation: 'Page 2',
          status: 'PARTIAL',
          proposalMatch: 'FHIR API connectors exist for Epic. Cerner integration is custom-scoped.',
          propPageLocation: 'Page 4',
          evidenceExcerpt: 'FHIR API connectors exist for Epic. Cerner integration is custom-scoped.',
          gapDescription: 'Cerner connector requires custom scoping and potentially extra budget.',
          confidence: 'HIGH',
          priority: 'CRITICAL',
          recommendation: 'Request fixed-price quote and timeline for Cerner EHR connector.'
        },
        {
          id: 'REQ-04',
          category: 'User Experience & Billing',
          title: 'Mobile Web App with Biometric Auth',
          originalText: 'Mobile responsive web application supporting iOS Safari and Android Chrome with biometric auth capability.',
          reqPageLocation: 'Page 2',
          status: 'COMPLIANT',
          proposalMatch: 'Fully responsive web app with WebAuthn biometric authentication on iOS & Android.',
          propPageLocation: 'Page 5',
          evidenceExcerpt: 'Fully responsive web app with WebAuthn biometric authentication on iOS & Android.',
          confidence: 'HIGH',
          priority: 'MEDIUM',
          recommendation: 'Test WebAuthn authentication flow across devices during staging.'
        },
        {
          id: 'REQ-05',
          category: 'User Experience & Billing',
          title: 'Online Prescription Renewal & PCI-DSS Payments',
          originalText: 'Integrated online prescription renewal and payment processing (PCI-DSS Level 1 certified).',
          reqPageLocation: 'Page 3',
          status: 'COMPLIANT',
          proposalMatch: 'Integrated Stripe PCI-DSS Level 1 payments and SureScripts e-prescribing.',
          propPageLocation: 'Page 6',
          evidenceExcerpt: 'Integrated Stripe PCI-DSS Level 1 payments and SureScripts e-prescribing.',
          confidence: 'HIGH',
          priority: 'HIGH',
          recommendation: 'Confirm merchant account configuration requirements.'
        }
      ],
      globalRecommendations: [
        'Secure fixed pricing for Cerner EHR connector.',
        'Incorporate multi-party video SLA milestone into SOW.'
      ],
      analyzedAt: '2026-07-29T10:20:00Z',
      reqDocName: 'RFP_Telehealth_Patient_Portal.pdf',
      propDocName: 'HealthTech_Proposal_Response.pdf'
    }
  }
];
