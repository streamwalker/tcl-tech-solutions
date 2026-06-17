import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Footer from "../components/Footer";

const NavICUPrivacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-foreground mb-2">NavICU Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">Last Updated: June 17, 2026</p>

        <div className="prose prose-lg max-w-none space-y-8 text-foreground">
          <section>
            <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2">1. Overview</h2>
            <p className="text-muted-foreground leading-relaxed">
              NavICU ("the App") is a clinical study and reference application published by TCL Tech Solutions, LLC
              ("we," "us"). This Privacy Policy describes how the App handles information on your iOS device. NavICU
              is designed as an on-device reference tool: the App as distributed through the Apple App Store does not
              collect, transmit, sell, or share personal data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2">2. Data We Collect</h2>
            <p className="text-muted-foreground leading-relaxed">
              <strong>None.</strong> The App does not collect personal information, contact information, health
              information, identifiers, usage data, diagnostics, location, or any other category of data defined by
              Apple's App Privacy framework. There are no analytics SDKs, advertising SDKs, or third-party trackers
              embedded in the App.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2">3. On-Device Processing</h2>
            <p className="text-muted-foreground leading-relaxed">
              All reference content, AI-assisted lookups, and chatbot interactions in NavICU run locally on your
              device against bounded, vetted study material. Inputs and outputs are not transmitted to our servers
              or to any third party.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2">4. No Account Required</h2>
            <p className="text-muted-foreground leading-relaxed">
              NavICU does not require you to create an account, sign in, or provide any personal information to use
              the App.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2">5. Children's Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              NavICU is intended for clinical and educational use by adults. We do not knowingly collect any data
              from any user, including children.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2">6. Medical Disclaimer</h2>
            <p className="text-muted-foreground leading-relaxed">
              NavICU provides clinical reference and study content for educational purposes only. It is not a medical
              device and is not a substitute for professional medical judgment, diagnosis, or treatment. Always rely
              on institutional protocols and licensed clinicians for patient care decisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2">7. Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              If a future version of NavICU introduces any data collection (for example, optional cloud sync or
              account features), we will update this policy, update the App's App Store privacy label, and request
              your consent in-app before any data leaves your device.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2">8. Contact Us</h2>
            <div className="bg-muted/50 p-4 rounded-lg text-muted-foreground">
              <p><strong>TCL Tech Solutions, LLC</strong></p>
              <p>7634 Goldstrike Drive, San Antonio, TX 78254</p>
              <p>Email: theconnectedlifestyletech@gmail.com</p>
              <p>Phone: (210) 995-8655</p>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NavICUPrivacy;