import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Footer from "../components/Footer";

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-foreground mb-2">Cookie Policy</h1>
        <p className="text-muted-foreground mb-8">Last Updated: March 9, 2026</p>

        <div className="prose prose-lg max-w-none space-y-8 text-foreground">
          <section>
            <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2">1. What Are Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              Cookies are small text files that are stored on your device when you visit a website. They are widely used 
              to make websites work efficiently and to provide information to the website operators. This Cookie Policy 
              explains how TCL Tech Solutions, LLC ("we," "us") uses cookies and similar technologies on our platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2">2. Types of Cookies We Use</h2>

            <div className="space-y-6">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-foreground">Strictly Necessary Cookies</h3>
                <p className="text-muted-foreground mt-2">
                  Essential for the website to function. These cannot be disabled. They include session cookies for 
                  authentication, security tokens, and load balancing.
                </p>
                <p className="text-sm text-muted-foreground mt-1"><strong>Duration:</strong> Session / up to 24 hours</p>
                <p className="text-sm text-muted-foreground"><strong>Legal basis:</strong> Legitimate interest (Art. 6(1)(f) GDPR)</p>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-foreground">Functional Cookies</h3>
                <p className="text-muted-foreground mt-2">
                  Enable enhanced functionality and personalization, such as remembering your preferences, language 
                  selection, and theme settings.
                </p>
                <p className="text-sm text-muted-foreground mt-1"><strong>Duration:</strong> Up to 12 months</p>
                <p className="text-sm text-muted-foreground"><strong>Legal basis:</strong> Consent (Art. 6(1)(a) GDPR)</p>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-foreground">Analytics Cookies</h3>
                <p className="text-muted-foreground mt-2">
                  Help us understand how visitors interact with the website by collecting and reporting information 
                  anonymously. This includes page views, session duration, and navigation patterns.
                </p>
                <p className="text-sm text-muted-foreground mt-1"><strong>Duration:</strong> Up to 24 months</p>
                <p className="text-sm text-muted-foreground"><strong>Legal basis:</strong> Consent (Art. 6(1)(a) GDPR)</p>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-foreground">Marketing Cookies</h3>
                <p className="text-muted-foreground mt-2">
                  Used to track visitors across websites to display relevant advertisements. We currently do not use 
                  marketing cookies but may implement them in the future with prior consent.
                </p>
                <p className="text-sm text-muted-foreground mt-1"><strong>Duration:</strong> N/A (not currently used)</p>
                <p className="text-sm text-muted-foreground"><strong>Legal basis:</strong> Consent (Art. 6(1)(a) GDPR)</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2">3. Specific Cookies Used</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-muted-foreground border border-border rounded-lg">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-foreground">Cookie Name</th>
                    <th className="px-4 py-3 text-left font-medium text-foreground">Purpose</th>
                    <th className="px-4 py-3 text-left font-medium text-foreground">Type</th>
                    <th className="px-4 py-3 text-left font-medium text-foreground">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="px-4 py-3 font-mono text-xs">sb-access-token</td>
                    <td className="px-4 py-3">Authentication session</td>
                    <td className="px-4 py-3">Necessary</td>
                    <td className="px-4 py-3">1 hour</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-xs">sb-refresh-token</td>
                    <td className="px-4 py-3">Session renewal</td>
                    <td className="px-4 py-3">Necessary</td>
                    <td className="px-4 py-3">7 days</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-xs">cookie-consent</td>
                    <td className="px-4 py-3">Cookie preference storage</td>
                    <td className="px-4 py-3">Necessary</td>
                    <td className="px-4 py-3">12 months</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-xs">theme-preference</td>
                    <td className="px-4 py-3">Dark/light mode preference</td>
                    <td className="px-4 py-3">Functional</td>
                    <td className="px-4 py-3">12 months</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2">4. Managing Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              You can control and manage cookies in the following ways:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li><strong>Cookie Consent Banner:</strong> Use the consent banner on your first visit to accept or reject non-essential cookies</li>
              <li><strong>Browser Settings:</strong> Most browsers allow you to refuse or delete cookies through settings. Note that disabling cookies may affect site functionality</li>
              <li><strong>Opt-Out Links:</strong> For analytics cookies, you can opt out through the respective provider's opt-out mechanism</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              For more information about managing cookies in your browser:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1">
              <li>Chrome: chrome://settings/cookies</li>
              <li>Firefox: about:preferences#privacy</li>
              <li>Safari: Preferences → Privacy</li>
              <li>Edge: edge://settings/privacy</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2">5. Third-Party Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              Some cookies may be set by third-party services that appear on our pages. We do not control these cookies. 
              Third-party cookie providers include our cloud infrastructure and authentication service providers. 
              Please refer to the respective third-party privacy policies for more information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2">6. Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Cookie Policy to reflect changes in our practices or for legal, regulatory, or operational 
              reasons. We will post any changes on this page with an updated revision date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2">7. Contact Us</h2>
            <div className="bg-muted/50 p-4 rounded-lg text-muted-foreground">
              <p><strong>TCL Tech Solutions, LLC</strong></p>
              <p>7634 Goldstrike Drive, San Antonio, TX 78254</p>
              <p>Email: theconnectedlifestyletech@gmail.com</p>
              <p>Phone: (210) 995-8655</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;
