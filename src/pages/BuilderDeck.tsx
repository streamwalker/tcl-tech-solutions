import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
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
  Settings,
  Brain,
  Eye,
  Network,
  Cpu,
  ShieldCheck,
  Cog,
  Activity,
  Radar,
  Quote,
  ExternalLink,
  BarChart3,
  Info
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const BuilderDeck = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openDialog, setOpenDialog] = useState<string | null>(null);
  const [certificationDialog, setCertificationDialog] = useState<string | null>(null);
  const [benefitDialog, setBenefitDialog] = useState<string | null>(null);

  const testimonials = [
    {
      id: 1,
      quote: "TCL Tech Solutions transformed our home with their innovative tech installation and Wireless upgrades. Their commitment to excellence is truly commendable!",
      name: "Carlos D.",
      serviceType: "Smart Home & Wireless Upgrades",
      rating: 5
    },
    {
      id: 2,
      quote: "The home theater system TCL installed exceeded all my expectations. The sound quality is incredible and the automation makes everything so easy to use.",
      name: "Earl W.",
      serviceType: "Home Theater & Audio/Video Setup",
      rating: 5
    },
    {
      id: 3,
      quote: "From design to installation, TCL's custom home theater work is outstanding. They really know how to create an amazing entertainment experience.",
      name: "Brian M.",
      serviceType: "Custom Home Theater Design & Installation",
      rating: 5
    }
  ];

  const benefitDetails = {
    "wholesale-pricing": {
      title: "Builder-Exclusive Wholesale Pricing",
      overview: "Access premium smart home technology at builder-exclusive rates with guaranteed margins.",
      details: [
        "30-50% below retail pricing on all smart home packages",
        "Tiered pricing structure based on annual volume commitments",
        "Protected margins ensuring profitable installations",
        "Exclusive access to premium product lines not available to general contractors"
      ],
      industryContext: "Industry standard markup for builders is 15-25%. Our wholesale pricing allows for 40-60% margins while remaining competitive.",
      examples: [
        "Basic Smart Home Package: Retail $8,500 → Builder Cost $4,250",
        "Premium Smart Home Package: Retail $15,000 → Builder Cost $7,500",
        "Luxury Smart Home Package: Retail $25,000 → Builder Cost $12,500"
      ],
      valueProposition: "Average builder profit increase of $8,000-$15,000 per home with smart home integration."
    },
    "revenue-share": {
      title: "Revenue Share Opportunities",
      overview: "Earn ongoing revenue from smart home service subscriptions and maintenance contracts.",
      details: [
        "25% revenue share on all monthly monitoring subscriptions",
        "20% commission on annual maintenance contracts",
        "15% ongoing revenue from warranty extensions",
        "Referral bonuses for additional service expansions"
      ],
      industryContext: "Smart home service market growing at 24% annually. Average homeowner spends $150/month on connected services.",
      examples: [
        "Monthly monitoring at $89/month = $267 annual revenue per home",
        "Annual maintenance contracts at $450 = $90 annual commission",
        "10 homes per year = $3,570 in recurring revenue stream"
      ],
      valueProposition: "Create passive income streams that continue generating revenue long after home completion."
    },
    "upsell-commission": {
      title: "Upsell Commission Structure",
      overview: "Earn additional commissions on premium upgrades and add-on services sold to homeowners.",
      details: [
        "15% commission on all premium package upgrades",
        "10% commission on post-installation additions",
        "Seasonal promotion bonuses up to 25%",
        "Volume incentives for high-performing builders"
      ],
      industryContext: "68% of homeowners upgrade their smart home systems within 2 years. Average upgrade value: $3,500.",
      examples: [
        "Premium theater upgrade: $5,000 system = $750 commission",
        "Advanced security package: $3,500 = $525 commission",
        "Outdoor automation system: $4,200 = $630 commission"
      ],
      valueProposition: "Turn satisfied customers into ongoing revenue opportunities with natural upgrade paths."
    },
    "volume-pricing": {
      title: "Volume Pricing Tiers",
      overview: "Unlock additional savings and benefits as your smart home installations volume increases.",
      details: [
        "Tier 1 (5-10 homes/year): Base wholesale pricing",
        "Tier 2 (11-25 homes/year): Additional 5% discount + priority scheduling",
        "Tier 3 (26-50 homes/year): Additional 10% discount + dedicated support",
        "Tier 4 (51+ homes/year): Additional 15% discount + custom solutions"
      ],
      industryContext: "Volume discounts in construction typically range 5-15%. Our tiered system rewards growth with industry-leading incentives.",
      examples: [
        "Builder installing 20 homes/year saves additional $8,500 annually",
        "Builder installing 40 homes/year saves additional $22,000 annually",
        "Priority scheduling reduces project delays by average of 3-5 days"
      ],
      valueProposition: "Scale your business profitably with pricing that improves as you grow."
    },
    "marketing-materials": {
      title: "Co-Branded Marketing Materials",
      overview: "Professional marketing assets that showcase smart home capabilities with your branding.",
      details: [
        "Custom brochures featuring your projects and TCL technology",
        "Professional photography and video content for your listings",
        "Social media templates and content calendar",
        "Trade show displays and presentation materials"
      ],
      industryContext: "Professional marketing materials increase home sale prices by 3-7% and reduce time on market by 20%.",
      examples: [
        "Custom project showcase videos highlighting smart home features",
        "Professional photography emphasizing technology integration",
        "Branded brochures explaining smart home benefits to potential buyers"
      ],
      valueProposition: "Enhance your marketing presence and differentiate your homes with professional smart home marketing."
    },
    "showroom-support": {
      title: "Showroom Support",
      overview: "Transform your model homes and showrooms into interactive smart home experiences.",
      details: [
        "Interactive display systems showcasing smart home capabilities",
        "Demonstration equipment for hands-on customer experiences",
        "Trained staff support for showroom technology",
        "Regular updates and maintenance of display systems"
      ],
      industryContext: "Interactive showrooms increase customer engagement by 65% and smart home upgrade rates by 45%.",
      examples: [
        "Touch-screen displays showing automation scenarios",
        "Live demonstrations of lighting, climate, and security systems",
        "Voice control showcases with Amazon Alexa and Google Assistant"
      ],
      valueProposition: "Convert more prospects into smart home buyers with engaging, hands-on experiences."
    },
    "sales-training": {
      title: "Sales Team Training",
      overview: "Comprehensive training programs that make your sales team smart home technology experts.",
      details: [
        "Monthly training sessions on new technologies and features",
        "Certification programs for sales staff",
        "Sales tools and presentation materials",
        "Ongoing support and advanced training opportunities"
      ],
      industryContext: "Trained sales teams achieve 35% higher close rates on technology upgrades and 25% higher average sale values.",
      examples: [
        "Smart home benefits presentation training",
        "ROI calculation tools for customer conversations",
        "Hands-on technology demonstrations and practice sessions"
      ],
      valueProposition: "Empower your team to confidently sell smart home solutions and maximize upgrade rates."
    },
    "technical-support": {
      title: "24/7 Technical Support",
      overview: "Round-the-clock technical assistance ensuring smooth installations and satisfied customers.",
      details: [
        "24/7 phone and chat support for urgent issues",
        "Remote diagnostics and troubleshooting capabilities",
        "On-site emergency response within 4 hours",
        "Proactive monitoring and maintenance alerts"
      ],
      industryContext: "Technical issues account for 85% of smart home customer complaints. 24/7 support reduces resolution time by 70%.",
      examples: [
        "Remote system diagnostics identify issues before customer calls",
        "Emergency response for critical security or safety systems",
        "Proactive maintenance prevents 90% of potential issues"
      ],
      valueProposition: "Protect your reputation with guaranteed technical support that keeps customers satisfied."
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  const certificationData = {
    military: {
      title: "Military Intelligence Specialist (22 Years Service)",
      description: "Distinguished 22-year career in military intelligence operations, providing enterprise-grade expertise in network security, threat assessment, and mission-critical system design for residential smart home applications.",
      benefits: [
        "Advanced cybersecurity protocols and threat mitigation strategies",
        "Precision-based network architecture design and implementation", 
        "Proven expertise in complex, mission-critical system deployments",
        "Leadership experience managing large-scale technology infrastructure projects",
        "Intelligence analysis skills applied to predictive home automation",
        "Military-grade encryption and security implementation for civilian applications"
      ],
      achievements: [
        "22 years of distinguished military service in intelligence operations",
        "Expert in classified network design and security protocols",
        "Leadership roles in high-stakes technology deployments",
        "Specialized training in threat assessment and risk mitigation"
      ],
      link: null
    },
    ai: {
      title: "AI Logic Integration Specialist",
      description: "Advanced artificial intelligence and machine learning specialist, creating proprietary automation systems that learn, adapt, and predict homeowner preferences with unprecedented sophistication.",
      benefits: [
        "Proprietary AI automation scripts for unique home scenarios and family lifestyles",
        "Advanced machine learning integration for predictive home management and optimization",
        "Custom voice control and natural language processing with behavioral understanding",
        "Intelligent scene creation based on deep pattern analysis and lifestyle recognition",
        "Edge AI processing for instant response times and complete privacy protection",
        "Behavioral learning algorithms that continuously improve automation performance"
      ],
      achievements: [
        "Developed proprietary AI logic engine for residential automation",
        "Created behavioral learning algorithms for predictive home management",
        "Pioneer in edge AI processing for smart home applications",
        "Expert in machine learning model optimization for home automation"
      ],
      link: null
    },
    lutron: {
      title: "Lutron RadioRA 3 Certified",
      description: "Expert in Lutron's latest lighting control technology, delivering energy-efficient and aesthetically pleasing lighting solutions.",
      benefits: [
        "Energy savings up to 60% with smart lighting control",
        "Seamless integration with other home systems",
        "Professional scene programming and customization",
        "Wireless and hybrid installation expertise"
      ],
      link: "https://www.lutron.com/en-US/Education-Training/Pages/LutronEducationCenter.aspx"
    },
    urc: {
      title: "URC HAP Dealer Certified",
      description: "Universal Remote Control Home Automation Program dealer, specializing in comprehensive control system integration.",
      benefits: [
        "Universal control of all home entertainment systems",
        "Custom user interface design for easy operation",
        "Integration with lighting, HVAC, and security systems",
        "Professional programming and ongoing support"
      ],
      link: "https://www.urc-automation.com/"
    },
    savant: {
      title: "Savant Certified Professional",
      description: "Premium home automation platform certification, delivering luxury smart home experiences with cutting-edge technology.",
      benefits: [
        "Premium luxury automation experiences",
        "Apple TV 4K-based control systems",
        "Professional-grade audio/video distribution",
        "Seamless iOS and Android app integration"
      ],
      link: "https://community.savantlabs.io/c/savant-certification"
    },
    ic: {
      title: "IC Realtime Security Certified",
      description: "Professional security camera and surveillance system specialist, providing comprehensive property protection solutions.",
      benefits: [
        "Advanced video analytics and AI-powered detection",
        "4K and thermal imaging camera systems",
        "Cloud and local storage solutions",
        "Mobile monitoring and alert systems"
      ],
      link: "https://www.icrealtime.com/"
    },
    rti: {
      title: "RTI Integration Certified",
      description: "Remote Technologies Inc. certified for advanced control system programming and integration across all home systems.",
      benefits: [
        "Sophisticated control system programming",
        "Multi-room audio/video distribution",
        "Custom user interface development",
        "Integration with third-party systems"
      ],
      link: "https://www.rticorp.com/"
    },
    control4: {
      title: "Control4 Designer Certified",
      description: "Professional home automation design certification for Control4 systems, specializing in whole-home integration.",
      benefits: [
        "Comprehensive whole-home automation design",
        "Seamless integration of lighting, audio, video, and climate",
        "Professional system commissioning and support",
        "Custom programming for unique home requirements"
      ],
      link: "https://www.control4.com/"
    },
    theater: {
      title: "Home Theater Designer",
      description: "Specialized expertise in designing and installing custom home theater and entertainment spaces for optimal audiovisual experiences.",
      benefits: [
        "Custom acoustical design and room treatment",
        "High-end projector and display calibration",
        "Immersive surround sound system design",
        "Automated lighting and motorized seating integration"
      ],
      link: null
    },
    scripting: {
      title: "Bespoke AI Scripting Expert",
      description: "Custom artificial intelligence and automation scripting for unique home automation scenarios that standard systems cannot address.",
      benefits: [
        "One-of-a-kind automation solutions for complex requirements",
        "Custom API integrations with any smart device or service",
        "Predictive automation based on family lifestyle patterns",
        "Advanced conditional logic for sophisticated home responses"
      ],
      link: null
    }
  };

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
              
              {/* Unique Differentiator Badges */}
              <div className="flex flex-wrap justify-center gap-3 mt-6">
                <Badge className="bg-primary/20 text-primary border-primary/30 px-4 py-2">
                  <Brain className="w-4 h-4 mr-2" />
                  Proprietary AI Logic Engine
                </Badge>
                <Badge className="bg-primary/20 text-primary border-primary/30 px-4 py-2">
                  <Cpu className="w-4 h-4 mr-2" />
                  Edge AI Processing
                </Badge>
                <Badge className="bg-primary/20 text-primary border-primary/30 px-4 py-2">
                  <ShieldCheck className="w-4 h-4 mr-2" />
                  Military Intelligence Security
                </Badge>
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
              {/* Home Value Premium Dialog */}
              <Dialog>
                <DialogTrigger asChild>
                  <Card className="interactive-stat card-elevated p-6 bg-white/80 dark:bg-black/40 backdrop-blur-sm border-0 glow-on-hover">
                    <div className="text-4xl font-bold" style={{color: 'hsl(var(--tcl-success))'}}>8-12%</div>
                    <div className="text-muted-foreground">Home Value Premium</div>
                    <BarChart3 className="w-4 h-4 mt-2 text-muted-foreground" />
                    <div className="text-xs text-primary mt-1">→ Click for details</div>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      Smart Home Value Premium: 8-12%
                    </DialogTitle>
                    <DialogDescription>
                      Industry research and market data supporting smart home value increases
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <Card className="p-4">
                        <div className="text-2xl font-bold text-primary">81%</div>
                        <div className="text-sm text-muted-foreground">of buyers want smart home features</div>
                        <div className="text-xs text-muted-foreground mt-1">Tech Jury 2024</div>
                      </Card>
                      <Card className="p-4">
                        <div className="text-2xl font-bold text-primary">$191B</div>
                        <div className="text-sm text-muted-foreground">Global smart home market by 2028</div>
                        <div className="text-xs text-muted-foreground mt-1">Industry forecasts</div>
                      </Card>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-semibold">Key Industry Findings:</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>Smart homes can add 3% to 5% to property value (Consumer Reports)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>43% of Gen Z buyers consider smart homes "very important"</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>CEDIA industry valued at $29+ billion with continued growth</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>Smart security systems can add up to 5% property value</span>
                        </li>
                      </ul>
                    </div>

                    <div className="flex gap-4 text-xs">
                      <a href="https://cedia.org" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-primary hover:underline">
                        <ExternalLink className="w-3 h-3" />
                        CEDIA Research
                      </a>
                      <a href="https://www.iwired.com/does-home-automation-increase-home-value/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-primary hover:underline">
                        <ExternalLink className="w-3 h-3" />
                        Market Analysis
                      </a>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              {/* Faster Sales Dialog */}
              <Dialog>
                <DialogTrigger asChild>
                  <Card className="interactive-stat card-elevated p-6 bg-white/80 dark:bg-black/40 backdrop-blur-sm border-0 glow-on-hover">
                    <div className="text-4xl font-bold text-primary">30%</div>
                    <div className="text-muted-foreground">Faster Sales</div>
                    <BarChart3 className="w-4 h-4 mt-2 text-muted-foreground" />
                    <div className="text-xs text-primary mt-1">→ Click for details</div>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" />
                      Smart Homes Sell 30% Faster
                    </DialogTitle>
                    <DialogDescription>
                      Market data showing reduced time on market for tech-enabled properties
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <Card className="p-4">
                        <div className="text-2xl font-bold text-primary">30%</div>
                        <div className="text-sm text-muted-foreground">Faster sales with AI features</div>
                        <div className="text-xs text-muted-foreground mt-1">KW Appraisal Group 2025</div>
                      </Card>
                      <Card className="p-4">
                        <div className="text-2xl font-bold text-primary">78%</div>
                        <div className="text-sm text-muted-foreground">Will pay more for smart features</div>
                        <div className="text-xs text-muted-foreground mt-1">Homebuyer surveys</div>
                      </Card>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-semibold">Market Performance Data:</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>Smart homes with AI features selling up to 30% faster than traditional properties</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>Younger demographics driving faster adoption and sales velocity</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>Technology features becoming buyer expectation, not luxury</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>Reduced time on market due to enhanced buyer appeal</span>
                        </li>
                      </ul>
                    </div>

                    <div className="flex gap-4 text-xs">
                      <a href="https://kwappraisalgroup.com/how-smart-home-features-can-boost-your-property-value/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-primary hover:underline">
                        <ExternalLink className="w-3 h-3" />
                        KW Appraisal Research
                      </a>
                      <a href="https://www.fullspectrumtg.com/hidden-roi-smart-homes-how-automation-increases-property-value/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-primary hover:underline">
                        <ExternalLink className="w-3 h-3" />
                        ROI Analysis
                      </a>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              {/* Satisfaction Score Dialog */}
              <Dialog>
                <DialogTrigger asChild>
                  <Card className="interactive-stat card-elevated p-6 bg-white/80 dark:bg-black/40 backdrop-blur-sm border-0 glow-on-hover">
                    <div className="text-4xl font-bold" style={{color: 'hsl(var(--tcl-accent))'}}>95%+</div>
                    <div className="text-muted-foreground">Satisfaction Score</div>
                    <BarChart3 className="w-4 h-4 mt-2 text-muted-foreground" />
                    <div className="text-xs text-primary mt-1">→ Click for details</div>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-primary" />
                      95%+ Customer Satisfaction
                    </DialogTitle>
                    <DialogDescription>
                      Professional installation quality and customer satisfaction metrics
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <Card className="p-4">
                        <div className="text-2xl font-bold text-primary">$29B+</div>
                        <div className="text-sm text-muted-foreground">Professional smart home industry</div>
                        <div className="text-xs text-muted-foreground mt-1">CEDIA 2024</div>
                      </Card>
                      <Card className="p-4">
                        <div className="text-2xl font-bold text-primary">95%+</div>
                        <div className="text-sm text-muted-foreground">Professional installation satisfaction</div>
                        <div className="text-xs text-muted-foreground mt-1">Industry standards</div>
                      </Card>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-semibold">Professional Installation Benefits:</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>CEDIA-certified integrators deliver premium customer experiences</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>Professional installations show significantly higher satisfaction vs. DIY</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>Long-term satisfaction tied to proper system integration</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>Ongoing support and maintenance ensures lasting satisfaction</span>
                        </li>
                      </ul>
                    </div>

                    <div className="flex gap-4 text-xs">
                      <a href="https://cedia.org/en-us/smart-home-professionals/news/cedias-reinvigorated-research-approach-uncovers-us-professional-smart-home-industry-nears-30-billion/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-primary hover:underline">
                        <ExternalLink className="w-3 h-3" />
                        CEDIA Industry Report
                      </a>
                      <a href="https://www.prnewswire.com/news-releases/smart-home-complexity-boosts-demand-and-opportunity-for-professional-integration-and-services-according-to-parks-associates-research-302544776.html" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-primary hover:underline">
                        <ExternalLink className="w-3 h-3" />
                        Parks Associates Study
                      </a>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
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
                  <Dialog open={openDialog === 'av'} onOpenChange={(open) => setOpenDialog(open ? 'av' : null)}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <DialogTrigger asChild>
                          <button type="button" className="relative p-3 bg-red-50 dark:bg-red-950 rounded-lg text-xs text-center hover:bg-red-100 dark:hover:bg-red-900 hover:scale-105 transition-all cursor-pointer group">
                            A/V Vendor
                            <Info className="absolute top-1 right-1 w-3 h-3 text-red-500 animate-pulse opacity-70 group-hover:opacity-100" />
                          </button>
                        </DialogTrigger>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Click for details</p>
                      </TooltipContent>
                    </Tooltip>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <Volume2 className="w-5 h-5 text-red-600" />
                          A/V Vendor Challenges
                        </DialogTitle>
                        <DialogDescription>
                          The complex reality of coordinating audio/visual installations in custom homes
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg">
                          <h4 className="font-semibold text-red-600 mb-2">Primary Pain Points:</h4>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                              <span><strong>Multiple Site Visits:</strong> Often requires 3-5 separate visits for planning, rough-in, equipment installation, and final programming</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                              <span><strong>Coordination Conflicts:</strong> Must align with electrical, low-voltage, and finish contractors on precise timing</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                              <span><strong>Equipment Delays:</strong> Custom A/V gear often has 4-8 week lead times, delaying entire move-in schedules</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                              <span><strong>Integration Issues:</strong> Difficulty connecting with other smart home systems, requiring additional programming time</span>
                            </li>
                          </ul>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">Real-World Impact:</h4>
                          <p className="text-sm text-muted-foreground">
                            "We had a $2M custom home delayed by 3 weeks because the A/V installer couldn't sync with the lighting programmer. 
                            The homeowner's move-in was postponed, costing us credibility and additional carrying costs." 
                            <span className="italic">- Custom Builder, Austin TX</span>
                          </p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Dialog open={openDialog === 'network'} onOpenChange={(open) => setOpenDialog(open ? 'network' : null)}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <DialogTrigger asChild>
                          <button type="button" className="relative p-3 bg-red-50 dark:bg-red-950 rounded-lg text-xs text-center hover:bg-red-100 dark:hover:bg-red-900 hover:scale-105 transition-all cursor-pointer group">
                            Network Tech
                            <Info className="absolute top-1 right-1 w-3 h-3 text-red-500 animate-pulse opacity-70 group-hover:opacity-100" />
                          </button>
                        </DialogTrigger>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Click for details</p>
                      </TooltipContent>
                    </Tooltip>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <Wifi className="w-5 h-5 text-red-600" />
                          Network Technology Challenges
                        </DialogTitle>
                        <DialogDescription>
                          Critical infrastructure planning that affects every connected device in the home
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg">
                          <h4 className="font-semibold text-red-600 mb-2">Network Infrastructure Pain Points:</h4>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                              <span><strong>Inadequate Planning:</strong> Network design often happens too late, requiring expensive retrofits</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                              <span><strong>Coverage Gaps:</strong> Dead zones in large homes require additional access points and switch upgrades</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                              <span><strong>Future-Proofing Issues:</strong> Cat5e installations become obsolete quickly, requiring rewiring for modern smart homes</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                              <span><strong>Integration Complexity:</strong> Difficulty connecting IoT devices, security systems, and automation platforms</span>
                            </li>
                          </ul>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg text-center">
                            <div className="text-2xl font-bold text-red-600">67%</div>
                            <div className="text-xs text-muted-foreground">of custom homes need network upgrades within 2 years</div>
                          </div>
                          <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg text-center">
                            <div className="text-2xl font-bold text-red-600">$8,500</div>
                            <div className="text-xs text-muted-foreground">average cost of post-construction network retrofits</div>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Dialog open={openDialog === 'security'} onOpenChange={(open) => setOpenDialog(open ? 'security' : null)}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <DialogTrigger asChild>
                          <button type="button" className="relative p-3 bg-red-50 dark:bg-red-950 rounded-lg text-xs text-center hover:bg-red-100 dark:hover:bg-red-900 hover:scale-105 transition-all cursor-pointer group">
                            Security Co.
                            <Info className="absolute top-1 right-1 w-3 h-3 text-red-500 animate-pulse opacity-70 group-hover:opacity-100" />
                          </button>
                        </DialogTrigger>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Click for details</p>
                      </TooltipContent>
                    </Tooltip>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <Shield className="w-5 h-5 text-red-600" />
                          Security Company Challenges
                        </DialogTitle>
                        <DialogDescription>
                          Fragmented security installations that compromise both safety and smart home integration
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg">
                          <h4 className="font-semibold text-red-600 mb-2">Security Installation Issues:</h4>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                              <span><strong>Delayed Installation:</strong> Security systems often installed weeks after move-in, leaving homes vulnerable</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                              <span><strong>Limited Integration:</strong> Standalone security that doesn't communicate with lighting, access, or automation</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                              <span><strong>Multiple Contracts:</strong> Separate monitoring fees, maintenance contracts, and equipment leases</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                              <span><strong>Inconsistent Service:</strong> Quality varies dramatically between technicians and service calls</span>
                            </li>
                          </ul>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">Homeowner Frustration:</h4>
                          <p className="text-sm text-muted-foreground">
                            "Our security system was installed 6 weeks after we moved in. When we finally got it working, 
                            it couldn't integrate with our smart locks or lighting scenes. Now we have three different apps 
                            just for basic home security." <span className="italic">- Homeowner, Denver CO</span>
                          </p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Dialog open={openDialog === 'lighting'} onOpenChange={(open) => setOpenDialog(open ? 'lighting' : null)}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <DialogTrigger asChild>
                          <button type="button" className="relative p-3 bg-red-50 dark:bg-red-950 rounded-lg text-xs text-center hover:bg-red-100 dark:hover:bg-red-900 hover:scale-105 transition-all cursor-pointer group">
                            Lighting Pro
                            <Info className="absolute top-1 right-1 w-3 h-3 text-red-500 animate-pulse opacity-70 group-hover:opacity-100" />
                          </button>
                        </DialogTrigger>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Click for details</p>
                      </TooltipContent>
                    </Tooltip>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <Lightbulb className="w-5 h-5 text-red-600" />
                          Lighting Professional Challenges
                        </DialogTitle>
                        <DialogDescription>
                          Complex lighting control systems that often frustrate both installers and homeowners
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg">
                          <h4 className="font-semibold text-red-600 mb-2">Lighting Control Complications:</h4>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                              <span><strong>Complex Programming:</strong> Advanced dimming scenes and keypads require specialized training and hours of setup</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                              <span><strong>Coordination Issues:</strong> Must align with electrical contractors on switch locations and load calculations</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                              <span><strong>Limited Smart Integration:</strong> Traditional lighting control systems struggle with modern IoT and voice control</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                              <span><strong>Inconsistent Implementation:</strong> Quality depends heavily on individual programmer expertise</span>
                            </li>
                          </ul>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg text-center">
                            <div className="text-lg font-bold text-red-600">15+</div>
                            <div className="text-xs text-muted-foreground">hours typical programming time</div>
                          </div>
                          <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg text-center">
                            <div className="text-lg font-bold text-red-600">40%</div>
                            <div className="text-xs text-muted-foreground">systems need reprogramming</div>
                          </div>
                          <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg text-center">
                            <div className="text-lg font-bold text-red-600">3-5</div>
                            <div className="text-xs text-muted-foreground">service calls typical</div>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Dialog open={openDialog === 'shade'} onOpenChange={(open) => setOpenDialog(open ? 'shade' : null)}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <DialogTrigger asChild>
                          <button type="button" className="relative p-3 bg-red-50 dark:bg-red-950 rounded-lg text-xs text-center hover:bg-red-100 dark:hover:bg-red-900 hover:scale-105 transition-all cursor-pointer group">
                            Shade Expert
                            <Info className="absolute top-1 right-1 w-3 h-3 text-red-500 animate-pulse opacity-70 group-hover:opacity-100" />
                          </button>
                        </DialogTrigger>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Click for details</p>
                      </TooltipContent>
                    </Tooltip>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <Home className="w-5 h-5 text-red-600" />
                          Shade Expert Challenges
                        </DialogTitle>
                        <DialogDescription>
                          Window treatment installations that disrupt timelines and limit automation potential
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg">
                          <h4 className="font-semibold text-red-600 mb-2">Shade Installation Problems:</h4>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                              <span><strong>Manual Installation Delays:</strong> Custom shades often arrive weeks after scheduled installation dates</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                              <span><strong>Limited Motorization:</strong> Retrofit motorization is expensive and often impossible with existing window treatments</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                              <span><strong>Poor Integration:</strong> Shade controls rarely sync with lighting scenes or time-of-day automation</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                              <span><strong>Separate Control Systems:</strong> Dedicated shade remotes add confusion to already complex smart home setups</span>
                            </li>
                          </ul>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">Missed Opportunities:</h4>
                          <p className="text-sm text-muted-foreground">
                            Automated shades can reduce HVAC costs by up to 30% and protect furnishings from UV damage, 
                            but poor integration means these benefits are rarely realized in custom homes.
                          </p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Dialog open={openDialog === 'auto'} onOpenChange={(open) => setOpenDialog(open ? 'auto' : null)}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <DialogTrigger asChild>
                          <button type="button" className="relative p-3 bg-red-50 dark:bg-red-950 rounded-lg text-xs text-center hover:bg-red-100 dark:hover:bg-red-900 hover:scale-105 transition-all cursor-pointer group">
                            Auto Tech
                            <Info className="absolute top-1 right-1 w-3 h-3 text-red-500 animate-pulse opacity-70 group-hover:opacity-100" />
                          </button>
                        </DialogTrigger>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Click for details</p>
                      </TooltipContent>
                    </Tooltip>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <Settings className="w-5 h-5 text-red-600" />
                          Automation Technology Challenges
                        </DialogTitle>
                        <DialogDescription>
                          Smart home automation that's often anything but smart for builders and homeowners
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg">
                          <h4 className="font-semibold text-red-600 mb-2">Automation Implementation Issues:</h4>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                              <span><strong>Delayed Programming:</strong> Automation setup often happens weeks after move-in, reducing initial home appeal</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                              <span><strong>Platform Incompatibility:</strong> Different systems don't communicate, creating isolated automation islands</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                              <span><strong>Complex User Training:</strong> Homeowners need extensive training sessions to use basic automation features</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                              <span><strong>Ongoing Maintenance:</strong> Systems require regular updates and troubleshooting from specialized technicians</span>
                            </li>
                          </ul>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">The Reality:</h4>
                          <p className="text-sm text-muted-foreground">
                            "We paid $45,000 for a 'smart home' but still have to manually adjust our thermostat, 
                            turn on lights with wall switches, and remember to arm our security system. 
                            The automation works maybe 60% of the time." <span className="italic">- Homeowner, Scottsdale AZ</span>
                          </p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
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

    // Slide 2.5: Technology Architecture Showcase
    {
      title: "Proprietary Technology Stack",
      subtitle: "What makes TCL different from every other home automation company",
      content: (
        <div className="space-y-8">
          {/* Technology Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="card-elevated p-8 gradient-primary text-white">
              <div className="text-center space-y-6">
                <div className="w-20 h-20 mx-auto rounded-full bg-white/20 flex items-center justify-center">
                  <Brain className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Proprietary AI Logic Engine</h3>
                <p className="text-sm opacity-90">
                  Our behavioral learning AI creates personalized automation that adapts and predicts user needs. 
                  Unlike basic timers, our system learns patterns and optimizes automatically.
                </p>
                <div className="space-y-2 text-xs">
                  <div>• Predictive lighting based on daily routines</div>
                  <div>• Behavioral climate optimization</div>
                  <div>• Intelligent security pattern recognition</div>
                </div>
              </div>
            </Card>

            <Card className="card-elevated p-8 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950">
              <div className="text-center space-y-6">
                <div className="w-20 h-20 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
                  <Cpu className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Edge AI Processing</h3>
                <p className="text-sm text-muted-foreground">
                  Local processing means instant response times and complete privacy. Your data never leaves your home - 
                  a capability traditional integrators simply cannot provide.
                </p>
                <div className="space-y-2 text-xs">
                  <div>• Sub-second response times</div>
                  <div>• Zero cloud dependency for core functions</div>
                  <div>• Military-grade data privacy</div>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="card-elevated p-8 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
              <div className="text-center space-y-6">
                <div className="w-20 h-20 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
                  <Network className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Self-Healing Mesh Networks</h3>
                <p className="text-sm text-muted-foreground">
                  Military-grade network reliability with automatic failover and optimization. 
                  Our networks adapt and heal themselves - technology others can't match.
                </p>
                <div className="space-y-2 text-xs">
                  <div>• Automatic device discovery and integration</div>
                  <div>• Dynamic routing optimization</div>
                  <div>• Zero single points of failure</div>
                </div>
              </div>
            </Card>

            <Card className="card-elevated p-8 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950 dark:to-violet-950">
              <div className="text-center space-y-6">
                <div className="w-20 h-20 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
                  <Eye className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Computer Vision Integration</h3>
                <p className="text-sm text-muted-foreground">
                  Advanced visual recognition enables context-aware automation. 
                  Cameras become intelligent sensors that understand and respond to real-world scenarios.
                </p>
                <div className="space-y-2 text-xs">
                  <div>• Occupancy-based lighting automation</div>
                  <div>• Security with facial recognition</div>
                  <div>• Activity-triggered scene changes</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Military Expertise Callout */}
          <Card className="p-6 gradient-success text-white">
            <div className="text-center">
              <h4 className="text-lg font-semibold mb-4 flex items-center justify-center gap-2">
                <ShieldCheck className="w-6 h-6" />
                22 Years Military Intelligence Expertise
              </h4>
              <p className="text-sm opacity-90 max-w-3xl mx-auto">
                Our founder's 22-year military intelligence background brings enterprise-grade security and network design 
                to residential automation - a level of expertise no traditional integrator can match.
              </p>
            </div>
          </Card>
        </div>
      )
    },

    // Slide 3: Customer Success Stories
    {
      title: "Customer Success Stories",
      subtitle: "Real results from satisfied builders and homeowners",
      content: (
        <div className="space-y-8">
          {/* Featured Testimonial */}
          <Card className="card-elevated p-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
                <Quote className="w-8 h-8 text-primary" />
              </div>
              
              {/* Stars */}
              <div className="flex items-center justify-center space-x-1">
                {Array.from({ length: 5 }, (_, index) => (
                  <Star key={index} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Testimonial Quote */}
              <blockquote className="text-xl md:text-2xl font-medium italic text-foreground max-w-4xl mx-auto leading-relaxed">
                "TCL Tech Solutions transformed our home with their innovative tech installation and Wireless upgrades. Their commitment to excellence is truly commendable!"
              </blockquote>

              {/* Customer Details */}
              <div className="space-y-4">
                <div className="text-lg font-semibold text-primary">Carlos Dukes</div>
                <div className="flex items-center justify-center gap-4">
                  <Badge className="bg-primary/20 text-primary border-primary/30 px-4 py-2">
                    Smart Home & Wireless Upgrades
                  </Badge>
                  <Badge className="bg-green-100 text-green-800 border-green-200 px-4 py-2">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Verified Customer
                  </Badge>
                </div>
              </div>
            </div>
          </Card>

          {/* Trust Indicators */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="card-elevated p-6 text-center bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
              <div className="text-4xl font-bold text-primary mb-2">5.0★</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
              <div className="text-xs text-muted-foreground mt-1">Perfect satisfaction scores</div>
            </Card>
            <Card className="card-elevated p-6 text-center bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950">
              <div className="text-4xl font-bold text-primary mb-2">15+</div>
              <div className="text-sm text-muted-foreground">Homes Transformed</div>
              <div className="text-xs text-muted-foreground mt-1">Successful installations</div>
            </Card>
            <Card className="card-elevated p-6 text-center bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950 dark:to-violet-950">
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
              <div className="text-xs text-muted-foreground mt-1">Zero unsatisfied customers</div>
            </Card>
          </div>

          {/* Builder Benefits from Customer Success */}
          <Card className="p-6 gradient-primary text-white">
            <div className="text-center space-y-4">
              <h4 className="text-xl font-semibold">Happy Customers = Growing Builder Success</h4>
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                <div className="flex flex-col items-center space-y-2">
                  <Handshake className="w-8 h-8" />
                  <span className="font-medium">Referral Generation</span>
                  <span className="text-xs opacity-90">Satisfied customers become brand ambassadors</span>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <TrendingUp className="w-8 h-8" />
                  <span className="font-medium">Premium Positioning</span>
                  <span className="text-xs opacity-90">Stand out from standard builder packages</span>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <Star className="w-8 h-8" />
                  <span className="font-medium">Reputation Building</span>
                  <span className="text-xs opacity-90">Quality work builds lasting partnerships</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )
    },

    // Slide 4: Why TCL Solutions - One-Stop Service Visual
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
              <p className="text-sm text-muted-foreground mb-3">Our proprietary multi-phase testing methodology ensures flawless system integration</p>
              <div className="text-sm space-y-1">
                <div>• AI-powered device compatibility analysis</div>
                <div>• Predictive maintenance system monitoring</div>
                <div>• Military-grade network security protocols</div>
              </div>
            </Card>

            <Card className="card-elevated p-6">
              <div className="flex items-center gap-3 mb-4">
                <Activity className="w-8 h-8 text-primary" />
                <h4 className="text-lg font-semibold">Behavioral Learning Engine</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-3">AI that learns and adapts to create truly personalized automation</p>
              <div className="text-sm space-y-1">
                <div>• Predictive climate intelligence</div>
                <div>• Adaptive lighting based on usage patterns</div>
                <div>• Proactive system optimization</div>
              </div>
            </Card>

            <Card className="card-elevated p-6">
              <div className="flex items-center gap-3 mb-4">
                <Radar className="w-8 h-8 text-primary" />
                <h4 className="text-lg font-semibold">Predictive Maintenance</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-3">AI-powered system monitoring prevents issues before they occur</p>
              <div className="text-sm space-y-1">
                <div>• Real-time system health monitoring</div>
                <div>• Automated firmware optimization</div>
                <div>• Predictive component failure alerts</div>
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
                <h4 className="text-lg font-semibold">Professional Certifications & Unique Expertise</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <Dialog open={certificationDialog === 'military'} onOpenChange={(open) => setCertificationDialog(open ? 'military' : null)}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <DialogTrigger asChild>
                          <button type="button" className="certification-badge interactive-element relative group">
                            <ShieldCheck className="w-4 h-4 mr-2" />
                            Military Intelligence (22 years)
                            <Info className="w-3 h-3 absolute -top-1 -right-1 text-primary animate-pulse" />
                          </button>
                        </DialogTrigger>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Click for certification details</p>
                      </TooltipContent>
                    </Tooltip>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>{certificationData.military.title}</DialogTitle>
                        <DialogDescription className="mt-4">
                          {certificationData.military.description}
                        </DialogDescription>
                      </DialogHeader>
                       <div className="mt-6 space-y-6">
                         <div>
                           <h4 className="font-semibold mb-3">Key Benefits:</h4>
                           <ul className="space-y-2">
                             {certificationData.military.benefits.map((benefit, index) => (
                               <li key={index} className="flex items-start gap-2">
                                 <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                                 <span className="text-sm">{benefit}</span>
                               </li>
                             ))}
                           </ul>
                         </div>
                         <div className="bg-primary/5 p-4 rounded-lg">
                           <h4 className="font-semibold mb-3">Service Achievements:</h4>
                           <ul className="space-y-2">
                             {certificationData.military.achievements.map((achievement, index) => (
                               <li key={index} className="flex items-start gap-2">
                                 <ShieldCheck className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                 <span className="text-sm">{achievement}</span>
                               </li>
                             ))}
                           </ul>
                         </div>
                       </div>
                    </DialogContent>
                  </Dialog>

                  <Dialog open={certificationDialog === 'ai'} onOpenChange={(open) => setCertificationDialog(open ? 'ai' : null)}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <DialogTrigger asChild>
                          <button type="button" className="certification-badge interactive-element relative group">
                            <Brain className="w-4 h-4 mr-2" />
                            AI Logic Integration Specialist
                            <Info className="w-3 h-3 absolute -top-1 -right-1 text-primary animate-pulse" />
                          </button>
                        </DialogTrigger>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Click for certification details</p>
                      </TooltipContent>
                    </Tooltip>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>{certificationData.ai.title}</DialogTitle>
                        <DialogDescription className="mt-4">
                          {certificationData.ai.description}
                        </DialogDescription>
                      </DialogHeader>
                       <div className="mt-6 space-y-6">
                         <div>
                           <h4 className="font-semibold mb-3">Key Benefits:</h4>
                           <ul className="space-y-2">
                             {certificationData.ai.benefits.map((benefit, index) => (
                               <li key={index} className="flex items-start gap-2">
                                 <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                                 <span className="text-sm">{benefit}</span>
                               </li>
                             ))}
                           </ul>
                         </div>
                         <div className="bg-primary/5 p-4 rounded-lg">
                           <h4 className="font-semibold mb-3">Technical Achievements:</h4>
                           <ul className="space-y-2">
                             {certificationData.ai.achievements.map((achievement, index) => (
                               <li key={index} className="flex items-start gap-2">
                                 <Brain className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                 <span className="text-sm">{achievement}</span>
                               </li>
                             ))}
                           </ul>
                         </div>
                       </div>
                    </DialogContent>
                  </Dialog>

                  <Dialog open={certificationDialog === 'lutron'} onOpenChange={(open) => setCertificationDialog(open ? 'lutron' : null)}>
                    <DialogTrigger asChild>
                       <Tooltip>
                         <TooltipTrigger asChild>
                           <button className="certification-badge interactive-element relative group">
                             <Lightbulb className="w-4 h-4 mr-2" />
                             Lutron RadioRA 3
                             <Info className="w-3 h-3 absolute -top-1 -right-1 text-primary animate-pulse" />
                           </button>
                         </TooltipTrigger>
                         <TooltipContent>
                           <p>Click for certification details</p>
                         </TooltipContent>
                       </Tooltip>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>{certificationData.lutron.title}</DialogTitle>
                        <DialogDescription className="mt-4">
                          {certificationData.lutron.description}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="mt-6">
                        <h4 className="font-semibold mb-3">Key Benefits:</h4>
                        <ul className="space-y-2">
                          {certificationData.lutron.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                              <span className="text-sm">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-6 pt-4 border-t">
                          <a 
                            href={certificationData.lutron.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-primary hover:underline"
                          >
                            Learn more about Lutron Education Center
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Dialog open={certificationDialog === 'urc'} onOpenChange={(open) => setCertificationDialog(open ? 'urc' : null)}>
                    <DialogTrigger asChild>
                       <Tooltip>
                         <TooltipTrigger asChild>
                           <button className="certification-badge interactive-element relative group">
                             <Volume2 className="w-4 h-4 mr-2" />
                             URC HAP Dealer
                             <Info className="w-3 h-3 absolute -top-1 -right-1 text-primary animate-pulse" />
                           </button>
                         </TooltipTrigger>
                         <TooltipContent>
                           <p>Click for certification details</p>
                         </TooltipContent>
                       </Tooltip>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>{certificationData.urc.title}</DialogTitle>
                        <DialogDescription className="mt-4">
                          {certificationData.urc.description}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="mt-6">
                        <h4 className="font-semibold mb-3">Key Benefits:</h4>
                        <ul className="space-y-2">
                          {certificationData.urc.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                              <span className="text-sm">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-6 pt-4 border-t">
                          <a 
                            href={certificationData.urc.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-primary hover:underline"
                          >
                            Visit URC Automation
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Dialog open={certificationDialog === 'savant'} onOpenChange={(open) => setCertificationDialog(open ? 'savant' : null)}>
                    <DialogTrigger asChild>
                       <Tooltip>
                         <TooltipTrigger asChild>
                           <button className="certification-badge interactive-element relative group">
                             <Home className="w-4 h-4 mr-2" />
                             Savant Certified
                             <Info className="w-3 h-3 absolute -top-1 -right-1 text-primary animate-pulse" />
                           </button>
                         </TooltipTrigger>
                         <TooltipContent>
                           <p>Click for certification details</p>
                         </TooltipContent>
                       </Tooltip>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>{certificationData.savant.title}</DialogTitle>
                        <DialogDescription className="mt-4">
                          {certificationData.savant.description}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="mt-6">
                        <h4 className="font-semibold mb-3">Key Benefits:</h4>
                        <ul className="space-y-2">
                          {certificationData.savant.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                              <span className="text-sm">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-6 pt-4 border-t">
                          <a 
                            href={certificationData.savant.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-primary hover:underline"
                          >
                            Visit Savant Certification Community
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Dialog open={certificationDialog === 'ic'} onOpenChange={(open) => setCertificationDialog(open ? 'ic' : null)}>
                    <DialogTrigger asChild>
                       <Tooltip>
                         <TooltipTrigger asChild>
                           <button className="certification-badge interactive-element relative group">
                             <Camera className="w-4 h-4 mr-2" />
                             IC Realtime Certified
                             <Info className="w-3 h-3 absolute -top-1 -right-1 text-primary animate-pulse" />
                           </button>
                         </TooltipTrigger>
                         <TooltipContent>
                           <p>Click for certification details</p>
                         </TooltipContent>
                       </Tooltip>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>{certificationData.ic.title}</DialogTitle>
                        <DialogDescription className="mt-4">
                          {certificationData.ic.description}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="mt-6">
                        <h4 className="font-semibold mb-3">Key Benefits:</h4>
                        <ul className="space-y-2">
                          {certificationData.ic.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                              <span className="text-sm">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-6 pt-4 border-t">
                          <a 
                            href={certificationData.ic.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-primary hover:underline"
                          >
                            Visit IC Realtime
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Dialog open={certificationDialog === 'rti'} onOpenChange={(open) => setCertificationDialog(open ? 'rti' : null)}>
                    <DialogTrigger asChild>
                       <Tooltip>
                         <TooltipTrigger asChild>
                           <button className="certification-badge interactive-element relative group">
                             <Zap className="w-4 h-4 mr-2" />
                             RTI Certified
                             <Info className="w-3 h-3 absolute -top-1 -right-1 text-primary animate-pulse" />
                           </button>
                         </TooltipTrigger>
                         <TooltipContent>
                           <p>Click for certification details</p>
                         </TooltipContent>
                       </Tooltip>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>{certificationData.rti.title}</DialogTitle>
                        <DialogDescription className="mt-4">
                          {certificationData.rti.description}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="mt-6">
                        <h4 className="font-semibold mb-3">Key Benefits:</h4>
                        <ul className="space-y-2">
                          {certificationData.rti.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                              <span className="text-sm">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-6 pt-4 border-t">
                          <a 
                            href={certificationData.rti.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-primary hover:underline"
                          >
                            Visit RTI Corporation
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Dialog open={certificationDialog === 'control4'} onOpenChange={(open) => setCertificationDialog(open ? 'control4' : null)}>
                    <DialogTrigger asChild>
                       <Tooltip>
                         <TooltipTrigger asChild>
                           <button className="certification-badge interactive-element relative group">
                             <Shield className="w-4 h-4 mr-2" />
                             Control4 Designer
                             <Info className="w-3 h-3 absolute -top-1 -right-1 text-primary animate-pulse" />
                           </button>
                         </TooltipTrigger>
                         <TooltipContent>
                           <p>Click for certification details</p>
                         </TooltipContent>
                       </Tooltip>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>{certificationData.control4.title}</DialogTitle>
                        <DialogDescription className="mt-4">
                          {certificationData.control4.description}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="mt-6">
                        <h4 className="font-semibold mb-3">Key Benefits:</h4>
                        <ul className="space-y-2">
                          {certificationData.control4.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                              <span className="text-sm">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-6 pt-4 border-t">
                          <a 
                            href={certificationData.control4.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-primary hover:underline"
                          >
                            Visit Control4
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Dialog open={certificationDialog === 'theater'} onOpenChange={(open) => setCertificationDialog(open ? 'theater' : null)}>
                    <DialogTrigger asChild>
                       <Tooltip>
                         <TooltipTrigger asChild>
                           <button className="certification-badge interactive-element relative group">
                             <Play className="w-4 h-4 mr-2" />
                             Home Theater Designer
                             <Info className="w-3 h-3 absolute -top-1 -right-1 text-primary animate-pulse" />
                           </button>
                         </TooltipTrigger>
                         <TooltipContent>
                           <p>Click for certification details</p>
                         </TooltipContent>
                       </Tooltip>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>{certificationData.theater.title}</DialogTitle>
                        <DialogDescription className="mt-4">
                          {certificationData.theater.description}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="mt-6">
                        <h4 className="font-semibold mb-3">Key Benefits:</h4>
                        <ul className="space-y-2">
                          {certificationData.theater.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                              <span className="text-sm">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Dialog open={certificationDialog === 'scripting'} onOpenChange={(open) => setCertificationDialog(open ? 'scripting' : null)}>
                    <DialogTrigger asChild>
                       <Tooltip>
                         <TooltipTrigger asChild>
                           <button className="certification-badge interactive-element relative group">
                             <Cog className="w-4 h-4 mr-2" />
                             Bespoke AI Scripting
                             <Info className="w-3 h-3 absolute -top-1 -right-1 text-primary animate-pulse" />
                           </button>
                         </TooltipTrigger>
                         <TooltipContent>
                           <p>Click for certification details</p>
                         </TooltipContent>
                       </Tooltip>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>{certificationData.scripting.title}</DialogTitle>
                        <DialogDescription className="mt-4">
                          {certificationData.scripting.description}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="mt-6">
                        <h4 className="font-semibold mb-3">Key Benefits:</h4>
                        <ul className="space-y-2">
                          {certificationData.scripting.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                              <span className="text-sm">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </Card>

          {/* Brand Partners */}
          <div className="grid md:grid-cols-4 gap-6">
             <Tooltip>
               <TooltipTrigger asChild>
                 <a href="https://www.lutron.com/us/en" target="_blank" rel="noopener noreferrer" className="block interactive-element relative group">
                   <Card className="card-elevated p-6 text-center cursor-pointer">
                     <div className="w-16 h-16 mx-auto rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                       <Lightbulb className="w-8 h-8 text-primary" />
                     </div>
                     <h4 className="font-semibold">Lutron</h4>
                     <p className="text-sm text-muted-foreground">Lighting Control</p>
                     <ExternalLink className="w-3 h-3 absolute top-2 right-2 text-primary opacity-70" />
                   </Card>
                 </a>
               </TooltipTrigger>
               <TooltipContent>
                 <p>Visit Lutron website</p>
               </TooltipContent>
             </Tooltip>
             <Tooltip>
               <TooltipTrigger asChild>
                 <a href="https://www.control4.com/" target="_blank" rel="noopener noreferrer" className="block interactive-element relative group">
                   <Card className="card-elevated p-6 text-center cursor-pointer">
                     <div className="w-16 h-16 mx-auto rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                       <Home className="w-8 h-8 text-primary" />
                     </div>
                     <h4 className="font-semibold">Control4</h4>
                     <p className="text-sm text-muted-foreground">Automation</p>
                     <ExternalLink className="w-3 h-3 absolute top-2 right-2 text-primary opacity-70" />
                   </Card>
                 </a>
               </TooltipTrigger>
               <TooltipContent>
                 <p>Visit Control4 website</p>
               </TooltipContent>
             </Tooltip>
             <Tooltip>
               <TooltipTrigger asChild>
                 <a href="https://www.savant.com/" target="_blank" rel="noopener noreferrer" className="block interactive-element relative group">
                   <Card className="card-elevated p-6 text-center cursor-pointer">
                     <div className="w-16 h-16 mx-auto rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                       <Volume2 className="w-8 h-8 text-primary" />
                     </div>
                     <h4 className="font-semibold">Savant</h4>
                     <p className="text-sm text-muted-foreground">Premium Systems</p>
                     <ExternalLink className="w-3 h-3 absolute top-2 right-2 text-primary opacity-70" />
                   </Card>
                 </a>
               </TooltipTrigger>
               <TooltipContent>
                 <p>Visit Savant website</p>
               </TooltipContent>
             </Tooltip>
             <Tooltip>
               <TooltipTrigger asChild>
                 <a href="https://icrealtime.com/" target="_blank" rel="noopener noreferrer" className="block interactive-element relative group">
                   <Card className="card-elevated p-6 text-center cursor-pointer">
                     <div className="w-16 h-16 mx-auto rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                       <Camera className="w-8 h-8 text-primary" />
                     </div>
                     <h4 className="font-semibold">IC Realtime</h4>
                     <p className="text-sm text-muted-foreground">Security Systems</p>
                     <ExternalLink className="w-3 h-3 absolute top-2 right-2 text-primary opacity-70" />
                   </Card>
                 </a>
               </TooltipTrigger>
               <TooltipContent>
                 <p>Visit IC Realtime website</p>
               </TooltipContent>
             </Tooltip>
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
                <div>• Basic AI lighting control</div>
                <div>• Behavioral learning setup</div>
                <div>• Edge processing foundation</div>
                <div>• Smart security integration</div>
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
                <div>• Full AI automation system</div>
                <div>• Predictive climate intelligence</div>
                <div>• Computer vision integration</div>
                <div>• Proactive system monitoring</div>
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
                <div>• Bespoke AI scripting services</div>
                <div>• Military-grade security</div>
                <div>• Custom behavioral automation</div>
                <div>• AI consulting & optimization</div>
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
                  "Custom builder in San Antonio partnered with TCL to deliver a $150K automation package with 
                  AI behavioral learning, edge processing, and predictive maintenance - technology that saved 
                  3 weeks in scheduling and eliminated 4 subcontractors."
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
                Customer Testimonials
              </h4>
              <Carousel className="w-full">
                <CarouselContent>
                  {testimonials.map((testimonial, index) => (
                    <CarouselItem key={index}>
                      <div className="p-1">
                        <Card className="p-4">
                          <div className="flex items-center gap-2 mb-3">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                            ))}
                          </div>
                          <blockquote className="text-sm italic text-muted-foreground mb-3">
                            "{testimonial.quote}"
                          </blockquote>
                          <div className="text-sm">
                            <div className="font-medium">{testimonial.name}</div>
                            <div className="text-muted-foreground">{testimonial.serviceType}</div>
                          </div>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
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
                <Dialog open={benefitDialog === "wholesale-pricing"} onOpenChange={(open) => setBenefitDialog(open ? "wholesale-pricing" : null)}>
                  <DialogTrigger asChild>
                    <div className="clickable-benefit flex justify-between items-center p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                      <span>Builder-exclusive wholesale pricing</span>
                      <CheckCircle className="w-4 h-4 text-green-600 expand-icon" />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-green-600">
                        {benefitDetails["wholesale-pricing"].title}
                      </DialogTitle>
                      <DialogDescription className="text-base">
                        {benefitDetails["wholesale-pricing"].overview}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-lg mb-3">Key Details</h4>
                        <ul className="space-y-2">
                          {benefitDetails["wholesale-pricing"].details.map((detail, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg mb-3">Industry Context</h4>
                        <p className="text-muted-foreground">{benefitDetails["wholesale-pricing"].industryContext}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg mb-3">Pricing Examples</h4>
                        <div className="grid gap-3">
                          {benefitDetails["wholesale-pricing"].examples.map((example, index) => (
                            <div key={index} className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                              <code className="text-sm">{example}</code>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg">
                        <h4 className="font-semibold mb-2">Value Proposition</h4>
                        <p>{benefitDetails["wholesale-pricing"].valueProposition}</p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <Dialog open={benefitDialog === "revenue-share"} onOpenChange={(open) => setBenefitDialog(open ? "revenue-share" : null)}>
                  <DialogTrigger asChild>
                    <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-950 rounded-lg cursor-pointer hover:bg-green-100 dark:hover:bg-green-900 transition-colors">
                      <span>Revenue share opportunities</span>
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-green-600">
                        {benefitDetails["revenue-share"].title}
                      </DialogTitle>
                      <DialogDescription className="text-base">
                        {benefitDetails["revenue-share"].overview}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-lg mb-3">Revenue Streams</h4>
                        <ul className="space-y-2">
                          {benefitDetails["revenue-share"].details.map((detail, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg mb-3">Market Growth</h4>
                        <p className="text-muted-foreground">{benefitDetails["revenue-share"].industryContext}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg mb-3">Revenue Examples</h4>
                        <div className="grid gap-3">
                          {benefitDetails["revenue-share"].examples.map((example, index) => (
                            <div key={index} className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                              <code className="text-sm">{example}</code>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg">
                        <h4 className="font-semibold mb-2">Value Proposition</h4>
                        <p>{benefitDetails["revenue-share"].valueProposition}</p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <Dialog open={benefitDialog === "upsell-commission"} onOpenChange={(open) => setBenefitDialog(open ? "upsell-commission" : null)}>
                  <DialogTrigger asChild>
                    <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-950 rounded-lg cursor-pointer hover:bg-green-100 dark:hover:bg-green-900 transition-colors">
                      <span>Upsell commission structure</span>
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-green-600">
                        {benefitDetails["upsell-commission"].title}
                      </DialogTitle>
                      <DialogDescription className="text-base">
                        {benefitDetails["upsell-commission"].overview}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-lg mb-3">Commission Structure</h4>
                        <ul className="space-y-2">
                          {benefitDetails["upsell-commission"].details.map((detail, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg mb-3">Market Opportunity</h4>
                        <p className="text-muted-foreground">{benefitDetails["upsell-commission"].industryContext}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg mb-3">Commission Examples</h4>
                        <div className="grid gap-3">
                          {benefitDetails["upsell-commission"].examples.map((example, index) => (
                            <div key={index} className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                              <code className="text-sm">{example}</code>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg">
                        <h4 className="font-semibold mb-2">Value Proposition</h4>
                        <p>{benefitDetails["upsell-commission"].valueProposition}</p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <Dialog open={benefitDialog === "volume-pricing"} onOpenChange={(open) => setBenefitDialog(open ? "volume-pricing" : null)}>
                  <DialogTrigger asChild>
                    <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-950 rounded-lg cursor-pointer hover:bg-green-100 dark:hover:bg-green-900 transition-colors">
                      <span>Volume pricing tiers</span>
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-green-600">
                        {benefitDetails["volume-pricing"].title}
                      </DialogTitle>
                      <DialogDescription className="text-base">
                        {benefitDetails["volume-pricing"].overview}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-lg mb-3">Tier Structure</h4>
                        <ul className="space-y-2">
                          {benefitDetails["volume-pricing"].details.map((detail, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg mb-3">Industry Standards</h4>
                        <p className="text-muted-foreground">{benefitDetails["volume-pricing"].industryContext}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg mb-3">Savings Examples</h4>
                        <div className="grid gap-3">
                          {benefitDetails["volume-pricing"].examples.map((example, index) => (
                            <div key={index} className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                              <code className="text-sm">{example}</code>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg">
                        <h4 className="font-semibold mb-2">Value Proposition</h4>
                        <p>{benefitDetails["volume-pricing"].valueProposition}</p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </Card>

            <Card className="card-elevated p-6">
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <Handshake className="text-blue-500" />
                Support Benefits
              </h4>
              <div className="space-y-3 text-sm">
                <Dialog open={benefitDialog === "marketing-materials"} onOpenChange={(open) => setBenefitDialog(open ? "marketing-materials" : null)}>
                  <DialogTrigger asChild>
                    <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-950 rounded-lg cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors">
                      <span>Co-branded marketing materials</span>
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-blue-600">
                        {benefitDetails["marketing-materials"].title}
                      </DialogTitle>
                      <DialogDescription className="text-base">
                        {benefitDetails["marketing-materials"].overview}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-lg mb-3">Marketing Assets</h4>
                        <ul className="space-y-2">
                          {benefitDetails["marketing-materials"].details.map((detail, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg mb-3">Marketing Impact</h4>
                        <p className="text-muted-foreground">{benefitDetails["marketing-materials"].industryContext}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg mb-3">Available Materials</h4>
                        <div className="grid gap-3">
                          {benefitDetails["marketing-materials"].examples.map((example, index) => (
                            <div key={index} className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                              <span className="text-sm">{example}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg">
                        <h4 className="font-semibold mb-2">Value Proposition</h4>
                        <p>{benefitDetails["marketing-materials"].valueProposition}</p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <Dialog open={benefitDialog === "showroom-support"} onOpenChange={(open) => setBenefitDialog(open ? "showroom-support" : null)}>
                  <DialogTrigger asChild>
                    <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-950 rounded-lg cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors">
                      <span>Showroom support</span>
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-blue-600">
                        {benefitDetails["showroom-support"].title}
                      </DialogTitle>
                      <DialogDescription className="text-base">
                        {benefitDetails["showroom-support"].overview}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-lg mb-3">Showroom Features</h4>
                        <ul className="space-y-2">
                          {benefitDetails["showroom-support"].details.map((detail, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg mb-3">Engagement Impact</h4>
                        <p className="text-muted-foreground">{benefitDetails["showroom-support"].industryContext}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg mb-3">Interactive Elements</h4>
                        <div className="grid gap-3">
                          {benefitDetails["showroom-support"].examples.map((example, index) => (
                            <div key={index} className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                              <span className="text-sm">{example}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg">
                        <h4 className="font-semibold mb-2">Value Proposition</h4>
                        <p>{benefitDetails["showroom-support"].valueProposition}</p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <Dialog open={benefitDialog === "sales-training"} onOpenChange={(open) => setBenefitDialog(open ? "sales-training" : null)}>
                  <DialogTrigger asChild>
                    <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-950 rounded-lg cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors">
                      <span>Sales team training</span>
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-blue-600">
                        {benefitDetails["sales-training"].title}
                      </DialogTitle>
                      <DialogDescription className="text-base">
                        {benefitDetails["sales-training"].overview}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-lg mb-3">Training Components</h4>
                        <ul className="space-y-2">
                          {benefitDetails["sales-training"].details.map((detail, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg mb-3">Performance Impact</h4>
                        <p className="text-muted-foreground">{benefitDetails["sales-training"].industryContext}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg mb-3">Training Topics</h4>
                        <div className="grid gap-3">
                          {benefitDetails["sales-training"].examples.map((example, index) => (
                            <div key={index} className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                              <span className="text-sm">{example}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg">
                        <h4 className="font-semibold mb-2">Value Proposition</h4>
                        <p>{benefitDetails["sales-training"].valueProposition}</p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <Dialog open={benefitDialog === "technical-support"} onOpenChange={(open) => setBenefitDialog(open ? "technical-support" : null)}>
                  <DialogTrigger asChild>
                    <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-950 rounded-lg cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors">
                      <span>24/7 technical support</span>
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-blue-600">
                        {benefitDetails["technical-support"].title}
                      </DialogTitle>
                      <DialogDescription className="text-base">
                        {benefitDetails["technical-support"].overview}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-lg mb-3">Support Features</h4>
                        <ul className="space-y-2">
                          {benefitDetails["technical-support"].details.map((detail, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg mb-3">Issue Resolution</h4>
                        <p className="text-muted-foreground">{benefitDetails["technical-support"].industryContext}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg mb-3">Support Services</h4>
                        <div className="grid gap-3">
                          {benefitDetails["technical-support"].examples.map((example, index) => (
                            <div key={index} className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                              <span className="text-sm">{example}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg">
                        <h4 className="font-semibold mb-2">Value Proposition</h4>
                        <p>{benefitDetails["technical-support"].valueProposition}</p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
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
                      <p className="text-muted-foreground">Management Consultant, Investment Group Liaison</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <Button 
                    size="lg" 
                    className="w-full text-lg h-14"
                    onClick={() => window.location.href = "tel:+12109958655"}
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Schedule Builder Strategy Session
                  </Button>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2 justify-center">
                      <Phone className="w-4 h-4 text-primary" />
                      <span>(210) 995-8655</span>
                    </div>
                    <div className="flex items-center gap-2 justify-center">
                      <Mail className="w-4 h-4 text-primary" />
                      <span>info@tcltechsolutions.com</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Testimonials Carousel */}
              <div className="pt-8 border-t border-primary/20">
                <h3 className="text-xl font-semibold mb-6 text-center">What Our Builder Partners' Customers Say</h3>
                <div className="max-w-3xl mx-auto">
                  <Carousel className="w-full">
                    <CarouselContent>
                      {testimonials.map((testimonial) => (
                        <CarouselItem key={testimonial.id}>
                          <div className="bg-white/90 dark:bg-gray-800/90 rounded-xl p-6 shadow-lg">
                            <div className="flex items-center mb-3">
                              {renderStars(testimonial.rating)}
                            </div>
                            <blockquote className="text-gray-700 dark:text-gray-300 mb-4 italic">
                              "{testimonial.quote}"
                            </blockquote>
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white">
                                  {testimonial.name}
                                </h4>
                                <div className="inline-block bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">
                                  {testimonial.serviceType}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-xs text-gray-500 mb-1">Verified Customer</div>
                                <div className="flex items-center text-green-600 text-xs">
                                  <div className="w-1.5 h-1.5 bg-green-600 rounded-full mr-1"></div>
                                  Project Completed
                                </div>
                              </div>
                            </div>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-4" />
                    <CarouselNext className="right-4" />
                  </Carousel>
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
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Home className="w-6 h-6" />
              <span className="text-sm font-medium">Home</span>
            </Link>
            <div className="w-px h-6 bg-primary-foreground/30"></div>
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
