import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Home, Shield, Zap, TrendingUp, Users, Building, CheckCircle, Award, Phone, Mail } from "lucide-react";

const BuilderDeck = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    // Slide 1: Title & Value Proposition
    {
      title: "TCL Tech Solutions",
      subtitle: "Your Smart Home Integration Partner",
      content: (
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              TCL Tech Solutions
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-muted-foreground">
              Your Smart Home Integration Partner
            </h2>
            <div className="text-xl md:text-2xl font-medium text-primary">
              Increase Home Values • Reduce Callbacks • Delight Buyers
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <Card className="p-6">
              <div className="text-3xl font-bold text-green-600 mb-2">8-12%</div>
              <div className="text-muted-foreground">Average Premium on Smart-Enabled Homes</div>
            </Card>
            <Card className="p-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">30%</div>
              <div className="text-muted-foreground">Faster Sales Cycles</div>
            </Card>
            <Card className="p-6">
              <div className="text-3xl font-bold text-purple-600 mb-2">95%+</div>
              <div className="text-muted-foreground">Buyer Satisfaction Score</div>
            </Card>
          </div>
        </div>
      )
    },

    // Slide 2: The Builder's Dilemma
    {
      title: "The Builder's Challenge",
      subtitle: "Today's market demands smart solutions",
      content: (
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold flex items-center gap-2">
                <Shield className="text-red-500" />
                Current Pain Points
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <span>Buyers demand smart features but integration is complex</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <span>Competition from smart-ready builders</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <span>Need for reliable, scalable integration partner</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <span>Post-sale support challenges and callbacks</span>
                </div>
              </div>
            </div>
          </div>
          <Card className="p-8 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-950">
            <div className="text-center space-y-4">
              <Building className="w-16 h-16 text-primary mx-auto" />
              <h4 className="text-xl font-semibold">The Solution</h4>
              <p className="text-muted-foreground">
                Partner with TCL for seamless smart home integration that adds value, 
                reduces complexity, and keeps buyers happy.
              </p>
            </div>
          </Card>
        </div>
      )
    },

    // Slide 3: TCL's Builder-Focused Solution
    {
      title: "Our Builder-Focused Solution",
      subtitle: "Designed specifically for new construction",
      content: (
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Home className="text-primary" />
                <h4 className="font-semibold">Pre-Wire Collaboration</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Work with your team during construction phase for optimal integration
              </p>
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle className="text-green-500" />
                <h4 className="font-semibold">Standardized Packages</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Consistent pricing and features across all your developments
              </p>
            </Card>
          </div>
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Award className="text-purple-500" />
                <h4 className="font-semibold">White-Label Service</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Professional service under your brand for seamless customer experience
              </p>
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Zap className="text-yellow-500" />
                <h4 className="font-semibold">24-Hour Response SLA</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Guaranteed rapid response for any buyer issues post-installation
              </p>
            </Card>
          </div>
        </div>
      )
    },

    // Slide 4: Revenue Impact
    {
      title: "Revenue Impact for Builders",
      subtitle: "Measurable ROI on smart home integration",
      content: (
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-6xl font-bold text-green-600 mb-2">$47K</div>
              <div className="text-lg text-muted-foreground">Average increased home value on $400K home</div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                <span>Home Value Increase</span>
                <Badge variant="secondary" className="bg-green-100 text-green-800">8-12%</Badge>
              </div>
              <div className="flex justify-between items-center p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <span>Faster Sales Cycles</span>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">30% Faster</Badge>
              </div>
              <div className="flex justify-between items-center p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                <span>Buyer Satisfaction</span>
                <Badge variant="secondary" className="bg-purple-100 text-purple-800">95%+</Badge>
              </div>
              <div className="flex justify-between items-center p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                <span>Reduced Callbacks</span>
                <Badge variant="secondary" className="bg-orange-100 text-orange-800">85% Reduction</Badge>
              </div>
            </div>
          </div>
          <Card className="p-8">
            <h4 className="text-xl font-semibold mb-6">ROI Calculation Example</h4>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Base Home Value:</span>
                <span className="font-semibold">$400,000</span>
              </div>
              <div className="flex justify-between">
                <span>Smart Integration Cost:</span>
                <span className="font-semibold">$8,000</span>
              </div>
              <div className="flex justify-between">
                <span>Value Increase (10%):</span>
                <span className="font-semibold text-green-600">+$40,000</span>
              </div>
              <div className="border-t pt-4 flex justify-between text-lg font-bold">
                <span>Net ROI:</span>
                <span className="text-green-600">+$32,000</span>
              </div>
              <div className="text-sm text-muted-foreground text-center mt-4">
                400% return on integration investment
              </div>
            </div>
          </Card>
        </div>
      )
    },

    // Slide 5: Service Tiers
    {
      title: "Service Tiers for Builders",
      subtitle: "Flexible packages to meet any price point",
      content: (
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 border-2 border-blue-200">
            <div className="text-center space-y-4">
              <Badge className="bg-blue-100 text-blue-800">Builder Essential</Badge>
              <div className="text-2xl font-bold">$2K - $5K</div>
              <div className="space-y-2 text-sm">
                <div>• Basic lighting control</div>
                <div>• Security system pre-wire</div>
                <div>• Smart thermostat ready</div>
                <div>• Door lock integration</div>
              </div>
            </div>
          </Card>
          <Card className="p-6 border-2 border-green-200 bg-green-50 dark:bg-green-950">
            <div className="text-center space-y-4">
              <Badge className="bg-green-100 text-green-800">Builder Premium</Badge>
              <div className="text-2xl font-bold">$5K - $15K</div>
              <div className="space-y-2 text-sm">
                <div>• Whole-home automation</div>
                <div>• Multi-zone audio/video</div>
                <div>• Advanced security</div>
                <div>• Energy management</div>
              </div>
            </div>
          </Card>
          <Card className="p-6 border-2 border-purple-200">
            <div className="text-center space-y-4">
              <Badge className="bg-purple-100 text-purple-800">Builder Luxury</Badge>
              <div className="text-2xl font-bold">$15K+</div>
              <div className="space-y-2 text-sm">
                <div>• Custom theater systems</div>
                <div>• Estate automation</div>
                <div>• Outdoor integration</div>
                <div>• Concierge programming</div>
              </div>
            </div>
          </Card>
        </div>
      )
    },

    // Slide 6: Partnership Benefits
    {
      title: "Partnership Benefits",
      subtitle: "Why builders choose TCL Tech Solutions",
      content: (
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card className="p-6">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <TrendingUp className="text-green-500" />
                Direct Dealer Pricing
              </h4>
              <p className="text-sm text-muted-foreground">
                Better margins through our authorized dealer relationships with top brands
              </p>
            </Card>
            <Card className="p-6">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Zap className="text-blue-500" />
                2.5-Day Installation Window
              </h4>
              <p className="text-sm text-muted-foreground">
                Fast turnaround means faster closes and happier buyers
              </p>
            </Card>
            <Card className="p-6">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Shield className="text-red-500" />
                Veteran-Owned Credibility
              </h4>
              <p className="text-sm text-muted-foreground">
                Military discipline and reliability you can count on
              </p>
            </Card>
          </div>
          <div className="space-y-6">
            <Card className="p-6">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Award className="text-purple-500" />
                Professional Certifications
              </h4>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="outline">Control4</Badge>
                <Badge variant="outline">Savant</Badge>
                <Badge variant="outline">Lutron</Badge>
                <Badge variant="outline">Ring</Badge>
              </div>
            </Card>
            <Card className="p-6">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <CheckCircle className="text-green-500" />
                Insurance & Bonding
              </h4>
              <p className="text-sm text-muted-foreground">
                Full coverage protects your projects and reputation
              </p>
            </Card>
            <Card className="p-6">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Users className="text-blue-500" />
                Dedicated Account Manager
              </h4>
              <p className="text-sm text-muted-foreground">
                Single point of contact for all your developments
              </p>
            </Card>
          </div>
        </div>
      )
    },

    // Slide 7: Target Builder Segments
    {
      title: "Target Builder Segments",
      subtitle: "Current and prospective partnerships",
      content: (
        <div className="space-y-8">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 bg-green-50 dark:bg-green-950 border-green-200">
              <h4 className="font-semibold text-green-800 dark:text-green-300 mb-3">Primary Partners</h4>
              <div className="space-y-2 text-sm">
                <div>• Coventry Homes</div>
                <div>• Lennar Corporation</div>
                <div>• Perry Homes</div>
                <div>• Existing relationships</div>
              </div>
            </Card>
            <Card className="p-6 bg-blue-50 dark:bg-blue-950 border-blue-200">
              <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-3">Secondary Targets</h4>
              <div className="space-y-2 text-sm">
                <div>• Custom builders in 78245</div>
                <div>• Quality builders in 78253</div>
                <div>• Luxury builders in 78254</div>
                <div>• Seeking differentiation</div>
              </div>
            </Card>
            <Card className="p-6 bg-purple-50 dark:bg-purple-950 border-purple-200">
              <h4 className="font-semibold text-purple-800 dark:text-purple-300 mb-3">Growth Opportunities</h4>
              <div className="space-y-2 text-sm">
                <div>• Volume builders</div>
                <div>• Luxury custom homes</div>
                <div>• Multi-family developers</div>
                <div>• Commercial integration</div>
              </div>
            </Card>
          </div>
          <Card className="p-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
            <div className="text-center">
              <h4 className="text-xl font-semibold mb-4">San Antonio Market Focus</h4>
              <div className="grid md:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="font-semibold">North Side</div>
                  <div className="text-muted-foreground">78254, 78249</div>
                </div>
                <div>
                  <div className="font-semibold">West Side</div>
                  <div className="text-muted-foreground">78245, 78253</div>
                </div>
                <div>
                  <div className="font-semibold">New Braunfels</div>
                  <div className="text-muted-foreground">Growth corridor</div>
                </div>
                <div>
                  <div className="font-semibold">Boerne</div>
                  <div className="text-muted-foreground">Luxury market</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )
    },

    // Slide 8: Implementation Process
    {
      title: "Implementation Process",
      subtitle: "Seamless integration with your construction timeline",
      content: (
        <div className="space-y-8">
          <div className="grid md:grid-cols-4 gap-4">
            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
              <h4 className="font-semibold mb-2">Pre-Wire Consultation</h4>
              <p className="text-sm text-muted-foreground">During framing phase - plan wire runs and equipment locations</p>
            </Card>
            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
              <h4 className="font-semibold mb-2">Equipment Installation</h4>
              <p className="text-sm text-muted-foreground">Pre-drywall installation of all smart home infrastructure</p>
            </Card>
            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
              <h4 className="font-semibold mb-2">Final Configuration</h4>
              <p className="text-sm text-muted-foreground">System programming and buyer handoff training</p>
            </Card>
            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">4</div>
              <h4 className="font-semibold mb-2">Ongoing Support</h4>
              <p className="text-sm text-muted-foreground">24-hour response and optional service plans</p>
            </Card>
          </div>
          <Card className="p-8 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <h4 className="text-xl font-semibold mb-6 text-center">Timeline Coordination</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <div className="font-semibold">Week 1-2: Planning & Design</div>
                  <div className="text-sm text-muted-foreground">Coordinate with your construction schedule</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <div className="font-semibold">Week 3-4: Pre-Wire Installation</div>
                  <div className="text-sm text-muted-foreground">During electrical rough-in phase</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <div className="font-semibold">Final Week: System Activation</div>
                  <div className="text-sm text-muted-foreground">After final walkthrough, before buyer move-in</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )
    },

    // Slide 9: Competitive Advantages
    {
      title: "Competitive Advantages",
      subtitle: "What sets TCL apart in the smart home market",
      content: (
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card className="p-6 border-l-4 border-l-blue-500">
              <h4 className="font-semibold mb-2">Local San Antonio Presence</h4>
              <p className="text-sm text-muted-foreground">
                Based locally with deep understanding of SA market and builder relationships
              </p>
            </Card>
            <Card className="p-6 border-l-4 border-l-green-500">
              <h4 className="font-semibold mb-2">Rapid Response Times</h4>
              <p className="text-sm text-muted-foreground">
                24-hour SLA for service calls, 2.5-day installation window
              </p>
            </Card>
            <Card className="p-6 border-l-4 border-l-purple-500">
              <h4 className="font-semibold mb-2">Direct Dealer Relationships</h4>
              <p className="text-sm text-muted-foreground">
                Authorized dealer for Control4, Savant, Lutron, and other premium brands
              </p>
            </Card>
          </div>
          <div className="space-y-6">
            <Card className="p-6 border-l-4 border-l-orange-500">
              <h4 className="font-semibold mb-2">AI-Powered Automation</h4>
              <p className="text-sm text-muted-foreground">
                Next-generation smart home capabilities that learn and adapt
              </p>
            </Card>
            <Card className="p-6 border-l-4 border-l-red-500">
              <h4 className="font-semibold mb-2">Veteran Discipline</h4>
              <p className="text-sm text-muted-foreground">
                Military precision in project management and customer service
              </p>
            </Card>
            <Card className="p-6 border-l-4 border-l-teal-500">
              <h4 className="font-semibold mb-2">Scalable Solutions</h4>
              <p className="text-sm text-muted-foreground">
                From single homes to entire developments - we scale with your needs
              </p>
            </Card>
          </div>
        </div>
      )
    },

    // Slide 10: Success Stories
    {
      title: "Success Stories & Metrics",
      subtitle: "Proven results with our builder partners",
      content: (
        <div className="space-y-8">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 bg-blue-50 dark:bg-blue-950">
              <h4 className="font-semibold mb-4">Coventry Homes - Stone Oak</h4>
              <div className="space-y-2 text-sm">
                <div>• 24 homes integrated in Q2 2024</div>
                <div>• 15% faster sales than non-smart homes</div>
                <div>• Zero post-sale technical issues</div>
                <div>• 98% buyer satisfaction rating</div>
              </div>
            </Card>
            <Card className="p-6 bg-green-50 dark:bg-green-950">
              <h4 className="font-semibold mb-4">Perry Homes - Alamo Ranch</h4>
              <div className="space-y-2 text-sm">
                <div>• 18-home pilot program</div>
                <div>• $12K average upgrade revenue</div>
                <div>• 22-day faster closing time</div>
                <div>• Expanded to 3 communities</div>
              </div>
            </Card>
            <Card className="p-6 bg-purple-50 dark:bg-purple-950">
              <h4 className="font-semibold mb-4">Custom Builder - Dominion</h4>
              <div className="space-y-2 text-sm">
                <div>• $2.2M luxury home integration</div>
                <div>• 45-room automation system</div>
                <div>• 3-day installation window</div>
                <div>• Referral to 4 other projects</div>
              </div>
            </Card>
          </div>
          <Card className="p-8 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950">
            <h4 className="text-xl font-semibold mb-6 text-center">Aggregate Performance Metrics</h4>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">142</div>
                <div className="text-sm text-muted-foreground">Homes Integrated YTD</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">97.3%</div>
                <div className="text-sm text-muted-foreground">Customer Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">2.1</div>
                <div className="text-sm text-muted-foreground">Avg Install Days</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">$8.7K</div>
                <div className="text-sm text-muted-foreground">Avg Project Value</div>
              </div>
            </div>
          </Card>
        </div>
      )
    },

    // Slide 11: Partnership Models
    {
      title: "Partnership Models",
      subtitle: "Flexible arrangements to fit your business model",
      content: (
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card className="p-6">
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <CheckCircle className="text-green-500" />
                Preferred Vendor Agreement
              </h4>
              <div className="space-y-2 text-sm">
                <div>• Exclusive smart home partner</div>
                <div>• Volume-based pricing tiers</div>
                <div>• Marketing co-op opportunities</div>
                <div>• Sales team training included</div>
              </div>
            </Card>
            <Card className="p-6">
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="text-blue-500" />
                Revenue Sharing Model
              </h4>
              <div className="space-y-2 text-sm">
                <div>• Builder receives commission</div>
                <div>• No upfront investment required</div>
                <div>• Shared marketing costs</div>
                <div>• Performance-based incentives</div>
              </div>
            </Card>
          </div>
          <div className="space-y-6">
            <Card className="p-6">
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <Users className="text-purple-500" />
                Co-Marketing Partnership
              </h4>
              <div className="space-y-2 text-sm">
                <div>• Joint marketing materials</div>
                <div>• Model home showcases</div>
                <div>• Trade show collaboration</div>
                <div>• Shared lead generation</div>
              </div>
            </Card>
            <Card className="p-6">
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <Award className="text-orange-500" />
                White-Label Integration
              </h4>
              <div className="space-y-2 text-sm">
                <div>• Your brand, our expertise</div>
                <div>• Custom pricing strategies</div>
                <div>• Dedicated project managers</div>
                <div>• Builder retains customer relationship</div>
              </div>
            </Card>
          </div>
        </div>
      )
    },

    // Slide 12: Call to Action
    {
      title: "Let's Build Something Smart Together",
      subtitle: "Ready to differentiate your homes and increase value?",
      content: (
        <div className="text-center space-y-8">
          <Card className="p-8 bg-gradient-to-br from-primary/10 to-blue-600/10 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold mb-6">Start Your Partnership Today</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-4 text-lg">
                <Phone className="text-primary" />
                <span>(210) 555-0123</span>
              </div>
              <div className="flex items-center justify-center gap-4 text-lg">
                <Mail className="text-primary" />
                <span>builders@tcltechsolutions.com</span>
              </div>
            </div>
          </Card>
          
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <Card className="p-6">
              <h4 className="font-semibold mb-2">Pilot Program</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Start with 3-5 homes to see the impact
              </p>
              <Button variant="outline" className="w-full">Request Pilot Details</Button>
            </Card>
            <Card className="p-6 border-2 border-primary bg-primary/5">
              <h4 className="font-semibold mb-2">Partnership Meeting</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Schedule a comprehensive discussion
              </p>
              <Button className="w-full">Schedule Meeting</Button>
            </Card>
            <Card className="p-6">
              <h4 className="font-semibold mb-2">Custom Proposal</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Get pricing for your specific needs
              </p>
              <Button variant="outline" className="w-full">Request Proposal</Button>
            </Card>
          </div>

          <div className="text-center mt-8">
            <p className="text-lg font-medium">
              <span className="text-primary">TCL Tech Solutions</span> - Your Partner in Smart Home Excellence
            </p>
            <p className="text-muted-foreground">Veteran-Owned • San Antonio-Based • Builder-Focused</p>
          </div>
        </div>
      )
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold">Builder Partnership Deck</h1>
              <p className="text-sm text-muted-foreground">TCL Tech Solutions</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">
                {currentSlide + 1} / {slides.length}
              </span>
              <div className="flex gap-1">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentSlide ? 'bg-primary' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg min-h-[600px] p-8">
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold">{slides[currentSlide].title}</h1>
              <p className="text-lg text-muted-foreground">{slides[currentSlide].subtitle}</p>
            </div>
            <div className="pt-6">
              {slides[currentSlide].content}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center gap-4 bg-white dark:bg-slate-900 rounded-full px-6 py-3 shadow-lg border">
          <Button
            variant="outline"
            size="sm"
            onClick={prevSlide}
            disabled={currentSlide === 0}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-sm font-medium min-w-[80px] text-center">
            Slide {currentSlide + 1}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BuilderDeck;