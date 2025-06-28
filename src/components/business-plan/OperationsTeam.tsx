
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const OperationsTeam = () => {
  const teamMembers = [
    {
      name: "Damon J. Jackson",
      title: "Founder & CEO",
      background: "22 yrs USAF intel; B.S. Network & Comms; built 30+ custom theaters since 1999"
    },
    {
      name: "Phillip Russell",
      title: "Strategic Co‑Founder (Streamwalkers Corp)",
      background: "SaaS & growth specialist; oversees investor relations, automations, and GTM"
    }
  ];

  const operationalSLAs = [
    { process: "Quote Delivery", sla: "< 48 hours", description: "From initial inquiry" },
    { process: "Install Start", sla: "< 7 days", description: "From signed contract" },
    { process: "Support Response", sla: "< 4 hours", description: "First response time" },
    { process: "Install Completion", sla: "2.5 days", description: "Average project duration" }
  ];

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl text-blue-600">7. Operations & Execution Plan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Staffing Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Hire 5 installers, 1 support tech, 1 sales rep by Month 12</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Infrastructure</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Showroom & Content Studio in Far West SA (2,000 sq ft) by Month 9</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Technology Stack</CardTitle>
              </CardHeader>
              <CardContent>
                <p>ActivePipeline CRM + Notion; Inventory via Finale; QA surveys post‑install</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quality Assurance</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Post‑install NPS surveys; proactive maintenance visits; 2‑month cash contingency</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Process SLAs</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Process</TableHead>
                    <TableHead>SLA</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {operationalSLAs.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.process}</TableCell>
                      <TableCell className="font-semibold text-green-600">{item.sla}</TableCell>
                      <TableCell className="text-gray-600">{item.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-blue-600">8. Management & Organization</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Background</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamMembers.map((member, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{member.name}</TableCell>
                  <TableCell className="font-semibold text-blue-600">{member.title}</TableCell>
                  <TableCell>{member.background}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Card className="bg-blue-50">
            <CardHeader>
              <CardTitle className="text-blue-700">Advisory Structure</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold">Advisory Board / Partnership Oversight Committee</h4>
                  <p className="text-sm text-gray-600">5 seats – 3 Streamwalkers, 2 TCL Tech</p>
                </div>
                <p>Seasoned founders/investors guiding milestones; transitions to Advisory Board post‑milestones.</p>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default OperationsTeam;
