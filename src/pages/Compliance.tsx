import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Lock, Brain, CreditCard, Globe, Scale, Heart, FileCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Footer from "../components/Footer";

const complianceFrameworks = [
  {
    title: "SOC 2 Type II",
    icon: Shield,
    status: "Committed",
    description: "Service Organization Control 2 Type II certification demonstrates our commitment to data security, availability, processing integrity, confidentiality, and privacy.",
    details: [
      "Continuous monitoring of security controls",
      "Annual third-party audits",
      "Trust Services Criteria adherence",
      "Incident response and management procedures",
      "Vendor risk management program"
    ]
  },
  {
    title: "ISO 27001",
    icon: Lock,
    status: "Committed",
    description: "Information Security Management System (ISMS) certification under ISO/IEC 27001 ensures systematic management of sensitive company and customer information.",
    details: [
      "Risk assessment and treatment methodology",
      "Information security policies and procedures",
      "Access control and identity management",
      "Business continuity and disaster recovery",
      "Regular management reviews and internal audits"
    ]
  },
  {
    title: "ISO 42001",
    icon: Brain,
    status: "Committed",
    description: "AI Management System certification under ISO/IEC 42001 ensures responsible development and deployment of artificial intelligence technologies.",
    details: [
      "AI risk assessment and mitigation",
      "Transparency and explainability of AI decisions",
      "Bias detection and fairness monitoring",
      "Human oversight of AI systems",
      "Ethical AI governance framework"
    ]
  },
  {
    title: "PCI-DSS",
    icon: CreditCard,
    status: "Committed",
    description: "Payment Card Industry Data Security Standard compliance ensures secure handling of cardholder data throughout all payment processing.",
    details: [
      "Encrypted transmission of cardholder data",
      "No storage of sensitive authentication data",
      "Regular network security testing",
      "PCI-DSS compliant payment processors",
      "Strong access control measures"
    ]
  },
  {
    title: "GDPR",
    icon: Globe,
    status: "Active",
    description: "Full compliance with the European Union's General Data Protection Regulation, ensuring protection of personal data for EU/EEA residents.",
    details: [
      "Lawful basis for data processing (Art. 6)",
      "Data subject rights implementation (Art. 15-22)",
      "Data Protection Impact Assessments",
      "Data Processing Agreements with all processors",
      "Standard Contractual Clauses for international transfers",
      "72-hour breach notification procedures"
    ]
  },
  {
    title: "CCPA / CPRA",
    icon: Scale,
    status: "Active",
    description: "Compliance with the California Consumer Privacy Act and California Privacy Rights Act, providing California residents with enhanced privacy rights.",
    details: [
      "Right to know, delete, and opt-out",
      "No sale of personal information",
      "Privacy policy disclosures",
      "Consumer request verification procedures",
      "Employee and B2B data protections"
    ]
  },
  {
    title: "HIPAA Awareness",
    icon: Heart,
    status: "Aware",
    description: "While not currently a covered entity, we maintain HIPAA awareness and readiness for potential healthcare-related data handling requirements.",
    details: [
      "Data encryption at rest and in transit",
      "Access controls and audit logging",
      "Business Associate Agreement readiness",
      "Employee training on PHI handling",
      "Incident response procedures"
    ]
  },
  {
    title: "Responsible AI Disclosure",
    icon: FileCheck,
    status: "Active",
    description: "Transparent disclosure of AI usage across our platform, aligned with emerging AI governance standards and ISO 42001 principles.",
    details: [
      "Clear labeling of AI-generated content",
      "User opt-out for AI-powered features",
      "Regular bias and fairness audits",
      "AI model documentation and versioning",
      "Human-in-the-loop for critical decisions"
    ]
  }
];

const Compliance = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "Committed": return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "Aware": return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Security & Compliance</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            TCL Tech Solutions is committed to the highest standards of security, privacy, and regulatory compliance. 
            We continuously invest in protecting your data and maintaining trust through industry-recognized frameworks.
          </p>
        </div>

        {/* Security Overview */}
        <div className="bg-muted/30 border border-border rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Our Security Commitment</h2>
          <div className="grid md:grid-cols-3 gap-6 text-muted-foreground">
            <div>
              <h3 className="font-medium text-foreground mb-2">Data Encryption</h3>
              <p className="text-sm">All data encrypted in transit (TLS 1.2+) and at rest (AES-256). Zero-knowledge architecture where applicable.</p>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-2">Access Controls</h3>
              <p className="text-sm">Role-based access control (RBAC), multi-factor authentication, and principle of least privilege across all systems.</p>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-2">Monitoring & Response</h3>
              <p className="text-sm">24/7 security monitoring, automated threat detection, and documented incident response procedures with defined SLAs.</p>
            </div>
          </div>
        </div>

        {/* Compliance Frameworks */}
        <div className="grid md:grid-cols-2 gap-6">
          {complianceFrameworks.map((framework) => (
            <Card key={framework.title} className="border-border">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <framework.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{framework.title}</CardTitle>
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getStatusColor(framework.status)}`}>
                    {framework.status}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{framework.description}</p>
                <ul className="space-y-1.5">
                  {framework.details.map((detail, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact for Compliance */}
        <div className="mt-12 text-center bg-muted/30 border border-border rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Compliance Inquiries</h2>
          <p className="text-muted-foreground mb-4">
            For compliance-related inquiries, audit reports, or Data Processing Agreements, please contact our security team.
          </p>
          <div className="text-muted-foreground">
            <p>Email: theconnectedlifestyletech@gmail.com</p>
            <p>Phone: (210) 995-8655</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compliance;
