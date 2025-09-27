import { useState } from "react";
import Navigation from "../components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Network, Layers, Cloud, Shield, Cpu, Brain, Scale, BookOpen, GraduationCap, Clock, Target, CheckCircle, Award, Users } from "lucide-react";

const Education = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <Navigation />
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <BookOpen className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-6">
            Technology Education Center
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive guides to networking models, AI frameworks, and emerging technologies that shape our connected world.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="networking" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="networking" className="flex items-center gap-2">
                <Network className="h-4 w-4" />
                Networking Models
              </TabsTrigger>
              <TabsTrigger value="ai" className="flex items-center gap-2">
                <Brain className="h-4 w-4" />
                AI Frameworks
              </TabsTrigger>
              <TabsTrigger value="emerging" className="flex items-center gap-2">
                <Cpu className="h-4 w-4" />
                Emerging Tech
              </TabsTrigger>
              <TabsTrigger value="tcl-training" className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                TCL Training
              </TabsTrigger>
            </TabsList>

            {/* Networking Models Tab */}
            <TabsContent value="networking" className="space-y-8">
              <div className="grid gap-6">
                {/* Foundational Models */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Layers className="h-5 w-5" />
                      Foundational Network Models
                    </CardTitle>
                    <CardDescription>
                      The core reference models that define how networks communicate
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="tcpip">
                        <AccordionTrigger>TCP/IP Model (4 Layers)</AccordionTrigger>
                        <AccordionContent className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-semibold mb-3">Layer Structure</h4>
                              <div className="space-y-2">
                                <div className="p-3 bg-primary/10 rounded border-l-4 border-primary">
                                  <strong>Application Layer</strong>
                                  <p className="text-sm text-muted-foreground">HTTP/HTTPS, FTP, SMTP, DNS, DHCP</p>
                                </div>
                                <div className="p-3 bg-secondary/50 rounded border-l-4 border-secondary">
                                  <strong>Transport Layer</strong>
                                  <p className="text-sm text-muted-foreground">TCP, UDP - Reliable/Unreliable delivery</p>
                                </div>
                                <div className="p-3 bg-accent/30 rounded border-l-4 border-accent">
                                  <strong>Internet Layer</strong>
                                  <p className="text-sm text-muted-foreground">IP, ICMP, ARP - Routing & addressing</p>
                                </div>
                                <div className="p-3 bg-muted rounded border-l-4 border-muted-foreground">
                                  <strong>Network Access</strong>
                                  <p className="text-sm text-muted-foreground">Ethernet, WiFi, PPP - Physical transmission</p>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-3">Real-World Applications</h4>
                              <ul className="space-y-2 text-sm">
                                <li>• <strong>Smart Home:</strong> IoT devices use HTTP/MQTT over TCP/IP</li>
                                <li>• <strong>Enterprise:</strong> VoIP systems leverage UDP for real-time audio</li>
                                <li>• <strong>Security:</strong> VPNs tunnel traffic through IP layer</li>
                                <li>• <strong>Troubleshooting:</strong> Ping uses ICMP at Internet layer</li>
                              </ul>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="osi">
                        <AccordionTrigger>OSI Model (7 Layers)</AccordionTrigger>
                        <AccordionContent className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-semibold mb-3">Layer Breakdown</h4>
                              <div className="space-y-2">
                                <div className="p-2 bg-primary/10 rounded text-sm">
                                  <strong>7. Application:</strong> User interface (HTTP, FTP, SMTP)
                                </div>
                                <div className="p-2 bg-primary/20 rounded text-sm">
                                  <strong>6. Presentation:</strong> Data encryption/compression (SSL/TLS)
                                </div>
                                <div className="p-2 bg-secondary/30 rounded text-sm">
                                  <strong>5. Session:</strong> Connection management (NetBIOS, RPC)
                                </div>
                                <div className="p-2 bg-secondary/50 rounded text-sm">
                                  <strong>4. Transport:</strong> Reliable delivery (TCP, UDP)
                                </div>
                                <div className="p-2 bg-accent/30 rounded text-sm">
                                  <strong>3. Network:</strong> Routing (IP, ICMP, OSPF)
                                </div>
                                <div className="p-2 bg-accent/50 rounded text-sm">
                                  <strong>2. Data Link:</strong> Frame delivery (Ethernet, PPP)
                                </div>
                                <div className="p-2 bg-muted rounded text-sm">
                                  <strong>1. Physical:</strong> Electrical signals (Cable, Radio)
                                </div>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-3">Troubleshooting Guide</h4>
                              <ul className="space-y-2 text-sm">
                                <li>• <strong>Physical:</strong> Check cables, power, LEDs</li>
                                <li>• <strong>Data Link:</strong> Verify MAC addresses, switch ports</li>
                                <li>• <strong>Network:</strong> Test IP connectivity, routing tables</li>
                                <li>• <strong>Transport:</strong> Check port accessibility, firewalls</li>
                                <li>• <strong>Session:</strong> Verify authentication, timeouts</li>
                                <li>• <strong>Presentation:</strong> Check SSL/TLS certificates</li>
                                <li>• <strong>Application:</strong> Test specific protocols, services</li>
                              </ul>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="dod">
                        <AccordionTrigger>DoD Model (Military/Government)</AccordionTrigger>
                        <AccordionContent className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-semibold mb-3">4-Layer DoD Structure</h4>
                              <div className="space-y-2">
                                <div className="p-3 bg-primary/10 rounded border-l-4 border-primary">
                                  <strong>Process/Application</strong>
                                  <p className="text-sm text-muted-foreground">User applications and services</p>
                                </div>
                                <div className="p-3 bg-secondary/50 rounded border-l-4 border-secondary">
                                  <strong>Host-to-Host</strong>
                                  <p className="text-sm text-muted-foreground">TCP/UDP transport protocols</p>
                                </div>
                                <div className="p-3 bg-accent/30 rounded border-l-4 border-accent">
                                  <strong>Internet</strong>
                                  <p className="text-sm text-muted-foreground">IP routing and addressing</p>
                                </div>
                                <div className="p-3 bg-muted rounded border-l-4 border-muted-foreground">
                                  <strong>Network Access</strong>
                                  <p className="text-sm text-muted-foreground">Physical network interface</p>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-3">Government Usage</h4>
                              <ul className="space-y-2 text-sm">
                                <li>• Still referenced in military contracts</li>
                                <li>• DISA (Defense Information Systems Agency) standards</li>
                                <li>• Federal cybersecurity frameworks</li>
                                <li>• Legacy system documentation</li>
                                <li>• Predecessor to modern TCP/IP stack</li>
                              </ul>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>

                {/* Modern Networking Paradigms */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Cloud className="h-5 w-5" />
                      Modern Networking Paradigms
                    </CardTitle>
                    <CardDescription>
                      Contemporary models addressing IoT, cloud, and security challenges
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="iot-models">
                        <AccordionTrigger>IoT Reference Models (Cisco, IEEE, ITU)</AccordionTrigger>
                        <AccordionContent className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-semibold mb-3">5-7 Layer IoT Stack</h4>
                              <div className="space-y-2">
                                <div className="p-3 bg-primary/10 rounded">
                                  <strong>Business Layer</strong>
                                  <p className="text-sm text-muted-foreground">Analytics, reporting, business logic</p>
                                </div>
                                <div className="p-3 bg-secondary/50 rounded">
                                  <strong>Application Layer</strong>
                                  <p className="text-sm text-muted-foreground">User interfaces, mobile apps</p>
                                </div>
                                <div className="p-3 bg-accent/30 rounded">
                                  <strong>Edge Computing</strong>
                                  <p className="text-sm text-muted-foreground">Local processing, gateways</p>
                                </div>
                                <div className="p-3 bg-muted/50 rounded">
                                  <strong>Network Layer</strong>
                                  <p className="text-sm text-muted-foreground">WiFi, cellular, LoRaWAN, Zigbee</p>
                                </div>
                                <div className="p-3 bg-muted rounded">
                                  <strong>Device Layer</strong>
                                  <p className="text-sm text-muted-foreground">Sensors, actuators, embedded systems</p>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-3">ConnectTek Applications</h4>
                              <ul className="space-y-2 text-sm">
                                <li>• Smart home device integration</li>
                                <li>• Edge computing for local control</li>
                                <li>• Multi-protocol gateway solutions</li>
                                <li>• Cloud analytics and monitoring</li>
                                <li>• Low-power sensor networks</li>
                              </ul>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="iiot">
                        <AccordionTrigger>Industrial IoT - OPC UA & Purdue Model</AccordionTrigger>
                        <AccordionContent className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-semibold mb-3">Purdue Model (ICS Security)</h4>
                              <div className="space-y-2">
                                <div className="p-2 bg-primary/10 rounded text-sm">
                                  <strong>Level 5:</strong> Enterprise Network
                                </div>
                                <div className="p-2 bg-primary/20 rounded text-sm">
                                  <strong>Level 4:</strong> Business Planning & Logistics
                                </div>
                                <div className="p-2 bg-secondary/30 rounded text-sm">
                                  <strong>Level 3:</strong> Operations Management (MES/SCADA)
                                </div>
                                <div className="p-2 bg-secondary/50 rounded text-sm">
                                  <strong>Level 2:</strong> Supervisory Control (HMI)
                                </div>
                                <div className="p-2 bg-accent/30 rounded text-sm">
                                  <strong>Level 1:</strong> Basic Control (PLC/DCS)
                                </div>
                                <div className="p-2 bg-muted rounded text-sm">
                                  <strong>Level 0:</strong> Process (Sensors/Actuators)
                                </div>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-3">OPC UA Features</h4>
                              <ul className="space-y-2 text-sm">
                                <li>• Platform-independent communication</li>
                                <li>• Built-in security (encryption, authentication)</li>
                                <li>• Information modeling capabilities</li>
                                <li>• Real-time data and historical access</li>
                                <li>• Critical infrastructure protection</li>
                              </ul>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="csa">
                        <AccordionTrigger>Cloud Security Alliance (CSA) Stack</AccordionTrigger>
                        <AccordionContent className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-semibold mb-3">Cloud Service Layers</h4>
                              <div className="space-y-2">
                                <div className="p-3 bg-primary/10 rounded border-l-4 border-primary">
                                  <strong>SaaS</strong>
                                  <p className="text-sm text-muted-foreground">Software as a Service (Office 365, Salesforce)</p>
                                </div>
                                <div className="p-3 bg-secondary/50 rounded border-l-4 border-secondary">
                                  <strong>PaaS</strong>
                                  <p className="text-sm text-muted-foreground">Platform as a Service (AWS Lambda, Azure Functions)</p>
                                </div>
                                <div className="p-3 bg-accent/30 rounded border-l-4 border-accent">
                                  <strong>IaaS</strong>
                                  <p className="text-sm text-muted-foreground">Infrastructure as a Service (EC2, Virtual Machines)</p>
                                </div>
                                <div className="p-3 bg-muted rounded border-l-4 border-muted-foreground">
                                  <strong>Governance</strong>
                                  <p className="text-sm text-muted-foreground">Security, compliance, risk management</p>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-3">Security Considerations</h4>
                              <ul className="space-y-2 text-sm">
                                <li>• Shared responsibility model</li>
                                <li>• Identity and access management</li>
                                <li>• Data encryption in transit/rest</li>
                                <li>• Compliance frameworks (SOC2, ISO27001)</li>
                                <li>• Cloud-specific threats and mitigations</li>
                              </ul>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="zero-trust">
                        <AccordionTrigger>Zero Trust Architecture (NIST SP 800-207)</AccordionTrigger>
                        <AccordionContent className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-semibold mb-3">Core Principles</h4>
                              <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                  <Shield className="h-4 w-4 text-primary" />
                                  <span className="text-sm"><strong>Never Trust, Always Verify</strong></span>
                                </div>
                                <div className="flex items-center gap-3">
                                  <Shield className="h-4 w-4 text-primary" />
                                  <span className="text-sm"><strong>Least Privilege Access</strong></span>
                                </div>
                                <div className="flex items-center gap-3">
                                  <Shield className="h-4 w-4 text-primary" />
                                  <span className="text-sm"><strong>Assume Breach</strong></span>
                                </div>
                                <div className="flex items-center gap-3">
                                  <Shield className="h-4 w-4 text-primary" />
                                  <span className="text-sm"><strong>Verify Explicitly</strong></span>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-3">Implementation Components</h4>
                              <ul className="space-y-2 text-sm">
                                <li>• Policy Engine (PE) - Decision point</li>
                                <li>• Policy Administrator (PA) - Enforcement</li>
                                <li>• Policy Enforcement Point (PEP) - Gateway</li>
                                <li>• Continuous monitoring and analytics</li>
                                <li>• Micro-segmentation of networks</li>
                              </ul>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* AI Frameworks Tab */}
            <TabsContent value="ai" className="space-y-8">
              <div className="grid gap-6">
                {/* Foundational AI Models */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="h-5 w-5" />
                      Foundational AI Model Frameworks
                    </CardTitle>
                    <CardDescription>
                      Core conceptual frameworks used by researchers and policymakers
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="three-level">
                        <AccordionTrigger>Three-Level AI Model (EU/US Policy)</AccordionTrigger>
                        <AccordionContent className="space-y-4">
                          <div className="grid md:grid-cols-3 gap-4">
                            <div className="p-4 bg-primary/10 rounded-lg border-l-4 border-primary">
                              <h4 className="font-semibold text-primary mb-2">Narrow AI (ANI)</h4>
                              <p className="text-sm text-muted-foreground mb-3">Task-specific intelligence</p>
                              <ul className="text-xs space-y-1">
                                <li>• Face recognition systems</li>
                                <li>• Language translation</li>
                                <li>• Recommendation engines</li>
                                <li>• Chess/Go programs</li>
                              </ul>
                            </div>
                            <div className="p-4 bg-secondary/50 rounded-lg border-l-4 border-secondary">
                              <h4 className="font-semibold text-secondary-foreground mb-2">General AI (AGI)</h4>
                              <p className="text-sm text-muted-foreground mb-3">Human-level reasoning</p>
                              <ul className="text-xs space-y-1">
                                <li>• Cross-domain learning</li>
                                <li>• Abstract reasoning</li>
                                <li>• Creative problem solving</li>
                                <li>• Context understanding</li>
                              </ul>
                            </div>
                            <div className="p-4 bg-accent/30 rounded-lg border-l-4 border-accent">
                              <h4 className="font-semibold text-accent-foreground mb-2">Superintelligence (ASI)</h4>
                              <p className="text-sm text-muted-foreground mb-3">Beyond-human capacity</p>
                              <ul className="text-xs space-y-1">
                                <li>• Scientific breakthroughs</li>
                                <li>• Recursive self-improvement</li>
                                <li>• Novel solution generation</li>
                                <li>• Global optimization</li>
                              </ul>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="lifecycle">
                        <AccordionTrigger>AI Lifecycle Models (NIST, ISO/IEC)</AccordionTrigger>
                        <AccordionContent className="space-y-4">
                          <div className="space-y-3">
                            <div className="flex items-center gap-4 p-3 bg-primary/5 rounded">
                              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">1</div>
                              <div>
                                <strong>Data Collection & Preparation</strong>
                                <p className="text-sm text-muted-foreground">Gathering, cleaning, labeling training data</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 p-3 bg-secondary/20 rounded">
                              <div className="w-8 h-8 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center text-sm font-bold">2</div>
                              <div>
                                <strong>Model Training & Validation</strong>
                                <p className="text-sm text-muted-foreground">Algorithm selection, training, testing, optimization</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 p-3 bg-accent/20 rounded">
                              <div className="w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-bold">3</div>
                              <div>
                                <strong>Deployment & Integration</strong>
                                <p className="text-sm text-muted-foreground">Production deployment, API integration, scaling</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 p-3 bg-muted/50 rounded">
                              <div className="w-8 h-8 bg-muted-foreground text-muted rounded-full flex items-center justify-center text-sm font-bold">4</div>
                              <div>
                                <strong>Monitoring & Maintenance</strong>
                                <p className="text-sm text-muted-foreground">Performance tracking, drift detection, retraining</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 p-3 bg-primary/10 rounded">
                              <div className="w-8 h-8 bg-primary/60 text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">5</div>
                              <div>
                                <strong>Governance & Compliance</strong>
                                <p className="text-sm text-muted-foreground">Ethics review, regulatory compliance, auditing</p>
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="perception-action">
                        <AccordionTrigger>Perception-Reasoning-Action Models</AccordionTrigger>
                        <AccordionContent className="space-y-4">
                          <div className="grid md:grid-cols-3 gap-4">
                            <div className="text-center">
                              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Brain className="h-8 w-8 text-primary" />
                              </div>
                              <h4 className="font-semibold mb-2">Perception</h4>
                              <p className="text-sm text-muted-foreground mb-3">Sensing and understanding environment</p>
                              <ul className="text-xs space-y-1">
                                <li>Computer vision</li>
                                <li>Natural language processing</li>
                                <li>Sensor data fusion</li>
                                <li>Pattern recognition</li>
                              </ul>
                            </div>
                            <div className="text-center">
                              <div className="w-16 h-16 bg-secondary/30 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Cpu className="h-8 w-8 text-secondary-foreground" />
                              </div>
                              <h4 className="font-semibold mb-2">Reasoning</h4>
                              <p className="text-sm text-muted-foreground mb-3">Decision making and planning</p>
                              <ul className="text-xs space-y-1">
                                <li>Logical inference</li>
                                <li>Probabilistic reasoning</li>
                                <li>Planning algorithms</li>
                                <li>Knowledge representation</li>
                              </ul>
                            </div>
                            <div className="text-center">
                              <div className="w-16 h-16 bg-accent/30 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Scale className="h-8 w-8 text-accent-foreground" />
                              </div>
                              <h4 className="font-semibold mb-2">Action</h4>
                              <p className="text-sm text-muted-foreground mb-3">Executing decisions in real world</p>
                              <ul className="text-xs space-y-1">
                                <li>Robot control systems</li>
                                <li>Automated responses</li>
                                <li>System integration</li>
                                <li>Feedback loops</li>
                              </ul>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>

                {/* Next-Gen AI Paradigms */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Cpu className="h-5 w-5" />
                      Next-Generation AI Paradigms
                    </CardTitle>
                    <CardDescription>
                      Emerging alternatives to traditional monolithic AI models
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="foundation">
                        <AccordionTrigger>Foundation Models (GPT, Claude, Gemini, Llama)</AccordionTrigger>
                        <AccordionContent className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-semibold mb-3">Characteristics</h4>
                              <ul className="space-y-2 text-sm">
                                <li>• <strong>Large-scale pretraining:</strong> Billions of parameters</li>
                                <li>• <strong>Multi-modal capabilities:</strong> Text, images, code</li>
                                <li>• <strong>Transfer learning:</strong> Fine-tune for specific tasks</li>
                                <li>• <strong>Emergent abilities:</strong> Capabilities not explicitly trained</li>
                                <li>• <strong>In-context learning:</strong> Few-shot learning from examples</li>
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-3">Industry Impact</h4>
                              <div className="space-y-3">
                                <Badge variant="outline" className="w-full justify-start">
                                  OpenAI GPT - Conversational AI, coding assistance
                                </Badge>
                                <Badge variant="outline" className="w-full justify-start">
                                  Anthropic Claude - Constitutional AI, safety focus
                                </Badge>
                                <Badge variant="outline" className="w-full justify-start">
                                  Google Gemini - Multimodal understanding
                                </Badge>
                                <Badge variant="outline" className="w-full justify-start">
                                  Meta Llama - Open-source alternative
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="agents">
                        <AccordionTrigger>Agent-Based Models (MCP, AutoGPT, LangChain)</AccordionTrigger>
                        <AccordionContent className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-semibold mb-3">Agent Architecture</h4>
                              <div className="space-y-2">
                                <div className="p-3 bg-primary/10 rounded border-l-4 border-primary">
                                  <strong>Planning Agent</strong>
                                  <p className="text-sm text-muted-foreground">Task decomposition and strategy</p>
                                </div>
                                <div className="p-3 bg-secondary/50 rounded border-l-4 border-secondary">
                                  <strong>Tool Agents</strong>
                                  <p className="text-sm text-muted-foreground">API calls, file operations, calculations</p>
                                </div>
                                <div className="p-3 bg-accent/30 rounded border-l-4 border-accent">
                                  <strong>Memory Agent</strong>
                                  <p className="text-sm text-muted-foreground">Context retention, knowledge storage</p>
                                </div>
                                <div className="p-3 bg-muted rounded border-l-4 border-muted-foreground">
                                  <strong>Coordination</strong>
                                  <p className="text-sm text-muted-foreground">Inter-agent communication</p>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-3">Use Cases</h4>
                              <ul className="space-y-2 text-sm">
                                <li>• <strong>Autonomous coding:</strong> Full software development</li>
                                <li>• <strong>Research assistance:</strong> Information gathering and synthesis</li>
                                <li>• <strong>Business automation:</strong> Complex workflow execution</li>
                                <li>• <strong>Personal assistants:</strong> Multi-step task completion</li>
                                <li>• <strong>System integration:</strong> Cross-platform coordination</li>
                              </ul>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="neurosymbolic">
                        <AccordionTrigger>Neurosymbolic Models</AccordionTrigger>
                        <AccordionContent className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-semibold mb-3">Hybrid Approach</h4>
                              <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                  <div className="w-4 h-4 bg-primary rounded-full"></div>
                                  <span className="text-sm"><strong>Neural Networks:</strong> Pattern recognition, learning</span>
                                </div>
                                <div className="flex items-center gap-3">
                                  <div className="w-4 h-4 bg-secondary rounded-full"></div>
                                  <span className="text-sm"><strong>Symbolic AI:</strong> Logic, rules, reasoning</span>
                                </div>
                                <div className="flex items-center gap-3">
                                  <div className="w-4 h-4 bg-accent rounded-full"></div>
                                  <span className="text-sm"><strong>Integration:</strong> Best of both worlds</span>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-3">Benefits</h4>
                              <ul className="space-y-2 text-sm">
                                <li>• <strong>Interpretability:</strong> Explainable decisions</li>
                                <li>• <strong>Consistency:</strong> Logical rule adherence</li>
                                <li>• <strong>Efficiency:</strong> Less data for specialized tasks</li>
                                <li>• <strong>Robustness:</strong> Handles edge cases better</li>
                                <li>• <strong>Domain knowledge:</strong> Incorporates expert rules</li>
                              </ul>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="edge-ai">
                        <AccordionTrigger>Edge/IoT AI Models (TinyML, TensorFlow Lite)</AccordionTrigger>
                        <AccordionContent className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-semibold mb-3">Optimization Techniques</h4>
                              <ul className="space-y-2 text-sm">
                                <li>• <strong>Model compression:</strong> Pruning, quantization</li>
                                <li>• <strong>Knowledge distillation:</strong> Student-teacher training</li>
                                <li>• <strong>Neural architecture search:</strong> Efficient model design</li>
                                <li>• <strong>Hardware acceleration:</strong> Specialized chips (NPU, TPU)</li>
                                <li>• <strong>Federated learning:</strong> Distributed training</li>
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-3">Applications</h4>
                              <ul className="space-y-2 text-sm">
                                <li>• Smart home sensors (voice, motion)</li>
                                <li>• Industrial predictive maintenance</li>
                                <li>• Autonomous vehicle perception</li>
                                <li>• Mobile health monitoring</li>
                                <li>• Agricultural IoT systems</li>
                              </ul>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>

                {/* AI Governance */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Scale className="h-5 w-5" />
                      AI Governance & Legal Models
                    </CardTitle>
                    <CardDescription>
                      Regulatory frameworks for AI risk management and compliance
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="eu-ai-act">
                        <AccordionTrigger>EU AI Act (2024-2026 Rollout)</AccordionTrigger>
                        <AccordionContent className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-semibold mb-3">Risk Categories</h4>
                              <div className="space-y-2">
                                <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded border-l-4 border-red-500">
                                  <strong className="text-red-700 dark:text-red-400">Unacceptable Risk</strong>
                                  <p className="text-sm text-muted-foreground">Banned AI systems (social scoring, manipulation)</p>
                                </div>
                                <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded border-l-4 border-orange-500">
                                  <strong className="text-orange-700 dark:text-orange-400">High Risk</strong>
                                  <p className="text-sm text-muted-foreground">Strict requirements (medical, hiring, education)</p>
                                </div>
                                <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded border-l-4 border-yellow-500">
                                  <strong className="text-yellow-700 dark:text-yellow-400">Limited Risk</strong>
                                  <p className="text-sm text-muted-foreground">Transparency obligations (chatbots, deepfakes)</p>
                                </div>
                                <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded border-l-4 border-green-500">
                                  <strong className="text-green-700 dark:text-green-400">Minimal Risk</strong>
                                  <p className="text-sm text-muted-foreground">No specific obligations (games, filters)</p>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-3">Compliance Requirements</h4>
                              <ul className="space-y-2 text-sm">
                                <li>• Risk assessment and mitigation</li>
                                <li>• Data governance and quality</li>
                                <li>• Documentation and record-keeping</li>
                                <li>• Human oversight requirements</li>
                                <li>• Transparency and explainability</li>
                                <li>• Conformity assessment procedures</li>
                              </ul>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="nist-rmf">
                        <AccordionTrigger>NIST AI Risk Management Framework (2023)</AccordionTrigger>
                        <AccordionContent className="space-y-4">
                          <div className="grid md:grid-cols-4 gap-4">
                            <div className="text-center">
                              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                                <span className="font-bold text-primary">G</span>
                              </div>
                              <h4 className="font-semibold mb-2">Govern</h4>
                              <p className="text-xs text-muted-foreground">Establish policies, roles, responsibilities</p>
                            </div>
                            <div className="text-center">
                              <div className="w-16 h-16 bg-secondary/30 rounded-full flex items-center justify-center mx-auto mb-3">
                                <span className="font-bold text-secondary-foreground">M</span>
                              </div>
                              <h4 className="font-semibold mb-2">Map</h4>
                              <p className="text-xs text-muted-foreground">Identify and categorize AI risks</p>
                            </div>
                            <div className="text-center">
                              <div className="w-16 h-16 bg-accent/30 rounded-full flex items-center justify-center mx-auto mb-3">
                                <span className="font-bold text-accent-foreground">M</span>
                              </div>
                              <h4 className="font-semibold mb-2">Measure</h4>
                              <p className="text-xs text-muted-foreground">Assess and quantify risks</p>
                            </div>
                            <div className="text-center">
                              <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-3">
                                <span className="font-bold text-muted-foreground">M</span>
                              </div>
                              <h4 className="font-semibold mb-2">Manage</h4>
                              <p className="text-xs text-muted-foreground">Implement controls and responses</p>
                            </div>
                          </div>
                          <Separator className="my-4" />
                          <div>
                            <h4 className="font-semibold mb-3">Key Principles</h4>
                            <div className="grid md:grid-cols-2 gap-4">
                              <ul className="space-y-2 text-sm">
                                <li>• Valid and reliable AI systems</li>
                                <li>• Safe and secure operations</li>
                                <li>• Responsible and transparent practices</li>
                              </ul>
                              <ul className="space-y-2 text-sm">
                                <li>• Accountable and explainable decisions</li>
                                <li>• Fair and non-discriminatory outcomes</li>
                                <li>• Privacy-enhanced design</li>
                              </ul>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="oecd">
                        <AccordionTrigger>OECD AI Principles</AccordionTrigger>
                        <AccordionContent className="space-y-4">
                          <div className="grid md:grid-cols-5 gap-4">
                            <div className="text-center p-4 bg-primary/5 rounded-lg">
                              <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
                              <h4 className="font-semibold text-sm mb-1">Human-Centered</h4>
                              <p className="text-xs text-muted-foreground">AI should benefit humanity</p>
                            </div>
                            <div className="text-center p-4 bg-secondary/10 rounded-lg">
                              <Scale className="h-8 w-8 text-secondary-foreground mx-auto mb-2" />
                              <h4 className="font-semibold text-sm mb-1">Fairness</h4>
                              <p className="text-xs text-muted-foreground">Inclusive and equitable</p>
                            </div>
                            <div className="text-center p-4 bg-accent/10 rounded-lg">
                              <BookOpen className="h-8 w-8 text-accent-foreground mx-auto mb-2" />
                              <h4 className="font-semibold text-sm mb-1">Transparency</h4>
                              <p className="text-xs text-muted-foreground">Understandable and explainable</p>
                            </div>
                            <div className="text-center p-4 bg-muted/50 rounded-lg">
                              <Shield className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                              <h4 className="font-semibold text-sm mb-1">Robustness</h4>
                              <p className="text-xs text-muted-foreground">Safe, secure, reliable</p>
                            </div>
                            <div className="text-center p-4 bg-primary/10 rounded-lg">
                              <Scale className="h-8 w-8 text-primary mx-auto mb-2" />
                              <h4 className="font-semibold text-sm mb-1">Accountability</h4>
                              <p className="text-xs text-muted-foreground">Clear responsibility</p>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Emerging Technologies Tab */}
            <TabsContent value="emerging" className="space-y-8">
              <div className="grid gap-6">
                {/* Network Evolution */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Network className="h-5 w-5" />
                      Network Model Evolution
                    </CardTitle>
                    <CardDescription>
                      Trends and technologies reshaping traditional networking paradigms
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="sdn">
                        <AccordionTrigger>Software-Defined Networking (SDN)</AccordionTrigger>
                        <AccordionContent className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-semibold mb-3">Three-Plane Architecture</h4>
                              <div className="space-y-2">
                                <div className="p-3 bg-primary/10 rounded border-l-4 border-primary">
                                  <strong>Application Plane</strong>
                                  <p className="text-sm text-muted-foreground">Network applications, business logic</p>
                                </div>
                                <div className="p-3 bg-secondary/50 rounded border-l-4 border-secondary">
                                  <strong>Control Plane</strong>
                                  <p className="text-sm text-muted-foreground">SDN controller, network intelligence</p>
                                </div>
                                <div className="p-3 bg-accent/30 rounded border-l-4 border-accent">
                                  <strong>Data Plane</strong>
                                  <p className="text-sm text-muted-foreground">Switches, routers, packet forwarding</p>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-3">Benefits Over OSI</h4>
                              <ul className="space-y-2 text-sm">
                                <li>• <strong>Centralized control:</strong> Global network view</li>
                                <li>• <strong>Programmability:</strong> Dynamic policy changes</li>
                                <li>• <strong>Vendor independence:</strong> Open standards</li>
                                <li>• <strong>Automation:</strong> Self-configuring networks</li>
                                <li>• <strong>Innovation:</strong> Rapid service deployment</li>
                              </ul>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="5g6g">
                        <AccordionTrigger>5G/6G Service-Based Architecture</AccordionTrigger>
                        <AccordionContent className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-semibold mb-3">5G Core Functions</h4>
                              <ul className="space-y-2 text-sm">
                                <li>• <strong>AMF:</strong> Access & Mobility Management</li>
                                <li>• <strong>SMF:</strong> Session Management Function</li>
                                <li>• <strong>UPF:</strong> User Plane Function</li>
                                <li>• <strong>PCF:</strong> Policy Control Function</li>
                                <li>• <strong>UDM:</strong> Unified Data Management</li>
                                <li>• <strong>AUSF:</strong> Authentication Server</li>
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-3">6G Vision</h4>
                              <ul className="space-y-2 text-sm">
                                <li>• Terahertz frequencies (100 GHz - 3 THz)</li>
                                <li>• AI-native network architecture</li>
                                <li>• Holographic communications</li>
                                <li>• Brain-computer interfaces</li>
                                <li>• Sustainable network design</li>
                              </ul>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="web3">
                        <AccordionTrigger>Web3 / Decentralized Networking</AccordionTrigger>
                        <AccordionContent className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-semibold mb-3">Core Technologies</h4>
                              <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                  <Network className="h-4 w-4 text-primary" />
                                  <span className="text-sm"><strong>IPFS:</strong> InterPlanetary File System</span>
                                </div>
                                <div className="flex items-center gap-3">
                                  <Network className="h-4 w-4 text-primary" />
                                  <span className="text-sm"><strong>libp2p:</strong> Modular peer-to-peer networking</span>
                                </div>
                                <div className="flex items-center gap-3">
                                  <Network className="h-4 w-4 text-primary" />
                                  <span className="text-sm"><strong>Blockchain:</strong> Distributed consensus</span>
                                </div>
                                <div className="flex items-center gap-3">
                                  <Network className="h-4 w-4 text-primary" />
                                  <span className="text-sm"><strong>DHT:</strong> Distributed Hash Tables</span>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-3">Breaking Traditional Models</h4>
                              <ul className="space-y-2 text-sm">
                                <li>• No central servers or authorities</li>
                                <li>• Content-addressed storage</li>
                                <li>• Cryptographic verification</li>
                                <li>• Economic incentive layers</li>
                                <li>• Censorship resistance</li>
                              </ul>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>

                {/* Future Considerations */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Cpu className="h-5 w-5" />
                      Future Technology Convergence
                    </CardTitle>
                    <CardDescription>
                      How networking and AI models are converging for next-generation systems
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3">AI-Driven Networks</h4>
                        <ul className="space-y-2 text-sm">
                          <li>• Self-optimizing network configurations</li>
                          <li>• Predictive maintenance and failure prevention</li>
                          <li>• Dynamic resource allocation</li>
                          <li>• Intelligent traffic routing</li>
                          <li>• Automated security response</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3">Network-Aware AI</h4>
                        <ul className="space-y-2 text-sm">
                          <li>• Federated learning across edge devices</li>
                          <li>• Latency-sensitive model deployment</li>
                          <li>• Bandwidth-optimized AI pipelines</li>
                          <li>• Privacy-preserving distributed AI</li>
                          <li>• Real-time collaborative intelligence</li>
                        </ul>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="text-center">
                      <h4 className="font-semibold mb-3">ConnectTek's Role in the Future</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        As these technologies converge, ConnectTek positions itself at the intersection of networking innovation and AI integration, 
                        providing cutting-edge solutions for smart homes, enterprises, and emerging IoT ecosystems.
                      </p>
                      <div className="flex flex-wrap justify-center gap-2">
                        <Badge variant="secondary">Network Design</Badge>
                        <Badge variant="secondary">AI Integration</Badge>
                        <Badge variant="secondary">IoT Solutions</Badge>
                        <Badge variant="secondary">Security Implementation</Badge>
                        <Badge variant="secondary">Future-Ready Infrastructure</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* TCL Training Tab */}
            <TabsContent value="tcl-training" className="space-y-8">
              <div className="grid gap-6">
                {/* Program Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5" />
                      TCL Technician Education Plan
                    </CardTitle>
                    <CardDescription>
                      Pathway from Structured Cabling to Advanced Automation Architecture
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold mb-4">Program Overview</h3>
                      <p className="text-muted-foreground mb-4">
                        The TCL Technician Education Plan provides a structured pathway for technicians to develop the skills necessary to design, install, configure, and maintain residential and commercial smart networks. The program is divided into progressive phases, each building on the prior, and integrates hands-on labs, partner certifications, and TCL-specific service protocols.
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <Target className="h-4 w-4" />
                            Outcomes for Graduates
                          </h4>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                              Competency in structured wiring and physical network installation
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                              Mastery of network configuration and security for residential and commercial settings
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                              Proficiency in integrating and programming leading automation systems (URC, Lutron, Savant, RTI, etc.)
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                              Capability to design full-scale automation architectures for homes, businesses, and enterprise clients
                            </li>
                            <li className="flex items-start gap-2">
                              <Award className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                              Certification as a TCL Certified Technician
                            </li>
                          </ul>
                        </div>
                        
                        <div className="bg-card p-4 rounded-lg border">
                          <h4 className="font-semibold mb-3">Program Timeline</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Total Duration:</span>
                              <Badge variant="outline">24-30 weeks</Badge>
                            </div>
                            <div className="flex justify-between">
                              <span>Hands-on Labs:</span>
                              <Badge variant="outline">50+ hours</Badge>
                            </div>
                            <div className="flex justify-between">
                              <span>Certification Levels:</span>
                              <Badge variant="outline">3 tiers</Badge>
                            </div>
                            <div className="flex justify-between">
                              <span>Partner Certifications:</span>
                              <Badge variant="outline">6+ available</Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Training Phases */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Layers className="h-5 w-5" />
                      Training Phases
                    </CardTitle>
                    <CardDescription>
                      Progressive skill development through 7 structured phases
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="phase1">
                        <AccordionTrigger className="flex items-center gap-2">
                          <div className="flex items-center gap-3">
                            <Badge variant="default" className="text-xs">Phase 1</Badge>
                            <span>Foundations (Wiring & Physical Layer)</span>
                            <Badge variant="outline" className="text-xs">
                              <Clock className="h-3 w-3 mr-1" />
                              2-3 weeks
                            </Badge>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-semibold mb-3">Objectives</h4>
                              <ul className="space-y-1 text-sm">
                                <li>• Learn safe, code-compliant wiring practices</li>
                                <li>• Understand cable types, termination, and testing</li>
                                <li>• Build structured cabling skills for homes and SMB</li>
                              </ul>
                              
                              <h4 className="font-semibold mb-3 mt-4">Topics Covered</h4>
                              <ul className="space-y-1 text-sm">
                                <li>• Electrical safety / NEC compliance</li>
                                <li>• Cable standards: Cat5e, Cat6/6a, fiber, coax</li>
                                <li>• Termination: RJ-45, keystone jacks, patch panels</li>
                                <li>• Documentation & labeling standards</li>
                                <li>• Testing with Fluke/certification tools</li>
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-3">Hands-On Labs</h4>
                              <div className="space-y-2">
                                <div className="p-3 bg-primary/10 rounded border-l-4 border-primary">
                                  <strong>Lab 1:</strong> Terminate a Cat6 cable and connect to a switch
                                </div>
                                <div className="p-3 bg-secondary/30 rounded border-l-4 border-secondary">
                                  <strong>Lab 2:</strong> Build a patch panel with labeled drops
                                </div>
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="phase2">
                        <AccordionTrigger className="flex items-center gap-2">
                          <div className="flex items-center gap-3">
                            <Badge variant="default" className="text-xs">Phase 2</Badge>
                            <span>Networking Essentials</span>
                            <Badge variant="outline" className="text-xs">
                              <Clock className="h-3 w-3 mr-1" />
                              3 weeks
                            </Badge>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-semibold mb-3">Objectives</h4>
                              <ul className="space-y-1 text-sm">
                                <li>• Master TCP/IP basics and core networking hardware</li>
                                <li>• Learn IP addressing, routing, and wireless setup</li>
                                <li>• Understand security fundamentals</li>
                              </ul>
                              
                              <h4 className="font-semibold mb-3 mt-4">Topics Covered</h4>
                              <ul className="space-y-1 text-sm">
                                <li>• TCP/IP model, IP addressing, subnetting, DNS, DHCP</li>
                                <li>• Routers, switches, access points — functions & setup</li>
                                <li>• VLANs and QoS basics</li>
                                <li>• Wireless standards (Wi-Fi 5, 6, 6E, 7)</li>
                                <li>• Firewalls, WPA3, MAC filtering</li>
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-3">Hands-On Labs</h4>
                              <div className="space-y-2">
                                <div className="p-3 bg-primary/10 rounded border-l-4 border-primary">
                                  <strong>Lab 1:</strong> Configure a router + switch + AP
                                </div>
                                <div className="p-3 bg-secondary/30 rounded border-l-4 border-secondary">
                                  <strong>Lab 2:</strong> Create VLANs for Home, IoT, Guest
                                </div>
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="phase3">
                        <AccordionTrigger className="flex items-center gap-2">
                          <div className="flex items-center gap-3">
                            <Badge variant="default" className="text-xs">Phase 3</Badge>
                            <span>Applied Network Configuration</span>
                            <Badge variant="outline" className="text-xs">
                              <Clock className="h-3 w-3 mr-1" />
                              4 weeks
                            </Badge>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-semibold mb-3">Objectives</h4>
                              <ul className="space-y-1 text-sm">
                                <li>• Apply networking knowledge to real-world home & commercial jobs</li>
                                <li>• Optimize Wi-Fi, guest networks, and security policies</li>
                              </ul>
                              
                              <h4 className="font-semibold mb-3 mt-4">Topics Covered</h4>
                              <ul className="space-y-1 text-sm">
                                <li>• Consumer vs. enterprise gear (Unifi, Cisco, Aruba, Ruckus)</li>
                                <li>• Wi-Fi heat mapping & access point placement</li>
                                <li>• Remote access (VPNs, remote monitoring tools)</li>
                                <li>• Bandwidth management & traffic shaping</li>
                                <li>• Backup power & surge protection</li>
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-3">Hands-On Labs</h4>
                              <div className="space-y-2">
                                <div className="p-3 bg-primary/10 rounded border-l-4 border-primary">
                                  <strong>Lab 1:</strong> Deploy a UniFi controller with VLANs
                                </div>
                                <div className="p-3 bg-secondary/30 rounded border-l-4 border-secondary">
                                  <strong>Lab 2:</strong> Test Wi-Fi coverage with a heat map
                                </div>
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="phase4">
                        <AccordionTrigger className="flex items-center gap-2">
                          <div className="flex items-center gap-3">
                            <Badge variant="default" className="text-xs">Phase 4</Badge>
                            <span>Home Automation Foundations</span>
                            <Badge variant="outline" className="text-xs">
                              <Clock className="h-3 w-3 mr-1" />
                              4 weeks
                            </Badge>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-semibold mb-3">Objectives</h4>
                              <ul className="space-y-1 text-sm">
                                <li>• Introduce automation devices, protocols, and integration basics</li>
                              </ul>
                              
                              <h4 className="font-semibold mb-3 mt-4">Topics Covered</h4>
                              <ul className="space-y-1 text-sm">
                                <li>• Ecosystems: URC, Savant, Lutron, Crestron, Control4</li>
                                <li>• Protocols: Zigbee, Z-Wave, Matter, Thread, BLE</li>
                                <li>• Lighting, HVAC, AV, surveillance integration</li>
                                <li>• IoT security (firmware updates, password policies)</li>
                                <li>• TCL Service Validation Protocol (MAC address registration & service terms)</li>
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-3">Hands-On Labs</h4>
                              <div className="space-y-2">
                                <div className="p-3 bg-primary/10 rounded border-l-4 border-primary">
                                  <strong>Lab 1:</strong> Configure a Lutron RA-3 system with URC controller
                                </div>
                                <div className="p-3 bg-secondary/30 rounded border-l-4 border-secondary">
                                  <strong>Lab 2:</strong> Integrate cameras, thermostats, and lighting
                                </div>
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="phase5">
                        <AccordionTrigger className="flex items-center gap-2">
                          <div className="flex items-center gap-3">
                            <Badge variant="default" className="text-xs">Phase 5</Badge>
                            <span>System Architecture & Design</span>
                            <Badge variant="outline" className="text-xs">
                              <Clock className="h-3 w-3 mr-1" />
                              5 weeks
                            </Badge>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-semibold mb-3">Objectives</h4>
                              <ul className="space-y-1 text-sm">
                                <li>• Train technicians to design and present full automation solutions</li>
                              </ul>
                              
                              <h4 className="font-semibold mb-3 mt-4">Topics Covered</h4>
                              <ul className="space-y-1 text-sm">
                                <li>• Site surveys & client needs assessments</li>
                                <li>• CAD/Visio/Revit schematics for network + automation</li>
                                <li>• BOM creation and project costing</li>
                                <li>• Scalability, redundancy, failover planning</li>
                                <li>• Energy efficiency and sustainability</li>
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-3">Hands-On Labs</h4>
                              <div className="space-y-2">
                                <div className="p-3 bg-primary/10 rounded border-l-4 border-primary">
                                  <strong>Lab 1:</strong> Design a 4,000 sq. ft. home automation layout
                                </div>
                                <div className="p-3 bg-secondary/30 rounded border-l-4 border-secondary">
                                  <strong>Lab 2:</strong> Draft a boutique hotel automation architecture
                                </div>
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="phase6">
                        <AccordionTrigger className="flex items-center gap-2">
                          <div className="flex items-center gap-3">
                            <Badge variant="default" className="text-xs">Phase 6</Badge>
                            <span>Advanced Configuration & Integration</span>
                            <Badge variant="outline" className="text-xs">
                              <Clock className="h-3 w-3 mr-1" />
                              6-8 weeks
                            </Badge>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-semibold mb-3">Objectives</h4>
                              <ul className="space-y-1 text-sm">
                                <li>• Achieve mastery in multi-system automation, advanced programming, and cybersecurity</li>
                              </ul>
                              
                              <h4 className="font-semibold mb-3 mt-4">Topics Covered</h4>
                              <ul className="space-y-1 text-sm">
                                <li>• URC Accelerator, Savant Studio, RTI APEX advanced programming</li>
                                <li>• Unified dashboards & remote management portals</li>
                                <li>• Multi-site management (hotels, campuses, theaters)</li>
                                <li>• VLAN segregation for IoT, SIEM/log monitoring basics</li>
                                <li>• AI-driven automation (voice AI, predictive routines)</li>
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-3">Hands-On Labs</h4>
                              <div className="space-y-2">
                                <div className="p-3 bg-primary/10 rounded border-l-4 border-primary">
                                  <strong>Lab 1:</strong> Build TCL showroom demo: lights, blinds, AV, thermostat, cameras on one dashboard
                                </div>
                                <div className="p-3 bg-secondary/30 rounded border-l-4 border-secondary">
                                  <strong>Lab 2:</strong> Secure the system with VLANs and firewall policies
                                </div>
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="phase7">
                        <AccordionTrigger className="flex items-center gap-2">
                          <div className="flex items-center gap-3">
                            <Badge variant="default" className="text-xs">Phase 7</Badge>
                            <span>Certification & Continuing Education</span>
                            <Badge variant="outline" className="text-xs">
                              <Clock className="h-3 w-3 mr-1" />
                              Ongoing
                            </Badge>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-semibold mb-3">Objectives</h4>
                              <ul className="space-y-1 text-sm">
                                <li>• Certify and standardize technician skill levels</li>
                                <li>• Ensure knowledge stays current with industry advances</li>
                              </ul>
                              
                              <h4 className="font-semibold mb-3 mt-4">Certification Pathway</h4>
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <Badge variant="secondary">TCL Certified Apprentice</Badge>
                                  <span className="text-sm text-muted-foreground">after Phase 2</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge variant="default">TCL Certified Technician</Badge>
                                  <span className="text-sm text-muted-foreground">after Phase 4</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge variant="destructive">TCL Master Integrator</Badge>
                                  <span className="text-sm text-muted-foreground">after Phase 6</span>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-3">Continuing Education</h4>
                              <ul className="space-y-1 text-sm">
                                <li>• Annual CE requirement (Matter, Wi-Fi 7, cybersecurity, AI updates)</li>
                                <li>• Partner certifications (Lutron RA-3, URC Dealer, Savant, IC Realtime, RTI)</li>
                                <li>• CN Designer/Programmer certification</li>
                                <li>• Home Theater Designer/Calibrator certification</li>
                              </ul>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>

                {/* Program Delivery */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Program Delivery
                    </CardTitle>
                    <CardDescription>
                      Blended learning approach with hands-on training and comprehensive support
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3">Format & Materials</h4>
                        <ul className="space-y-2 text-sm">
                          <li>• <strong>Blended learning:</strong> Online video modules, TCL training manuals, live labs</li>
                          <li>• <strong>Materials:</strong> CAD diagrams, BOM templates, wiring checklists, service SOPs</li>
                          <li>• <strong>Showroom Training:</strong> Hands-on practice with TCL's live demo environment</li>
                          <li>• <strong>Tracking:</strong> Technicians maintain a portfolio of completed labs & signed-off competencies</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3">Program Benefits</h4>
                        <div className="space-y-3">
                          <div className="p-3 bg-primary/10 rounded">
                            <strong>Professional Development</strong>
                            <p className="text-sm text-muted-foreground">Industry-recognized certifications and career advancement</p>
                          </div>
                          <div className="p-3 bg-secondary/30 rounded">
                            <strong>Technical Excellence</strong>
                            <p className="text-sm text-muted-foreground">Hands-on experience with leading automation platforms</p>
                          </div>
                          <div className="p-3 bg-accent/30 rounded">
                            <strong>Business Impact</strong>
                            <p className="text-sm text-muted-foreground">Deliver enterprise-grade solutions with confidence</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Separator className="my-6" />
                    
                    <div className="text-center space-y-4">
                      <h4 className="text-lg font-semibold">Conclusion</h4>
                      <p className="text-muted-foreground max-w-3xl mx-auto">
                        The TCL Technician Education Plan is designed not only to train skilled installers but to produce certified integration professionals capable of delivering enterprise-grade smart home and commercial solutions. This structured approach ensures TCL's team remains the most trusted and technically advanced partner for builders, businesses, and homeowners.
                      </p>
                      <div className="flex flex-wrap justify-center gap-2 mt-4">
                        <Badge variant="outline">Professional Certification</Badge>
                        <Badge variant="outline">Hands-on Training</Badge>
                        <Badge variant="outline">Industry Partnerships</Badge>
                        <Badge variant="outline">Career Development</Badge>
                        <Badge variant="outline">Technical Excellence</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default Education;