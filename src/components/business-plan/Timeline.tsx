
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Calendar, ChevronDown, Clock, Target } from "lucide-react";
import { useState } from "react";

const Timeline = () => {
  const [openPhases, setOpenPhases] = useState<string[]>(["phase1"]);

  const togglePhase = (phaseId: string) => {
    setOpenPhases(prev => 
      prev.includes(phaseId) 
        ? prev.filter(id => id !== phaseId)
        : [...prev, phaseId]
    );
  };

  const phases = [
    {
      id: "phase1",
      title: "Foundation & Seed Funding",
      months: "1-3",
      color: "blue",
      highlights: [
        "Complete seed funding round",
        "Establish operations & showroom",
        "Build initial team",
        "Launch marketing campaigns"
      ],
      weeklyOverview: [
        {
          weeks: "1-4",
          focus: "Market research, financial modeling, pitch deck development, initial investor outreach"
        },
        {
          weeks: "5-8",
          focus: "Iterate pitch, conduct investor meetings, finalize brand identity, hire first technician"
        },
        {
          weeks: "9-12",
          focus: "Close seed round, purchase equipment, set up showroom, launch pilot program"
        }
      ]
    },
    {
      id: "phase2",
      title: "Pilot Rollouts & Early Traction",
      months: "4-6",
      color: "green",
      highlights: [
        "20-30 pilot installations",
        "Launch subscription billing",
        "Expand team to 5 people",
        "Generate customer case studies"
      ],
      weeklyOverview: [
        {
          weeks: "13-16",
          focus: "Launch pilot installs, capture marketing assets, activate Stripe billing, announce service tiers"
        },
        {
          weeks: "17-20",
          focus: "Hire sales reps and techs, scale ad budget to $2.5K/mo, publish content marketing"
        },
        {
          weeks: "21-24",
          focus: "Host demo events, close 10+ paid installs, implement field ops tools, launch NPS surveys"
        }
      ]
    },
    {
      id: "phase3",
      title: "Aggressive Growth",
      months: "7-9",
      color: "purple",
      highlights: [
        "Scale sales team to 6 reps",
        "Launch Voice AI upsells",
        "Expand ad budget to $7K/mo",
        "Target high-income neighborhoods"
      ],
      weeklyOverview: [
        {
          weeks: "25-28",
          focus: "Hire additional sales reps, launch referral incentives, scale advertising, begin Voice AI development"
        },
        {
          weeks: "29-32",
          focus: "Pilot Voice AI features, develop energy analytics, expand to home shows, optimize conversion rates"
        },
        {
          weeks: "33-36",
          focus: "Quarterly review, secure press coverage, implement sales tracking, plan regional expansion"
        }
      ]
    },
    {
      id: "phase4",
      title: "Infrastructure & Regional Expansion",
      months: "10-12",
      color: "orange",
      highlights: [
        "Launch Boerne & New Braunfels",
        "Roll out loyalty programs",
        "Deploy remote diagnostics",
        "Reach $100K MRR"
      ],
      weeklyOverview: [
        {
          weeks: "37-40",
          focus: "Expand geographic coverage, sign regional builders, establish service areas"
        },
        {
          weeks: "41-44",
          focus: "Launch referral programs, activate remote diagnostics, enhance customer retention"
        },
        {
          weeks: "45-48",
          focus: "Deploy camera analytics beta, implement inventory management, conduct Q4 review"
        }
      ]
    },
    {
      id: "phase5",
      title: "Scale & Optimize",
      months: "13-18",
      color: "red",
      highlights: [
        "Double sales team size",
        "Launch Austin test market",
        "Reach $500K MRR",
        "Prepare Series A"
      ],
      weeklyOverview: [
        {
          weeks: "49-52",
          focus: "Scale sales team, launch training academy, optimize operations"
        },
        {
          weeks: "53-60",
          focus: "Premium upsells at luxury shows, content marketing blitz, Austin market entry"
        },
        {
          weeks: "61-72",
          focus: "Systemize multi-city operations, integrate BI dashboard, prepare for Series A"
        },
        {
          weeks: "73-78",
          focus: "Series A roadshow, target $2-3M raise, plan nationwide rollout"
        }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-6 w-6 text-blue-600" />
            18-Month Detailed Action Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-6">
            Comprehensive week-by-week execution plan with measurable milestones and key performance indicators.
          </p>
          
          <div className="space-y-4">
            {phases.map((phase) => (
              <Collapsible 
                key={phase.id}
                open={openPhases.includes(phase.id)}
                onOpenChange={() => togglePhase(phase.id)}
              >
                <Card className={`border-${phase.color}-200`}>
                  <CollapsibleTrigger asChild>
                    <CardHeader className={`bg-${phase.color}-50 cursor-pointer hover:bg-${phase.color}-100 transition-colors`}>
                      <CardTitle className={`flex items-center justify-between text-${phase.color}-700`}>
                        <div className="flex items-center gap-3">
                          <Target className="h-5 w-5" />
                          <div>
                            <div className="text-lg">{phase.title}</div>
                            <div className="text-sm font-normal text-gray-600">Months {phase.months}</div>
                          </div>
                        </div>
                        <ChevronDown className={`h-5 w-5 transition-transform ${openPhases.includes(phase.id) ? 'rotate-180' : ''}`} />
                      </CardTitle>
                    </CardHeader>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent>
                    <CardContent className="pt-6">
                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            Key Highlights
                          </h4>
                          <ul className="space-y-2">
                            {phase.highlights.map((highlight, index) => (
                              <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                                <div className={`w-2 h-2 rounded-full bg-${phase.color}-500 mt-2 flex-shrink-0`}></div>
                                {highlight}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-3">Weekly Focus Areas</h4>
                          <div className="space-y-3">
                            {phase.weeklyOverview.map((period, index) => (
                              <div key={index} className={`p-3 bg-${phase.color}-50 rounded-lg border border-${phase.color}-200`}>
                                <div className={`font-medium text-${phase.color}-700 text-sm mb-1`}>
                                  Weeks {period.weeks}
                                </div>
                                <div className="text-sm text-gray-700">{period.focus}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      {phase.id === "phase1" && (
                        <div className={`bg-${phase.color}-50 p-4 rounded-lg border border-${phase.color}-200`}>
                          <h4 className="font-semibold mb-3">Sample Daily Actions (Week 1)</h4>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <div className="text-sm font-medium mb-2">Days 1-3</div>
                              <ul className="text-xs text-gray-700 space-y-1">
                                <li>• Company kick-off & vision alignment</li>
                                <li>• Market research sprint</li>
                                <li>• SWOT analysis workshop</li>
                              </ul>
                            </div>
                            <div>
                              <div className="text-sm font-medium mb-2">Days 4-5</div>
                              <ul className="text-xs text-gray-700 space-y-1">
                                <li>• Financial model v0.1 development</li>
                                <li>• Pitch deck outline creation</li>
                                <li>• Competitive analysis deep-dive</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-green-600">Success Metrics & KPIs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">$500K</div>
              <div className="text-sm text-gray-600">MRR by Month 24</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">$1.3M</div>
              <div className="text-sm text-gray-600">Cash Reserve by Month 18</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">2 Patents</div>
              <div className="text-sm text-gray-600">Filed by Month 18</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Timeline;
