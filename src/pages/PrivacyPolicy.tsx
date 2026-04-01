import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Footer from "../components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-foreground mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">Last Updated: March 9, 2026</p>

        <div className="prose prose-lg max-w-none space-y-8 text-foreground">
          <section>
            <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2">1. Data Controller</h2>
            <p className="text-muted-foreground leading-relaxed">
              TCL Tech Solutions, LLC ("Company," "we," "us") is the data controller responsible for processing your 
              personal data. We are committed to protecting your privacy in compliance with the General Data Protection 
              Regulation (GDPR), the California Consumer Privacy Act (CCPA/CPRA), and all applicable data protection laws.
            </p>
            <div className="bg-muted/50 p-4 rounded-lg text-muted-foreground">
              <p><strong>Data Controller:</strong> TCL Tech Solutions, LLC</p>
              <p><strong>Address:</strong> 7634 Goldstrike Drive, San Antonio, TX 78254</p>
              <p><strong>Email:</strong> theconnectedlifestyletech@gmail.com</p>
              <p><strong>Phone:</strong> (210) 995-8655</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2">2. Information We Collect</h2>
            <h3 className="text-xl font-medium text-foreground mt-4">2.1 Information You Provide</h3>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li><strong>Account Data:</strong> Name, email address, password (hashed), phone number</li>
              <li><strong>Profile Data:</strong> Job title, company name, preferences</li>
              <li><strong>Communication Data:</strong> Messages, support inquiries, feedback</li>
              <li><strong>Payment Data:</strong> Billing address, payment method details (processed by PCI-DSS compliant processors; we do not store card numbers)</li>
              <li><strong>Service Data:</strong> Project details, configuration preferences, uploaded content</li>
            </ul>

            <h3 className="text-xl font-medium text-foreground mt-4">2.2 Information Collected Automatically</h3>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li><strong>Device Data:</strong> IP address, browser type, operating system, device identifiers</li>
              <li><strong>Usage Data:</strong> Pages visited, features used, timestamps, referral URLs</li>
              <li><strong>Location Data:</strong> Approximate location derived from IP address</li>
              <li><strong>Cookie Data:</strong> As described in our <Link to="/cookie-policy" className="text-primary underline">Cookie Policy</Link></li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2">3. Legal Basis for Processing (GDPR Art. 6)</h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li><strong>Contract Performance (Art. 6(1)(b)):</strong> Processing necessary to provide our Services</li>
              <li><strong>Legitimate Interests (Art. 6(1)(f)):</strong> Analytics, security, fraud prevention, service improvement</li>
              <li><strong>Consent (Art. 6(1)(a)):</strong> Marketing communications, non-essential cookies, AI feature usage</li>
              <li><strong>Legal Obligation (Art. 6(1)(c)):</strong> Tax records, regulatory compliance, law enforcement requests</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2">4. How We Use Your Information</h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Provide, operate, and maintain the Services</li>
              <li>Process transactions and send related information</li>
              <li>Send administrative notifications and service updates</li>
              <li>Respond to inquiries and provide customer support</li>
              <li>Analyze usage patterns to improve the Services</li>
              <li>Detect, prevent, and address fraud and security issues</li>
              <li>Comply with legal obligations and enforce our agreements</li>
              <li>Personalize your experience and provide AI-powered recommendations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2">5. Data Sharing & Third-Party Processors</h2>
            <p className="text-muted-foreground leading-relaxed">
              We do not sell your personal data. We may share your information with the following categories of recipients:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li><strong>Cloud Infrastructure:</strong> Database hosting, authentication, and storage services</li>
              <li><strong>AI Service Providers:</strong> For AI-powered features (data is processed per their privacy policies and our data processing agreements)</li>
              <li><strong>Payment Processors:</strong> PCI-DSS compliant payment processing</li>
              <li><strong>Analytics Providers:</strong> Anonymized usage analytics</li>
              <li><strong>Legal Authorities:</strong> When required by law, court order, or to protect our rights</li>
              <li><strong>Business Transfers:</strong> In connection with mergers, acquisitions, or asset sales</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              All third-party processors are bound by data processing agreements (DPAs) that require them to protect your data 
              in accordance with applicable law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2">6. Data Retention</h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li><strong>Account Data:</strong> Retained while your account is active, plus 30 days after deletion request</li>
              <li><strong>Usage Data:</strong> Retained for 24 months, then anonymized</li>
              <li><strong>Communication Data:</strong> Retained for 36 months after last interaction</li>
              <li><strong>Payment Data:</strong> Retained as required by tax and financial regulations (typically 7 years)</li>
              <li><strong>Legal Hold Data:</strong> Retained as required by applicable law or litigation</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2">7. International Data Transfers</h2>
            <p className="text-muted-foreground leading-relaxed">
              Your data may be transferred to and processed in the United States. For transfers from the EU/EEA, we rely on:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Standard Contractual Clauses (SCCs) approved by the European Commission</li>
              <li>Data processing agreements with all sub-processors</li>
              <li>Technical and organizational security measures</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2">8. Your Rights</h2>
            <h3 className="text-xl font-medium text-foreground mt-4">GDPR Rights (EU/EEA Residents)</h3>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Right of access to your personal data</li>
              <li>Right to rectification of inaccurate data</li>
              <li>Right to erasure ("right to be forgotten")</li>
              <li>Right to restrict processing</li>
              <li>Right to data portability</li>
              <li>Right to object to processing</li>
              <li>Right to withdraw consent</li>
              <li>Right to lodge a complaint with a supervisory authority</li>
            </ul>

            <h3 className="text-xl font-medium text-foreground mt-4">CCPA/CPRA Rights (California Residents)</h3>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Right to know what personal information is collected</li>
              <li>Right to delete personal information</li>
              <li>Right to opt out of sale/sharing (we do not sell data)</li>
              <li>Right to non-discrimination</li>
              <li>Right to correct inaccurate information</li>
            </ul>

            <p className="text-muted-foreground leading-relaxed mt-4">
              To exercise any of these rights, contact us at theconnectedlifestyletech@gmail.com. 
              We will respond within 30 days (GDPR) or 45 days (CCPA).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2">9. Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal data, including:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Encryption of data in transit (TLS 1.2+) and at rest (AES-256)</li>
              <li>Regular security assessments and penetration testing</li>
              <li>Access controls and role-based permissions</li>
              <li>Incident response procedures</li>
              <li>Employee security awareness training</li>
              <li>SOC 2 Type II compliance framework</li>
              <li>ISO 27001 information security management</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2">10. Children's Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              The Services are not intended for children under the age of 13 (or 16 in the EU/EEA). We do not knowingly 
              collect personal data from children. If you believe we have collected data from a child, contact us 
              immediately and we will delete it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2">11. Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy periodically. We will notify you of material changes by posting the new 
              policy on this page and updating the "Last Updated" date. For registered users, we will send email 
              notification of material changes at least 30 days before they take effect.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2">12. Contact Us</h2>
            <div className="bg-muted/50 p-4 rounded-lg text-muted-foreground">
              <p><strong>TCL Tech Solutions, LLC</strong></p>
              <p>7634 Goldstrike Drive, San Antonio, TX 78254</p>
              <p>Email: theconnectedlifestyletech@gmail.com</p>
              <p>Phone: (210) 995-8655</p>
              <p>Data Protection Officer: theconnectedlifestyletech@gmail.com</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
