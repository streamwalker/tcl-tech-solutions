
import { CheckCircle, Award, Users, Globe, Shield, Lightbulb, Camera, Volume2, Home, Zap, Star, Target, Info, ExternalLink, Mic, Film, Music } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const About = () => {
  const stats = [
    { number: "15+", label: "Smart Homes Installed" },
    { number: "22+", label: "Years Military Experience" },
    { number: "2024", label: "Founded in San Antonio" },
    { number: "24/7", label: "Support Available" }
  ];

  const certifications = [
    {
      icon: Lightbulb,
      title: "Lutron RadioRA 3 Certified",
      description: "Advanced lighting and shading control mastery, enabling energy efficiency, elegance, and personalized comfort in every project.",
      benefit: "Lets us craft advanced lighting and shading systems that blend elegance, efficiency, and total comfort — dialing in the perfect scene for every room and time of day.",
      url: "https://www.lutron.com/en-US/Pages/default.aspx"
    },
    {
      icon: Volume2,
      title: "URC Dealer – HAP Certified",
      description: "Expertise in URC's Home Automation Platform ensuring seamless integration of entertainment, climate, and security systems.",
      benefit: "As a URC dealer, we design streamlined control systems that unify entertainment, climate, and security under one simple interface your family can actually use.",
      url: "https://www.urc-automation.com/"
    },
    {
      icon: Star,
      title: "Savant Certified",
      description: "Leverages Savant's luxury automation platform to craft high-performance, personalized experiences across audio, video, and environmental systems.",
      benefit: "We deliver luxury automation experiences with personalized scenes and high-performance integration across lighting, audio, and video environments.",
      url: "https://www.savant.com/"
    },
    {
      icon: Camera,
      title: "IC Realtime Certified",
      description: "Designs and deploys enterprise-grade surveillance solutions that deliver crystal-clear monitoring and uncompromising security.",
      benefit: "Ensures enterprise-grade surveillance and security for your property — crystal-clear monitoring and true peace of mind, day or night.",
      url: "https://icrealtime.com/"
    },
    {
      icon: Zap,
      title: "RTI Certified",
      description: "Advanced training in RTI automation systems, creating customized control environments for residential and commercial applications.",
      benefit: "Allows us to create custom, intuitive control solutions for both residential and commercial environments — one remote, one app, everything at your fingertips.",
      url: "https://www.rticorp.com/"
    },
    {
      icon: Mic,
      title: "Josh AI Designer & Programmer",
      description: "Certified to design and program Josh.ai voice-first ecosystems where every device communicates seamlessly and scales with your home.",
      benefit: "We build cohesive, voice-controlled ecosystems where every device communicates seamlessly — a natural-language interface for your entire home, scalable for the future.",
      url: "https://www.josh.ai/"
    },
    {
      icon: Film,
      title: "Kaleidescape Authorized Dealer",
      description: "Authorized to specify, sell, and install Kaleidescape reference cinema movie systems for uncompromising picture and sound.",
      benefit: "Gives clients access to the world's finest reference-quality movie playback — lossless audio and reference video that outperforms every streaming service.",
      url: "https://www.kaleidescape.com/"
    },
    {
      icon: Music,
      title: "Juke Audio Authorized Dealer",
      description: "Authorized dealer for Juke Audio multi-room amplifiers and streaming distribution platforms.",
      benefit: "Enables affordable, high-fidelity whole-home audio distribution — every zone, every streaming service, controlled from one app.",
      url: "https://jukeaudio.com/"
    },
    {
      icon: Target,
      title: "Certified Home Theater Designer & Calibrator",
      description: "Precision in theater design and calibration ensuring cinema-quality sound and visuals for immersive experiences.",
      benefit: "We design and calibrate systems that perform flawlessly and evolve with the demands of modern living — true cinema quality, engineered for your room."
    }
  ];

  const values = [
    {
      icon: Award,
      title: "Veteran Discipline",
      description: "Military precision and attention to detail in every installation and service call."
    },
    {
      icon: Users,
      title: "Customer Obsession",
      description: "We work closely with clients as trusted partners, delivering personalized smart home experiences."
    },
    {
      icon: Globe,
      title: "Innovation at Speed",
      description: "We stay ahead of smart home trends with proprietary AI logic and cutting-edge integration."
    }
  ];

  return (
    <section id="about" className="py-20 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            About The Connected Lifestyle
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Founded by Damon Jackson, a highly credentialed smart home and commercial automation expert 
            with a proven track record of designing and delivering cutting-edge connected environments.
          </p>
        </div>

        {/* Damon Jackson Profile Section */}
        <div className="bg-card rounded-2xl p-8 mb-16 shadow-lg">
          <div className="grid lg:grid-cols-3 gap-8 items-center">
            <div className="text-center lg:text-left">
              <div className="w-32 h-32 mx-auto lg:mx-0 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Award className="w-16 h-16 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Damon Jackson</h3>
              <p className="text-lg text-primary font-semibold mb-2">Founder and CEO</p>
              <p className="text-muted-foreground">
                22-year U.S. Air Force veteran with B.S. in Network & Communications Management
              </p>
            </div>
            
            <div className="lg:col-span-2 space-y-4">
              <p className="text-lg leading-relaxed">
                Damon Jackson is a highly credentialed smart home and commercial automation expert with 
                a proven track record of designing and delivering cutting-edge connected environments. 
                His industry certifications span the most advanced platforms and technologies, allowing 
                him to provide clients with solutions that are both innovative and reliable.
              </p>
              
              <p className="text-base leading-relaxed text-muted-foreground">
                Through his extensive certifications, Damon offers clients the confidence that every 
                installation is backed by the highest standards of technical knowledge and craftsmanship. 
                At The Connected Lifestyle, he combines technical expertise with a vision for innovation—transforming 
                ordinary spaces into intelligent environments that enhance everyday living.
              </p>
            </div>
          </div>
        </div>

        {/* Founder's Keynote Speech */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-8">Founder's Keynote Speech</h3>
          <div className="bg-card rounded-2xl overflow-hidden shadow-lg max-w-4xl mx-auto">
            <video
              controls
              className="w-full aspect-video"
              preload="metadata"
            >
              <source src="/videos/TCL_CEO_Keynote_Speech.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="p-6">
              <p className="text-lg font-semibold mb-2">Damon Jackson — CEO, TCL Tech Solutions</p>
              <p className="text-muted-foreground leading-relaxed">
                In this keynote, Damon shares his vision for the future of smart home technology in San Antonio, 
                drawing on over two decades of military leadership and hands-on automation expertise to outline 
                how The Connected Lifestyle is redefining modern living through innovation, precision, and service.
              </p>
            </div>
          </div>
        </div>

        {/* Professional Certifications */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12">Professional Certifications</h3>
          <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-10">
            Our certifications are more than credentials — they are proof of our ability to deliver reliable, cutting-edge
            solutions that elevate how our clients live, work, and entertain. Hover any certification to see the customer benefit.
          </p>
          <TooltipProvider delayDuration={150}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((cert, index) => (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <a
                      href={cert.url ?? "#"}
                      target={cert.url ? "_blank" : undefined}
                      rel={cert.url ? "noopener noreferrer" : undefined}
                      className="group block bg-card rounded-xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-0.5 hover:ring-2 hover:ring-primary/40 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      aria-label={`${cert.title} — hover for details`}
                    >
                      <div className="flex items-start space-x-4">
                        <div className="bg-primary/10 rounded-lg p-3 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                          <cert.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h4 className="text-lg font-semibold group-hover:text-primary transition-colors">
                              {cert.title}
                            </h4>
                            <div className="flex items-center gap-1 text-muted-foreground shrink-0">
                              <Info className="w-4 h-4" aria-hidden="true" />
                              {cert.url && <ExternalLink className="w-4 h-4" aria-hidden="true" />}
                            </div>
                          </div>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {cert.description}
                          </p>
                        </div>
                      </div>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-xs text-sm leading-relaxed">
                    <p className="font-semibold text-primary mb-1">What this means for you</p>
                    <p>{cert.benefit}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </TooltipProvider>
        </div>

        {/* Company Overview */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left content */}
          <div>
            <h3 className="text-3xl font-bold mb-6">Company Overview</h3>
            
            <p className="text-lg mb-6 leading-relaxed">
              Founded in 2024, The Connected Lifestyle is San Antonio's premier smart home integration 
              company. We specialize in transforming homes with intelligent automation systems, 
              integrating enterprise-grade networks, and custom theater systems enhanced by 
              proprietary AI logic.
            </p>
            
            <p className="text-lg mb-8 leading-relaxed">
              We've completed over 15 smart home installations with our authorized dealer partnerships 
              including URC, AVA Cinema, Savant, RTI, and Lutron RadioRA3, ensuring access 
              to professional-grade equipment at competitive prices.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Veteran Leadership</h4>
                  <p className="text-muted-foreground">22 years of Air Force experience bringing discipline and precision</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Local Expertise</h4>
                  <p className="text-muted-foreground">Deep knowledge of San Antonio market and builder partnerships</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">AI-Enhanced Systems</h4>
                  <p className="text-muted-foreground">Proprietary logic that learns and adapts to your lifestyle</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right content - Values */}
          <div>
            <h3 className="text-2xl font-bold mb-8">Our Core Values</h3>
            <div className="space-y-6">
              {values.map((value, index) => (
                <div key={index} className="bg-card rounded-xl p-6 shadow-sm">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 rounded-lg p-3 flex items-center justify-center flex-shrink-0">
                      <value.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-2">
                        {value.title}
                      </h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl p-6">
              <h4 className="text-lg font-semibold mb-3">
                Our Competitive Advantages
              </h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Integrated solutions combining networking, automation, and entertainment</li>
                <li>• Rapid 2.5-day installation window with 24-hour support SLA</li>
                <li>• Customization for each client's unique lifestyle and preferences</li>
                <li>• Proactive monitoring and predictive maintenance</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
