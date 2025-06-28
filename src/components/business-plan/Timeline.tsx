
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Timeline = () => {
  const phases = [
    {
      phase: "Phase 1: Foundation & Seed Funding",
      timeline: "Months 1-3",
      deliverables: "Business registration, office lease, equipment purchase, website live",
      color: "bg-blue-50 border-blue-200"
    },
    {
      phase: "Phase 2: Build",
      timeline: "Months 4-6", 
      deliverables: "R&D prototypes, initial marketing, showroom construction",
      color: "bg-green-50 border-green-200"
    },
    {
      phase: "Phase 3: Sell",
      timeline: "Months 7-9",
      deliverables: "Hire sales/install team, first $250k in installs, secure 50 support subscribers",
      color: "bg-purple-50 border-purple-200"
    },
    {
      phase: "Phase 4: Scale",
      timeline: "Months 10-12",
      deliverables: "3 job sites/day, $100k MRR, pivot to commercial services planning",
      color: "bg-orange-50 border-orange-200"
    },
    {
      phase: "Phase 5: Optimize",
      timeline: "Months 13-18",
      deliverables: "$500k MRR, cash reserve $1.3M, file 2 patents, explore Series A",
      color: "bg-red-50 border-red-200"
    }
  ];

  const detailedSchedule = [
    {
      title: "Month 1 - Foundation Week by Week",
      content: [
        "Week 1: Company kick-off, market research sprint, SWOT workshop, financial model v0.1",
        "Week 2: Competitor analysis, financial model v0.2, business plan drafting, brand mood-board",
        "Week 3: External feedback loop, mentor reviews, investor materials prep, website setup",
        "Week 4: Funding outreach, hiring kickoff, investor calls, networking events"
      ]
    },
    {
      title: "Months 2-3 - Seed Funding & Setup",
      content: [
        "Weeks 5-6: Iterate pitch deck, host 10 pitch meetings/week, brand finalization, onboard first technician",
        "Weeks 7-8: Reach 50% seed commitment, build ops playbooks, record demo videos",
        "Weeks 9-10: Close seed round, purchase equipment and inventory, pilot subscription billing",
        "Weeks 11-12: Partnership MOUs with builders/realtors, set up HubSpot CRM, Phase-1 retrospective"
      ]
    },
    {
      title: "Months 4-6 - Pilot Rollouts",
      content: [
        "Weeks 13-16: Launch 20-30 pilot installs, spin up live billing, announce service tiers",
        "Weeks 17-20: Expand team (2 sales + 2 techs), $2.5k/mo ad budget, training library",
        "Weeks 21-24: Host first Demo Event, capture 50+ leads, implement Jobber, NPS surveys"
      ]
    },
    {
      title: "Months 7-9 - Aggressive Growth",
      content: [
        "Weeks 25-28: Hire 3rd-4th sales reps, map high-income areas, launch referral program",
        "Weeks 29-32: Scale ad budget to $7k, Voice AI workshop, pilot AI upsells",
        "Weeks 33-36: Energy analytics features, Home & Garden Show booth, quarterly OKR review"
      ]
    },
    {
      title: "Months 10-12 - Regional Expansion",
      content: [
        "Weeks 37-40: Launch Boerne & New Braunfels coverage, sign regional builders",
        "Weeks 41-44: Referral loyalty program, remote diagnostics service rollout",
        "Weeks 45-48: Live camera analytics beta, inventory management system, Q4 KPI retro"
      ]
    },
    {
      title: "Months 13-18 - Scale & Optimize",
      content: [
        "Weeks 49-52: Double sales team to 8-10, launch training academy",
        "Weeks 53-56: Premium AI/IoT upsells at Luxury Home Show, TikTok/YouTube ads",
        "Weeks 57-60: Austin test market launch, localized advertising campaigns",
        "Weeks 61-64: Secure 500 Austin leads, evaluate satellite office options",
        "Weeks 65-68: Systemize SOPs for multi-city scale, integrate BI dashboard",
        "Weeks 69-72: Prep Series-A data room, updated financials, investor meetings",
        "Weeks 73-78: Formal Series-A roadshow, target $2-3M raise, 18-month retrospective"
      ]
    }
  ];

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl text-blue-600">9. Roadmap & Milestones (18 Months)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {phases.map((phase, index) => (
              <Card key={index} className={`${phase.color} border-2`}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{phase.phase}</h3>
                      <p className="text-gray-600 mt-1">{phase.deliverables}</p>
                    </div>
                    <div className="mt-2 md:mt-0">
                      <span className="inline-block bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                        {phase.timeline}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-blue-600">18-Month Action Timeline (Detailed)</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="space-y-4">
            {detailedSchedule.map((section, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg">
                <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
                  <span className="font-semibold text-left">{section.title}</span>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <ul className="space-y-3">
                    {section.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-blue-50 to-indigo-100">
        <CardHeader>
          <CardTitle className="text-xl text-blue-700">Color-Coding Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
              <span>Analytics/Financial</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
              <span>Marketing/Brand</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-orange-500 rounded mr-2"></div>
              <span>Operations/Technical</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-500 rounded mr-2"></div>
              <span>Partnerships/Networking</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-6 text-center">
          <p className="text-lg font-medium text-green-800 mb-2">
            📄 Prepared by Streamwalkers Corp in collaboration with TCL Tech Solutions
          </p>
          <p className="text-sm text-green-600">Confidential & Proprietary</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Timeline;
