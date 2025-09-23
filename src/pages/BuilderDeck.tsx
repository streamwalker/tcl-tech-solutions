import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronLeft, 
  ChevronRight, 
  Home, 
  Shield, 
  Zap, 
  TrendingUp, 
  Users, 
  Building, 
  CheckCircle, 
  Award, 
  Phone, 
  Mail,
  Wifi,
  Camera,
  Volume2,
  Lightbulb,
  ThermometerSun,
  Lock,
  Play,
  MapPin,
  Clock,
  DollarSign,
  Star,
  Target,
  Handshake,
  Settings
} from "lucide-react";

const BuilderDeck = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    // Slide 1: Hero Cover - TCL Tech Solutions
    {
      title: "TCL Tech Solutions",
      subtitle: "The Connected Lifestyle, Simplified",
      content: (
        <div className="relative min-h-[600px] hero-gradient rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5"></div>
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center space-y-8 p-8">
            {/* Hero Logo Section */}
            <div className="space-y-6">
              <div className="w-24 h-24 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center">
                <Building className="w-12 h-12 text-primary" />
              </div>
              <h1 className="text-6xl md:text-8xl font-bold text-gradient">
                TCL Tech Solutions
              </h1>
              <div className="text-2xl md:text-3xl font-medium text-primary">
                The Connected Lifestyle, Simplified
              </div>
              <div className="text-lg md:text-xl text-muted-foreground max-w-2xl">
                Your One-Stop Partner for Smart Homes & Lifestyle Technology
              </div>
            </div>

            {/* Smart Home Visual Elements */}
            <div className="grid grid-cols-3 md:grid-cols-6 gap-6 mt-12 max-w-4xl">
              <div className="flex flex-col items-center space-y-2 p-4 rounded-xl bg-white/50 dark:bg-black/20 backdrop-blur-sm">
                <Lightbulb className="w-8 h-8 text-primary" />
                <span className="text-xs font-medium">Lighting</span>
              </div>
              <div className="flex flex-col items-center space-y-2 p-4 rounded-xl bg-white/50 dark:bg-black/20 backdrop-blur-sm">
                <Shield className="w-8 h-8 text-primary" />
                <span className="text-xs font-medium">Security</span>
              </div>
              <div className="flex flex-col items-center space-y-2 p-4 rounded-xl bg-white/50 dark:bg-black/20 backdrop-blur-sm">
                <Play className="w-8 h-8 text-primary" />
                <span className="text-xs font-medium">Theater</span>
              </div>
              <div className="flex flex-col items-center space-y-2 p-4 rounded-xl bg-white/50 dark:bg-black/20 backdrop-blur-sm">
                <Volume2 className="w-8 h-8 text-primary" />
                <span className="text-xs font-medium">Audio</span>
              </div>
              <div className="flex flex-col items-center space-y-2 p-4 rounded-xl bg-white/50 dark:bg-black/20 backdrop-blur-sm">
                <Wifi className="w-8 h-8 text-primary" />
                <span className="text-xs font-medium">Network</span>
              </div>
              <div className="flex flex-col items-center space-y-2 p-4 rounded-xl bg-white/50 dark:bg-black/20 backdrop-blur-sm">
                <Home className="w-8 h-8 text-primary" />
                <span className="text-xs font-medium">Automation</span>
              </div>
            </div>

            {/* Key Stats */}
            <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-4xl">
              <Card className="card-elevated p-6 bg-white/80 dark:bg-black/40 backdrop-blur-sm border-0">
                <div className="text-4xl font-bold" style={{color: 'hsl(var(--tcl-success))'}}>8-12%</div>
                <div className="text-muted-foreground">Home Value Premium</div>
              </Card>
              <Card className="card-elevated p-6 bg-white/80 dark:bg-black/40 backdrop-blur-sm border-0">
                <div className="text-4xl font-bold text-primary">30%</div>
                <div className="text-muted-foreground">Faster Sales</div>
              </Card>
              <Card className="card-elevated p-6 bg-white/80 dark:bg-black/40 backdrop-blur-sm border-0">
                <div className="text-4xl font-bold" style={{color: 'hsl(var(--tcl-accent))'}}>95%+</div>
                <div className="text-muted-foreground">Satisfaction Score</div>
              </Card>
            </div>
          </div>
        </div>
      )
    },

    // Slide 2: The Builder's Challenge - Visual Comparison
    {
      title: "The Builder's Challenge",
      subtitle: "Managing multiple vendors vs. one streamlined partner",
      content: (
        <div className="space-y-8">
          {/* Visual Vendor Comparison */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Current Problem - Multiple Vendors */}
            <Card className="p-8 border-2" style={{borderColor: 'hsl(var(--tcl-error) / 0.3)'}}>
              <div className="text-center space-y-6">
                <div className="w-16 h-16 mx-auto rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
                  <Users className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-red-600">Current Challenge</h3>
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 bg-red-50 dark:bg-red-950 rounded-lg text-xs text-center">
                    A/V Vendor
                  </div>
                  <div className="p-3 bg-red-50 dark:bg-red-950 rounded-lg text-xs text-center">
                    Network Tech
                  </div>
                  <div className="p-3 bg-red-50 dark:bg-red-950 rounded-lg text-xs text-center">
                    Security Co.
                  </div>
                  <div className="p-3 bg-red-50 dark:bg-red-950 rounded-lg text-xs text-center">
                    Lighting Pro
                  </div>
                  <div className="p-3 bg-red-50 dark:bg-red-950 rounded-lg text-xs text-center">
                    Shade Expert
                  </div>
                  <div className="p-3 bg-red-50 dark:bg-red-950 rounded-lg text-xs text-center">
                    Auto Tech
                  </div>
                </div>
                <ul className="text-sm space-y-2 text-left">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    Multiple points of failure
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    Scheduling conflicts
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    Inconsistent quality
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    Lost revenue opportunities
                  </li>
                </ul>
              </div>
            </Card>

            {/* TCL Solution */}
            <Card className="card-elevated p-8 gradient-primary text-white">
              <div className="text-center space-y-6">
                <div className="w-16 h-16 mx-auto rounded-full bg-white/20 flex items-center justify-center">
                  <Building className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold">TCL Solution</h3>
                <div className="relative">
                  <div className="w-32 h-32 mx-auto rounded-full bg-white/20 flex items-center justify-center">
                    <div className="text-lg font-bold">TCL</div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 border border-white/30 rounded-full animate-pulse"></div>
                  </div>
                </div>
                <ul className="text-sm space-y-2 text-left">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    One design, one install team
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Single point of accountability
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Consistent quality & service
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Increased builder margins
                  </li>
                </ul>
              </div>
            </Card>
          </div>

          {/* Builder Benefits Summary */}
          <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950">
            <div className="text-center">
              <h4 className="text-lg font-semibold mb-4">White-Glove Experience = Referrals & Repeat Business</h4>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2 justify-center">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>Faster installs</span>
                </div>
                <div className="flex items-center gap-2 justify-center">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <span>Upsell opportunities</span>
                </div>
                <div className="flex items-center gap-2 justify-center">
                  <Star className="w-4 h-4 text-primary" />
                  <span>Premium differentiation</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )
    },

    // Slide 3: Why TCL Solutions - One-Stop Service Visual
    {
      title: "Why TCL Tech Solutions",
      subtitle: "One partner for all your smart home needs",
      content: (
        <div className="space-y-8">
          {/* House Cutaway Visual */}
          <Card className="card-elevated p-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
            <div className="text-center space-y-6">
              <h3 className="text-2xl font-semibold">Complete Home Integration</h3>
              <div className="grid md:grid-cols-3 gap-8">
                {/* Smart Lighting & Shading */}
                <div className="space-y-4">
                  <div className="w-20 h-20 mx-auto rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center">
                    <Lightbulb className="w-10 h-10 text-yellow-600" />
                  </div>
                  <h4 className="font-semibold">Smart Lighting & Shading</h4>
                  <p className="text-sm text-muted-foreground">Lutron-certified energy savings + aesthetics</p>
                  <ul className="text-xs space-y-1">
                    <li>• Automated lighting scenes</li>
                    <li>• Motorized window treatments</li>
                    <li>• Energy management</li>
                  </ul>
                </div>

                {/* Audio & Video */}
                <div className="space-y-4">
                  <div className="w-20 h-20 mx-auto rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                    <Volume2 className="w-10 h-10 text-purple-600" />
                  </div>
                  <h4 className="font-semibold">Audio & Video</h4>
                  <p className="text-sm text-muted-foreground">Whole-home audio + custom theaters</p>
                  <ul className="text-xs space-y-1">
                    <li>• Multi-zone audio systems</li>
                    <li>• Dedicated home theaters</li>
                    <li>• Outdoor entertainment</li>
                  </ul>
                </div>

                {/* Security & Surveillance */}
                <div className="space-y-4">
                  <div className="w-20 h-20 mx-auto rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
                    <Shield className="w-10 h-10 text-red-600" />
                  </div>
                  <h4 className="font-semibold">Security & Surveillance</h4>
                  <p className="text-sm text-muted-foreground">IC Realtime certified installations</p>
                  <ul className="text-xs space-y-1">
                    <li>• Professional camera systems</li>
                    <li>• Smart door locks</li>
                    <li>• Alarm integration</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>

          {/* Builder Benefits Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="card-elevated p-6">
              <div className="flex items-center gap-3 mb-4">
                <Settings className="w-8 h-8 text-primary" />
                <h4 className="text-lg font-semibold">Precision Integration Protocol</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-3">Meticulous care and innovative methodology ensuring seamless total system integration</p>
              <div className="text-sm space-y-1">
                <div>• Comprehensive multi-phase integration testing</div>
                <div>• Advanced device communication protocols</div>
                <div>• Rigorous quality assurance at every step</div>
              </div>
            </Card>

            <Card className="card-elevated p-6">
              <div className="flex items-center gap-3 mb-4">
                <Handshake className="w-8 h-8 text-primary" />
                <h4 className="text-lg font-semibold">Builder-Exclusive Benefits</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-3">Dedicated support and pricing for our builder partners</p>
              <div className="text-sm space-y-1">
                <div>• Direct dealer pricing</div>
                <div>• Dedicated account manager</div>
                <div>• 24-hour response SLA</div>
              </div>
            </Card>
          </div>

          {/* Post-Close Support */}
          <Card className="p-6 gradient-success text-white">
            <div className="text-center">
              <h4 className="text-lg font-semibold mb-4">Post-Close Support Plans</h4>
              <div className="grid md:grid-cols-4 gap-4 text-sm">
                <div className="flex flex-col items-center gap-2">
                  <Zap className="w-6 h-6" />
                  <span>Firmware Updates</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <CheckCircle className="w-6 h-6" />
                  <span>Annual Checkups</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Phone className="w-6 h-6" />
                  <span>Tech Concierge</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Award className="w-6 h-6" />
                  <span>Warranty Support</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )
    },

    // Slide 4: Certified Expertise - Professional Credentials
    {
      title: "Certified Expertise",
      subtitle: "National brands. Local expertise.",
      content: (
        <div className="space-y-8">
          {/* Damon Jackson Profile */}
          <Card className="card-elevated p-8 gradient-secondary">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <Award className="w-16 h-16 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Damon Jackson</h3>
                <p className="text-muted-foreground">Lead Designer & Programmer</p>
              </div>
              <div className="md:col-span-2 space-y-6">
                <h4 className="text-lg font-semibold">Professional Certifications</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <div className="certification-badge">
                    <Lightbulb className="w-4 h-4 mr-2" />
                    Lutron RadioRA 3
                  </div>
                  <div className="certification-badge">
                    <Volume2 className="w-4 h-4 mr-2" />
                    URC HAP Dealer
                  </div>
                  <div className="certification-badge">
                    <Home className="w-4 h-4 mr-2" />
                    Savant Certified
                  </div>
                  <div className="certification-badge">
                    <Camera className="w-4 h-4 mr-2" />
                    IC Realtime Certified
                  </div>
                  <div className="certification-badge">
                    <Zap className="w-4 h-4 mr-2" />
                    RTI Certified
                  </div>
                  <div className="certification-badge">
                    <Shield className="w-4 h-4 mr-2" />
                    Control4 Designer
                  </div>
                  <div className="certification-badge">
                    <Play className="w-4 h-4 mr-2" />
                    Home Theater Designer
                  </div>
                  <div className="certification-badge">
                    <Target className="w-4 h-4 mr-2" />
                    Professional Calibrator
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Brand Partners */}
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="card-elevated p-6 text-center">
              <div className="w-16 h-16 mx-auto rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Lightbulb className="w-8 h-8 text-primary" />
              </div>
              <h4 className="font-semibold">Lutron</h4>
              <p className="text-sm text-muted-foreground">Lighting Control</p>
            </Card>
            <Card className="card-elevated p-6 text-center">
              <div className="w-16 h-16 mx-auto rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Home className="w-8 h-8 text-primary" />
              </div>
              <h4 className="font-semibold">Control4</h4>
              <p className="text-sm text-muted-foreground">Automation</p>
            </Card>
            <Card className="card-elevated p-6 text-center">
              <div className="w-16 h-16 mx-auto rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Volume2 className="w-8 h-8 text-primary" />
              </div>
              <h4 className="font-semibold">Savant</h4>
              <p className="text-sm text-muted-foreground">Premium Systems</p>
            </Card>
            <Card className="card-elevated p-6 text-center">
              <div className="w-16 h-16 mx-auto rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Camera className="w-8 h-8 text-primary" />
              </div>
              <h4 className="font-semibold">IC Realtime</h4>
              <p className="text-sm text-muted-foreground">Security Systems</p>
            </Card>
          </div>

          {/* Trust Indicators */}
          <Card className="p-6 bg-gradient-to-r from-primary/5 to-primary/10">
            <div className="text-center">
              <h4 className="text-lg font-semibold mb-4">Why Choose Certified Professionals?</h4>
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                <div className="flex items-center gap-2 justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                  <span>Manufacturer warranties honored</span>
                </div>
                <div className="flex items-center gap-2 justify-center">
                  <Award className="w-5 h-5 text-primary" />
                  <span>Latest training & techniques</span>
                </div>
                <div className="flex items-center gap-2 justify-center">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>Professional installation standards</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )
    },

    // Slide 5: Service Tiers
    {
      title: "Builder Packages",
      subtitle: "Flexible service tiers with builder margin opportunities",
      content: (
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="card-elevated p-6 border-2 border-blue-200">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <Home className="w-8 h-8 text-blue-600" />
              </div>
              <Badge className="bg-blue-100 text-blue-800">Essential Package</Badge>
              <div className="text-2xl font-bold">$2K - $10K</div>
              <p className="text-sm text-muted-foreground">Networking + entry-level automation (depending on networking and other factors)</p>
              <div className="space-y-2 text-sm text-left">
                <div>• Basic lighting control</div>
                <div>• Security system pre-wire</div>
                <div>• Smart thermostat ready</div>
                <div>• Door lock integration</div>
              </div>
            </div>
          </Card>
          <Card className="card-elevated p-6 border-2 border-green-200 bg-green-50 dark:bg-green-950 transform scale-105">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <Volume2 className="w-8 h-8 text-green-600" />
              </div>
              <Badge className="bg-green-100 text-green-800">Lifestyle Package</Badge>
              <div className="text-2xl font-bold">$10K - $40K</div>
              <p className="text-sm text-muted-foreground">Whole-home audio + lighting control</p>
              <div className="space-y-2 text-sm text-left">
                <div>• Whole-home automation</div>
                <div>• Multi-zone audio/video</div>
                <div>• Advanced security</div>
                <div>• Energy management</div>
              </div>
            </div>
          </Card>
          <Card className="card-elevated p-6 border-2 border-purple-200">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                <Play className="w-8 h-8 text-purple-600" />
              </div>
              <Badge className="bg-purple-100 text-purple-800">Luxury Package</Badge>
              <div className="text-2xl font-bold">$40K+</div>
              <p className="text-sm text-muted-foreground">Full theater, Savant automation, enterprise security</p>
              <div className="space-y-2 text-sm text-left">
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

    // Slide 6: Case Study
    {
      title: "Case Study Highlight",
      subtitle: "San Antonio custom builder partnership success",
      content: (
        <div className="space-y-8">
          <Card className="card-elevated p-8 gradient-success text-white">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold">Partnership Success Story</h3>
                <p className="text-lg">
                  "Custom builder in San Antonio partnered with TCL to deliver a $150K automation package, 
                  reducing subcontractors from 5 to 1 and cutting project timelines by 3 weeks."
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-2xl font-bold">5 → 1</div>
                    <div>Vendor Reduction</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">3 weeks</div>
                    <div>Time Saved</div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="w-32 h-32 mx-auto rounded-full bg-white/20 flex items-center justify-center">
                  <Building className="w-16 h-16 text-white" />
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">$150K</div>
                  <div>Project Value</div>
                </div>
              </div>
            </div>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <Star className="text-yellow-500" />
                Homeowner Testimonial
              </h4>
              <blockquote className="text-sm italic text-muted-foreground">
                "TCL transformed our new home into something truly special. The automation system 
                works flawlessly, and their support has been outstanding. Best investment we made."
              </blockquote>
              <div className="mt-3 text-sm font-medium">- Johnson Family, Stone Oak</div>
            </Card>

            <Card className="p-6">
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <MapPin className="text-primary" />
                Project Details
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Location:</span>
                  <span>San Antonio, TX 78254</span>
                </div>
                <div className="flex justify-between">
                  <span>Home Size:</span>
                  <span>4,500 sq ft</span>
                </div>
                <div className="flex justify-between">
                  <span>Completion:</span>
                  <span>45 days</span>
                </div>
                <div className="flex justify-between">
                  <span>Builder Margin:</span>
                  <span className="text-green-600 font-semibold">25%</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )
    },

    // Slide 7: Partnership Model
    {
      title: "Partnership Model",
      subtitle: "Dedicated support for builder success",
      content: (
        <div className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="card-elevated p-6">
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <DollarSign className="text-green-500" />
                Financial Benefits
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                  <span>Builder-exclusive wholesale pricing</span>
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                  <span>Revenue share opportunities</span>
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                  <span>Upsell commission structure</span>
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                  <span>Volume pricing tiers</span>
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
              </div>
            </Card>

            <Card className="card-elevated p-6">
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <Handshake className="text-blue-500" />
                Support Benefits
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <span>Co-branded marketing materials</span>
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <span>Showroom support</span>
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <span>Sales team training</span>
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <span>24/7 technical support</span>
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-8 gradient-primary text-white">
            <div className="text-center space-y-6">
              <h3 className="text-2xl font-semibold">Dedicated Project Manager</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center space-y-2">
                  <Clock className="w-12 h-12" />
                  <h4 className="font-semibold">Scheduling Coordination</h4>
                  <p className="text-sm opacity-90">Single point of contact for all installations</p>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <CheckCircle className="w-12 h-12" />
                  <h4 className="font-semibold">Quality Assurance</h4>
                  <p className="text-sm opacity-90">Consistent standards across all projects</p>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <Phone className="w-12 h-12" />
                  <h4 className="font-semibold">Direct Communication</h4>
                  <p className="text-sm opacity-90">Always available for urgent needs</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )
    },

    // Slide 8: Call to Action
    {
      title: "Let's Partner Together",
      subtitle: "Schedule your builder strategy session today",
      content: (
        <div className="text-center space-y-8">
          <Card className="card-elevated p-12 gradient-secondary">
            <div className="space-y-8">
              <h2 className="text-4xl font-bold">
                Let's partner to make every home a connected lifestyle home.
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                      <Users className="w-8 h-8 text-primary" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-semibold">Damon Jackson</h4>
                      <p className="text-muted-foreground">Lead Designer & Programmer</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                      <Building className="w-8 h-8 text-primary" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-semibold">Phil Russell</h4>
                      <p className="text-muted-foreground">Business Development</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <Button size="lg" className="w-full text-lg h-14">
                    <Phone className="w-5 h-5 mr-2" />
                    Schedule Builder Strategy Session
                  </Button>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2 justify-center">
                      <Phone className="w-4 h-4 text-primary" />
                      <span>(210) 555-0123</span>
                    </div>
                    <div className="flex items-center gap-2 justify-center">
                      <Mail className="w-4 h-4 text-primary" />
                      <span>builders@tcltechsolutions.com</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 pt-8 border-t border-primary/20">
                <div className="text-center">
                  <h5 className="font-semibold mb-2">Pilot Program</h5>
                  <p className="text-sm text-muted-foreground">Test our partnership with your next development</p>
                </div>
                <div className="text-center">
                  <h5 className="font-semibold mb-2">Custom Pricing</h5>
                  <p className="text-sm text-muted-foreground">Volume discounts based on your project pipeline</p>
                </div>
                <div className="text-center">
                  <h5 className="font-semibold mb-2">Quick Start</h5>
                  <p className="text-sm text-muted-foreground">Begin partnership integration within 30 days</p>
                </div>
              </div>
            </div>
          </Card>
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Building className="w-8 h-8" />
            <h1 className="text-xl font-bold">TCL Tech Solutions - Builder Partnership Deck</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm">
              Slide {currentSlide + 1} of {slides.length}
            </span>
            <div className="flex gap-1">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    currentSlide === index ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <Card className="min-h-[700px] p-8 animate-fade-in">
            <CardContent>
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-bold">{slides[currentSlide].title}</h2>
                  <p className="text-lg text-muted-foreground">{slides[currentSlide].subtitle}</p>
                </div>
                
                <div className="pt-6">
                  {slides[currentSlide].content}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Navigation */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center gap-4 bg-primary text-primary-foreground px-6 py-3 rounded-full shadow-lg">
          <Button
            variant="ghost"
            size="sm"
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="text-primary-foreground hover:bg-primary-foreground/20"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          
          <span className="text-sm font-medium px-4">
            {currentSlide + 1} / {slides.length}
          </span>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="text-primary-foreground hover:bg-primary-foreground/20"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BuilderDeck;
