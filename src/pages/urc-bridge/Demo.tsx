import LeadForm from "./LeadForm";

export default function UrcBridgeDemo() {
  return (
    <LeadForm
      source="demo"
      title="Request a demo"
      subtitle="Tell us about your deployment. We respond within one business day."
      successTitle="Received."
      successBody="We have your demo request. You will hear from us within one business day."
    />
  );
}