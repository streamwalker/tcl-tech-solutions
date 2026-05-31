import LeadForm from "./LeadForm";

export default function UrcBridgePilot() {
  return (
    <LeadForm
      source="pilot"
      title="Start a 30-day pilot"
      subtitle="Full bridge access for 30 days, no payment up front. At day 25 we email you with conversion options."
      successTitle="Your pilot request is in."
      successBody="We will email you the invite code within one business day. The code is locked to the email you submitted and expires in 30 days."
    />
  );
}