

## Plan: Add Compliance Pages, EULA Acceptance, and Legal Infrastructure

### Important Note
Compliance certifications (SOC 2, ISO 27001, ISO 42001, PCI-DSS, GDPR) are organizational/operational certifications -- they cannot be achieved through code alone. What we **can** implement is the **visible legal and compliance infrastructure** that a compliant platform would have: legal pages, cookie consent, EULA acceptance gates, data handling disclosures, and security headers.

### What We Will Build

#### 1. Comprehensive EULA / Terms of Service Page (`src/pages/TermsOfService.tsx`)
A Meta-level comprehensive agreement covering:
- Account terms, eligibility, user responsibilities
- Intellectual property rights
- Data collection, usage, and sharing (GDPR Art. 13/14 disclosures)
- Payment terms and refund policy
- Limitation of liability, indemnification
- Dispute resolution and arbitration clause
- Termination provisions
- Changes to terms
- CCPA/CPRA and GDPR-specific user rights
- Third-party services disclaimer

#### 2. Privacy Policy Page (`src/pages/PrivacyPolicy.tsx`)
GDPR/CCPA-compliant privacy policy covering:
- Data controller identity
- Types of data collected
- Legal basis for processing (GDPR Art. 6)
- Data retention periods
- Third-party processors (Supabase, OpenAI)
- User rights (access, deletion, portability, objection)
- Cookie usage disclosure
- International data transfers
- Children's privacy (COPPA)

#### 3. Cookie Policy Page (`src/pages/CookiePolicy.tsx`)
- Types of cookies used
- Purpose of each cookie
- How to manage/disable cookies
- Third-party cookies

#### 4. Security & Compliance Page (`src/pages/Compliance.tsx`)
Public-facing page listing compliance commitments:
- SOC 2 Type II (data security, availability, confidentiality)
- ISO 27001 (information security management)
- ISO 42001 (AI management system)
- PCI-DSS (payment card data security)
- GDPR (EU data protection)
- CCPA/CPRA (California consumer privacy)
- HIPAA awareness (if applicable)
- Responsible AI disclosure (for AI/chatbot features)

#### 5. EULA Acceptance Gate on Auth (`src/pages/Auth.tsx`)
- Add a checkbox on the signup form: "I agree to the Terms of Service, Privacy Policy, and End-User License Agreement"
- Checkbox must be checked to create an account
- Links open the respective legal pages in new tabs
- Sign-in form shows a note: "By signing in, you agree to our Terms of Service"

#### 6. Cookie Consent Banner (`src/components/CookieConsent.tsx`)
- GDPR-compliant cookie consent banner at bottom of page
- Accept / Reject / Manage Preferences buttons
- Stores consent in localStorage
- Shows on first visit, remembers preference

#### 7. Footer Updates (`src/components/Footer.tsx`)
- Link "Privacy Policy" to `/privacy-policy`
- Link "Terms of Service" to `/terms-of-service`
- Link "Cookie Policy" to `/cookie-policy`
- Add "Security & Compliance" link to `/compliance`

#### 8. Routes (`src/App.tsx`)
Add 4 new routes:
- `/terms-of-service`
- `/privacy-policy`
- `/cookie-policy`
- `/compliance`

### Files to Create
- `src/pages/TermsOfService.tsx`
- `src/pages/PrivacyPolicy.tsx`
- `src/pages/CookiePolicy.tsx`
- `src/pages/Compliance.tsx`
- `src/components/CookieConsent.tsx`

### Files to Edit
- `src/pages/Auth.tsx` -- add EULA checkbox
- `src/App.tsx` -- add 4 routes
- `src/components/Footer.tsx` -- link legal pages
- `src/pages/Index.tsx` -- add CookieConsent component

