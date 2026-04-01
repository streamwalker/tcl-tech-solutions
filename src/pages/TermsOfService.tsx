import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Footer from "../components/Footer";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-foreground mb-2">Terms of Service & End-User License Agreement</h1>
        <p className="text-muted-foreground mb-8">Last Updated: March 9, 2026</p>

        <div className="prose prose-lg max-w-none space-y-8 text-foreground">
          <section>
            <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing, browsing, or using the TCL Tech Solutions platform ("Platform"), website, mobile applications, 
              APIs, or any related services (collectively, the "Services"), you ("User," "you," or "your") acknowledge 
              that you have read, understood, and agree to be bound by these Terms of Service and End-User License Agreement 
              ("Agreement"). If you do not agree to all terms and conditions of this Agreement, you must not access or use 
              the Services. This Agreement constitutes a legally binding contract between you and TCL Tech Solutions, LLC 
              ("Company," "we," "us," or "our"), a Texas limited liability company headquartered at 7634 Goldstrike Drive, 
              San Antonio, TX 78254.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to modify this Agreement at any time. Changes will be effective immediately upon posting 
              to the Platform. Your continued use of the Services after any modifications constitutes acceptance of the 
              revised Agreement. We will notify registered users of material changes via email at least thirty (30) days 
              prior to the effective date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2">2. Eligibility</h2>
            <p className="text-muted-foreground leading-relaxed">
              You must be at least eighteen (18) years of age, or the age of legal majority in your jurisdiction, to use 
              the Services. By using the Services, you represent and warrant that you meet the eligibility requirements, 
              have the legal capacity to enter into this Agreement, and are not barred from using the Services under 
              applicable law. If you are using the Services on behalf of an organization, you represent that you have 
              authority to bind that organization to this Agreement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2">3. Account Registration & Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              To access certain features, you must create an account. You agree to provide accurate, current, and complete 
              information during registration and to update such information as necessary. You are solely responsible for 
              maintaining the confidentiality of your account credentials, including your password, and for all activities 
              that occur under your account. You must notify us immediately of any unauthorized use of your account or any 
              other breach of security. We will not be liable for any loss or damage arising from your failure to comply 
              with this section.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to suspend or terminate your account at any time, with or without notice, for conduct 
              that we determine, in our sole discretion, violates this Agreement, is harmful to other users, or is 
              otherwise objectionable.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2">4. License Grant & Restrictions</h2>
            <p className="text-muted-foreground leading-relaxed">
              Subject to your compliance with this Agreement, we grant you a limited, non-exclusive, non-transferable, 
              non-sublicensable, revocable license to access and use the Services for your personal or internal business 
              purposes. This license does not include:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Modifying, copying, distributing, or creating derivative works based on the Services</li>
              <li>Reverse engineering, decompiling, or disassembling any aspect of the Services</li>
              <li>Using the Services for any unlawful purpose or in violation of any applicable laws</li>
              <li>Attempting to gain unauthorized access to any portion of the Services or related systems</li>
              <li>Using automated means (bots, scrapers, crawlers) to access or collect data from the Services</li>
              <li>Removing, altering, or obscuring any proprietary notices on the Services</li>
              <li>Sublicensing, selling, reselling, or transferring access to the Services</li>
              <li>Using the Services to transmit malware, viruses, or other harmful code</li>
              <li>Interfering with or disrupting the integrity or performance of the Services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2">5. Intellectual Property Rights</h2>
            <p className="text-muted-foreground leading-relaxed">
              The Services, including all content, features, functionality, software, text, displays, images, video, audio, 
              design, and the selection and arrangement thereof, are owned by the Company, its licensors, or other providers 
              and are protected by United States and international copyright, trademark, patent, trade secret, and other 
              intellectual property or proprietary rights laws. The Company name, logo, and all related names, logos, 
              product and service names, designs, and slogans are trademarks of the Company. You must not use such marks 
              without our prior written permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2">6. User Content & Data</h2>
            <p className="text-muted-foreground leading-relaxed">
              You retain ownership of any content you submit, post, or display through the Services ("User Content"). 
              By submitting User Content, you grant us a worldwide, non-exclusive, royalty-free, sublicensable, and 
              transferable license to use, reproduce, modify, distribute, prepare derivative works of, display, and 
              perform the User Content solely in connection with operating and providing the Services. You represent and 
              warrant that you own or have the necessary rights to grant this license.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We may collect, process, and store data as described in our{" "}
              <Link to="/privacy-policy" className="text-primary hover:text-primary/80 underline">Privacy Policy</Link>, 
              which is incorporated into this Agreement by reference.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2">7. Data Collection, Usage & Sharing (GDPR Art. 13/14)</h2>
            <p className="text-muted-foreground leading-relaxed">
              In accordance with the General Data Protection Regulation (GDPR) Articles 13 and 14, we inform you that:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li><strong>Data Controller:</strong> TCL Tech Solutions, LLC, 7634 Goldstrike Drive, San Antonio, TX 78254</li>
              <li><strong>Purpose of Processing:</strong> Account management, service delivery, analytics, security, and communication</li>
              <li><strong>Legal Basis:</strong> Contract performance (Art. 6(1)(b)), legitimate interests (Art. 6(1)(f)), and consent (Art. 6(1)(a)) where applicable</li>
              <li><strong>Data Recipients:</strong> Authorized employees, cloud infrastructure providers, analytics services, and as required by law</li>
              <li><strong>Retention:</strong> Data is retained for as long as your account is active or as needed to provide Services, comply with legal obligations, resolve disputes, and enforce agreements</li>
              <li><strong>International Transfers:</strong> Data may be transferred to and processed in the United States. We implement appropriate safeguards including Standard Contractual Clauses (SCCs)</li>
              <li><strong>Your Rights:</strong> Access, rectification, erasure, restriction, portability, objection, and withdrawal of consent. Contact us at theconnectedlifestyletech@gmail.com</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2">8. Payment Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              Certain Services may require payment. By subscribing to paid Services, you agree to pay all applicable fees 
              as described at the time of purchase. All payments are non-refundable unless otherwise specified or required 
              by applicable law. We reserve the right to change prices at any time, with thirty (30) days' notice for 
              existing subscribers. Failure to pay may result in suspension or termination of your access to paid Services. 
              All payment card data is processed in compliance with PCI-DSS standards and is never stored on our servers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2">9. AI-Powered Features & Responsible AI</h2>
            <p className="text-muted-foreground leading-relaxed">
              The Services may include AI-powered features, including but not limited to chatbots, recommendation engines, 
              and automated analysis tools. In accordance with ISO 42001 (AI Management System) principles:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>AI features are provided "as-is" and may produce inaccurate or incomplete results</li>
              <li>AI outputs should not be relied upon as the sole basis for critical decisions</li>
              <li>We implement safeguards to prevent bias, ensure transparency, and protect user privacy in AI processing</li>
              <li>Data used by AI features is processed in accordance with our Privacy Policy</li>
              <li>You may opt out of AI-powered features by contacting us</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2">10. Third-Party Services</h2>
            <p className="text-muted-foreground leading-relaxed">
              The Services may contain links to or integrations with third-party websites, services, or applications 
              ("Third-Party Services"). We are not responsible for the content, privacy policies, or practices of any 
              Third-Party Services. Your interactions with Third-Party Services are governed by their respective terms 
              and policies. Third-party processors include but are not limited to cloud infrastructure providers, 
              authentication services, and AI model providers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2">11. Disclaimer of Warranties</h2>
            <p className="text-muted-foreground leading-relaxed">
              THE SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER 
              EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A 
              PARTICULAR PURPOSE, NON-INFRINGEMENT, AND COURSE OF DEALING. WE DO NOT WARRANT THAT THE SERVICES WILL BE 
              UNINTERRUPTED, ERROR-FREE, SECURE, OR FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS. YOUR USE OF THE SERVICES 
              IS AT YOUR SOLE RISK.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2">12. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL THE COMPANY, ITS AFFILIATES, DIRECTORS, 
              OFFICERS, EMPLOYEES, AGENTS, OR LICENSORS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, 
              PUNITIVE, OR EXEMPLARY DAMAGES, INCLUDING BUT NOT LIMITED TO DAMAGES FOR LOSS OF PROFITS, GOODWILL, USE, 
              DATA, OR OTHER INTANGIBLE LOSSES, REGARDLESS OF WHETHER WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH 
              DAMAGES. OUR TOTAL AGGREGATE LIABILITY ARISING OUT OF OR IN CONNECTION WITH THIS AGREEMENT SHALL NOT EXCEED 
              THE AMOUNTS PAID BY YOU TO THE COMPANY IN THE TWELVE (12) MONTHS PRECEDING THE EVENT GIVING RISE TO LIABILITY, 
              OR ONE HUNDRED DOLLARS ($100), WHICHEVER IS GREATER.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2">13. Indemnification</h2>
            <p className="text-muted-foreground leading-relaxed">
              You agree to indemnify, defend, and hold harmless the Company and its affiliates, directors, officers, 
              employees, agents, and licensors from and against any and all claims, liabilities, damages, losses, costs, 
              expenses, and fees (including reasonable attorneys' fees) arising out of or relating to: (a) your use of the 
              Services; (b) your violation of this Agreement; (c) your violation of any rights of a third party; or 
              (d) your User Content.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2">14. Dispute Resolution & Arbitration</h2>
            <p className="text-muted-foreground leading-relaxed">
              Any dispute, controversy, or claim arising out of or relating to this Agreement, or the breach, termination, 
              or invalidity thereof, shall be settled by binding arbitration administered by the American Arbitration 
              Association ("AAA") in accordance with its Commercial Arbitration Rules. The arbitration shall take place in 
              Bexar County, Texas. The arbitrator's decision shall be final and binding. Judgment on the award may be entered 
              in any court having jurisdiction. YOU AGREE THAT ANY ARBITRATION SHALL BE CONDUCTED ON AN INDIVIDUAL BASIS AND 
              NOT AS A CLASS, CONSOLIDATED, OR REPRESENTATIVE ACTION. You waive your right to participate in a class action 
              lawsuit or class-wide arbitration.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong>Exception:</strong> Either party may seek injunctive or equitable relief in any court of competent 
              jurisdiction for claims involving intellectual property infringement or unauthorized access.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2">15. CCPA/CPRA Rights (California Residents)</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA) 
              and California Privacy Rights Act (CPRA), including:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Right to know what personal information is collected, used, shared, or sold</li>
              <li>Right to delete personal information</li>
              <li>Right to opt out of the sale or sharing of personal information</li>
              <li>Right to non-discrimination for exercising your privacy rights</li>
              <li>Right to correct inaccurate personal information</li>
              <li>Right to limit use and disclosure of sensitive personal information</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              We do not sell personal information. To exercise your rights, contact us at theconnectedlifestyletech@gmail.com 
              or call (210) 995-8655.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2">16. GDPR Rights (EU/EEA Residents)</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you are located in the European Union or European Economic Area, you have the following rights under GDPR:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li><strong>Right of Access (Art. 15):</strong> Obtain confirmation and a copy of your personal data</li>
              <li><strong>Right to Rectification (Art. 16):</strong> Correct inaccurate or incomplete personal data</li>
              <li><strong>Right to Erasure (Art. 17):</strong> Request deletion of your personal data ("right to be forgotten")</li>
              <li><strong>Right to Restriction (Art. 18):</strong> Restrict processing of your personal data</li>
              <li><strong>Right to Data Portability (Art. 20):</strong> Receive your data in a structured, machine-readable format</li>
              <li><strong>Right to Object (Art. 21):</strong> Object to processing based on legitimate interests or direct marketing</li>
              <li><strong>Right to Withdraw Consent (Art. 7):</strong> Withdraw consent at any time without affecting prior processing</li>
              <li><strong>Right to Lodge a Complaint:</strong> File a complaint with your local supervisory authority</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2">17. Termination</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may terminate or suspend your access to the Services immediately, without prior notice or liability, for 
              any reason, including breach of this Agreement. Upon termination, your right to use the Services will 
              immediately cease. You may terminate your account at any time by contacting us. All provisions of this 
              Agreement which by their nature should survive termination shall survive, including ownership provisions, 
              warranty disclaimers, indemnity, and limitations of liability. Upon request, we will delete your personal 
              data within thirty (30) days, subject to legal retention requirements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2">18. Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              This Agreement shall be governed by and construed in accordance with the laws of the State of Texas, 
              United States, without regard to its conflict of law provisions. For matters not subject to arbitration, 
              you consent to the exclusive jurisdiction and venue of the state and federal courts located in Bexar County, Texas.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2">19. Severability & Waiver</h2>
            <p className="text-muted-foreground leading-relaxed">
              If any provision of this Agreement is held to be invalid, illegal, or unenforceable, the remaining provisions 
              shall continue in full force and effect. The failure of the Company to enforce any right or provision of this 
              Agreement shall not constitute a waiver of such right or provision.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2">20. Entire Agreement</h2>
            <p className="text-muted-foreground leading-relaxed">
              This Agreement, together with the{" "}
              <Link to="/privacy-policy" className="text-primary hover:text-primary/80 underline">Privacy Policy</Link> and{" "}
              <Link to="/cookie-policy" className="text-primary hover:text-primary/80 underline">Cookie Policy</Link>, 
              constitutes the entire agreement between you and the Company regarding the use of the Services and supersedes 
              all prior agreements, representations, and understandings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2">21. Contact Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              For questions about this Agreement, contact us at:
            </p>
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

export default TermsOfService;
