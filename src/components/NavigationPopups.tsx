import { Button } from "@/components/ui/button";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { handleContactClick } from "@/utils/smoothScroll";
import { Users, Building, MapPin, FileText, MessageCircle, Star, Shield, Check, Clock, Cog, Home, Database, Smartphone, BarChart } from "lucide-react";

export const CompanyPopups = {
  AboutUsPopup: () => (
    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 text-2xl">
          <Building className="h-6 w-6" />
          About ConnectTek
        </DialogTitle>
      </DialogHeader>
      
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
            <p className="text-muted-foreground mb-4">
              ConnectTek revolutionizes how businesses and homeowners interact with technology. 
              We design, install, and maintain cutting-edge smart systems that enhance productivity, 
              security, and quality of life.
            </p>
            
            <h3 className="text-xl font-semibold mb-3">Core Values</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                Innovation-driven solutions
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                Veteran-owned excellence
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                24/7 dedicated support
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                Security-first approach
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-3">Why Choose ConnectTek?</h3>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Veteran Leadership</h4>
                <p className="text-sm text-muted-foreground">
                  Led by military veterans with discipline, integrity, and commitment to excellence.
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Cutting-Edge Technology</h4>
                <p className="text-sm text-muted-foreground">
                  Proprietary AI systems and partnerships with industry leaders.
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Comprehensive Solutions</h4>
                <p className="text-sm text-muted-foreground">
                  From design to installation to ongoing support - we handle it all.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t pt-6">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Projects Completed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Support Available</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">98%</div>
              <div className="text-sm text-muted-foreground">Client Satisfaction</div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center pt-4">
          <Button onClick={handleContactClick} size="lg">
            Schedule Your Consultation
          </Button>
        </div>
      </div>
    </DialogContent>
  ),

  ContactPopup: () => (
    <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 text-2xl">
          <MessageCircle className="h-6 w-6" />
          Contact ConnectTek
        </DialogTitle>
      </DialogHeader>
      
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-4">Get In Touch</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MessageCircle className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-semibold">(210) 555-TECH</div>
                  <div className="text-sm text-muted-foreground">24/7 Support Line</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-semibold">info@connectek.com</div>
                  <div className="text-sm text-muted-foreground">General Inquiries</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-1" />
                <div>
                  <div className="font-semibold">San Antonio, TX</div>
                  <div className="text-sm text-muted-foreground">
                    Serving Greater San Antonio<br/>
                    & South Texas Region
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="font-semibold mb-3">Business Hours</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span>7:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span>8:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span>Emergency Service Only</span>
                </div>
                <div className="text-primary font-semibold mt-2">
                  24/7 Emergency Support Available
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Contact</h3>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Emergency Support
                </h4>
                <p className="text-sm text-muted-foreground mb-2">
                  System down? We're here to help 24/7.
                </p>
                <Button variant="outline" size="sm" onClick={handleContactClick}>
                  Call Emergency Line
                </Button>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Free Consultation
                </h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Schedule a free site assessment and quote.
                </p>
                <Button variant="outline" size="sm" onClick={handleContactClick}>
                  Book Consultation
                </Button>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Project Inquiry
                </h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Ready to start your smart technology project?
                </p>
                <Button variant="outline" size="sm" onClick={handleContactClick}>
                  Get Project Quote
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t pt-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Ready to Get Started?</h3>
            <p className="text-muted-foreground mb-4">
              Let's discuss how ConnectTek can transform your space with smart technology solutions.
            </p>
            <Button onClick={handleContactClick} size="lg">
              Schedule Your Free Consultation
            </Button>
          </div>
        </div>
      </div>
    </DialogContent>
  ),

  TeamPopup: () => (
    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-3 text-2xl">
          <div className="bg-blue-100 rounded-lg p-2 w-12 h-12 flex items-center justify-center">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
          Our Team
        </DialogTitle>
        <DialogDescription className="text-lg text-gray-600 mt-4">
          Meet the experienced professionals behind TCL Tech Solutions, bringing decades of expertise in technology integration and smart home automation.
        </DialogDescription>
      </DialogHeader>

      <div className="mt-6 space-y-6">
        {/* Leadership */}
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-blue-900 mb-4">Leadership Team</h3>
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold text-gray-900">Damon Jackson</h4>
              <p className="text-blue-600 font-medium">Founder & CEO</p>
              <p className="text-gray-600 text-sm mt-2">
                20+ years experience in smart home technology and business development. Expert in Control4, Lutron, and enterprise network solutions.
              </p>
            </div>
          </div>
        </div>

        {/* Core Team */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Core Team Expertise</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Technical Specialists</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Certified Control4 installers</li>
                <li>• Lutron RadioRA2 specialists</li>
                <li>• Network security experts</li>
                <li>• Audio/video engineers</li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Support Team</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Project managers</li>
                <li>• Customer success specialists</li>
                <li>• 24/7 monitoring technicians</li>
                <li>• Field service engineers</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 text-center">
          <h4 className="font-semibold text-gray-900 mb-2">Ready to Work with Our Team?</h4>
          <p className="text-gray-600 mb-4 text-sm">Schedule a consultation to meet our experts and discuss your project.</p>
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleContactClick}
          >
            Schedule Consultation
          </Button>
        </div>
      </div>
    </DialogContent>
  ),

  CaseStudiesPopup: () => (
    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-3 text-2xl">
          <div className="bg-blue-100 rounded-lg p-2 w-12 h-12 flex items-center justify-center">
            <FileText className="w-6 h-6 text-blue-600" />
          </div>
          Case Studies
        </DialogTitle>
        <DialogDescription className="text-lg text-gray-600 mt-4">
          Explore our successful smart home and technology integration projects across San Antonio.
        </DialogDescription>
      </DialogHeader>

      <div className="mt-6 space-y-6">
        {/* Featured Case Studies */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="bg-blue-100 rounded-lg p-3 w-12 h-12 mb-4 flex items-center justify-center">
              <Building className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Luxury Estate Automation</h4>
            <p className="text-gray-600 text-sm mb-3">
              Complete whole-home automation for 8,500 sq ft estate including lighting, climate, security, and entertainment systems.
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Control4</span>
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Lutron</span>
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Savant</span>
            </div>
            <p className="text-gray-500 text-xs">Project Value: $85,000 | Timeline: 4 months</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <div className="bg-green-100 rounded-lg p-3 w-12 h-12 mb-4 flex items-center justify-center">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Enterprise Network Upgrade</h4>
            <p className="text-gray-600 text-sm mb-3">
              Deployed enterprise-grade networking infrastructure for small business with 50+ employees and guest access.
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Ubiquiti</span>
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">SonicWall</span>
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">24/7 Monitoring</span>
            </div>
            <p className="text-gray-500 text-xs">Project Value: $15,000 | Timeline: 2 weeks</p>
          </div>
        </div>

        {/* Results & Metrics */}
        <div className="bg-blue-50 rounded-lg p-6">
          <h4 className="font-semibold text-blue-900 mb-4 flex items-center gap-2">
            <Star className="w-4 h-4" />
            Project Success Metrics
          </h4>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">98%</div>
              <div className="text-sm text-gray-600">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">50+</div>
              <div className="text-sm text-gray-600">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">24/7</div>
              <div className="text-sm text-gray-600">Support Available</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 text-center">
          <h4 className="font-semibold text-gray-900 mb-2">Start Your Success Story</h4>
          <p className="text-gray-600 mb-4 text-sm">Let's discuss how we can create a custom solution for your project.</p>
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleContactClick}
          >
            Get Project Quote
          </Button>
        </div>
      </div>
    </DialogContent>
  ),

  ServiceAreasPopup: () => (
    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-3 text-2xl">
          <div className="bg-blue-100 rounded-lg p-2 w-12 h-12 flex items-center justify-center">
            <MapPin className="w-6 h-6 text-blue-600" />
          </div>
          Service Areas
        </DialogTitle>
        <DialogDescription className="text-lg text-gray-600 mt-4">
          TCL Tech Solutions proudly serves San Antonio and surrounding areas with comprehensive smart home and technology integration services.
        </DialogDescription>
      </DialogHeader>

      <div className="mt-6 space-y-6">
        {/* Primary Service Areas */}
        <div className="bg-blue-50 rounded-lg p-6">
          <h4 className="font-semibold text-blue-900 mb-4">Primary Service Areas</h4>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4">
              <h5 className="font-semibold text-gray-900 mb-2">Zip Code 78245</h5>
              <p className="text-gray-600 text-sm">Partnerships with Coventry, Lennar, and Perry Homes</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h5 className="font-semibold text-gray-900 mb-2">Zip Code 78253</h5>
              <p className="text-gray-600 text-sm">New construction and luxury estates</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h5 className="font-semibold text-gray-900 mb-2">Zip Code 78254</h5>
              <p className="text-gray-600 text-sm">Established neighborhoods and retrofits</p>
            </div>
          </div>
        </div>

        {/* Service Capabilities */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-4">What We Serve</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-gray-700">Residential Properties</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-gray-700">Luxury Estates</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-gray-700">New Construction</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-gray-700">Small Businesses</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-gray-700">Home Retrofits</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-gray-700">Commercial Offices</span>
              </div>
            </div>
          </div>
        </div>

        {/* Response Times */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-600" />
            Service Response Times
          </h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium text-gray-900">Emergency Support</h5>
              <p className="text-gray-600 text-sm">Within 4 hours for critical system failures</p>
            </div>
            <div>
              <h5 className="font-medium text-gray-900">Routine Service</h5>
              <p className="text-gray-600 text-sm">Same day or next business day scheduling</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 text-center">
          <h4 className="font-semibold text-gray-900 mb-2">Service Your Area?</h4>
          <p className="text-gray-600 mb-4 text-sm">Contact us to confirm service availability and scheduling in your location.</p>
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleContactClick}
          >
            Check Service Availability
          </Button>
        </div>
      </div>
    </DialogContent>
  ),

  BlogPopup: () => (
    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-3 text-2xl">
          <div className="bg-blue-100 rounded-lg p-2 w-12 h-12 flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-blue-600" />
          </div>
          Blog & Resources
        </DialogTitle>
        <DialogDescription className="text-lg text-gray-600 mt-4">
          Stay informed with the latest smart home technology trends, tips, and industry insights from our experts.
        </DialogDescription>
      </DialogHeader>

      <div className="mt-6 space-y-6">
        {/* Featured Articles */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-4">Featured Articles</h4>
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <h5 className="font-semibold text-gray-900 mb-2">The Future of Home Automation in 2024</h5>
              <p className="text-gray-600 text-sm mb-2">
                Explore the latest trends in AI-powered home automation and how they're transforming modern living spaces.
              </p>
              <span className="text-blue-600 text-xs">Published: Coming Soon</span>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <h5 className="font-semibold text-gray-900 mb-2">Network Security for Smart Homes</h5>
              <p className="text-gray-600 text-sm mb-2">
                Essential security practices to protect your smart home devices from cyber threats and maintain privacy.
              </p>
              <span className="text-blue-600 text-xs">Published: Coming Soon</span>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <h5 className="font-semibold text-gray-900 mb-2">Choosing the Right Home Theater System</h5>
              <p className="text-gray-600 text-sm mb-2">
                A comprehensive guide to designing and implementing the perfect home theater for your space and budget.
              </p>
              <span className="text-blue-600 text-xs">Published: Coming Soon</span>
            </div>
          </div>
        </div>

        {/* Resource Categories */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Resource Categories</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h5 className="font-medium text-gray-900">Technology Guides</h5>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Smart home device comparisons</li>
                <li>• Installation best practices</li>
                <li>• Troubleshooting guides</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h5 className="font-medium text-gray-900">Industry Insights</h5>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Market trends and forecasts</li>
                <li>• Product reviews and testing</li>
                <li>• Expert interviews</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 text-center">
          <h4 className="font-semibold text-gray-900 mb-2">Stay Updated</h4>
          <p className="text-gray-600 mb-4 text-sm">Subscribe to our newsletter for the latest articles and technology updates.</p>
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleContactClick}
          >
            Subscribe to Newsletter
          </Button>
        </div>
      </div>
    </DialogContent>
  ),
};

export const ServicesPopups = {
  SmartHomePopup: () => (
    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-3 text-2xl">
          <div className="bg-blue-100 rounded-lg p-2 w-12 h-12 flex items-center justify-center">
            <Home className="w-6 h-6 text-blue-600" />
          </div>
          Smart Home Automation
        </DialogTitle>
        <DialogDescription className="text-lg text-gray-600 mt-4">
          Transform your home into an intelligent living space that responds to your needs. Our smart home automation integrates all your systems - lighting, climate, security, and entertainment - into one unified experience.
        </DialogDescription>
      </DialogHeader>

      <div className="mt-6 space-y-6">
        {/* Pricing */}
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
            <Star className="w-4 h-4" />
            Pricing Tier
          </h4>
          <p className="text-blue-800">Tier 1: $2k-8k</p>
        </div>

        {/* Extended Features */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Check className="w-4 h-4 text-green-600" />
            Complete Feature Set
          </h4>
          <div className="grid md:grid-cols-2 gap-2">
            {[
              "Automated lighting scenes and schedules",
              "HVAC optimization and remote control", 
              "Integrated security system management",
              "Entertainment system automation",
              "Voice control integration",
              "Mobile app control from anywhere"
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2 text-gray-700">
                <Check className="w-3 h-3 text-green-500 flex-shrink-0" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Brands & Partners */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Shield className="w-4 h-4 text-blue-600" />
            Trusted Brands & Partners
          </h4>
          <div className="flex flex-wrap gap-2">
            {["Control4", "Lutron RadioRA2", "Nest", "Ring", "Sonos"].map((brand, idx) => (
              <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                {brand}
              </span>
            ))}
          </div>
        </div>

        {/* Process & Timeline */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Cog className="w-4 h-4 text-gray-600" />
              Our Process
            </h4>
            <p className="text-gray-700 text-sm">Consultation → Design → Installation → Programming → Training</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-600" />
              Timeline
            </h4>
            <p className="text-gray-700 text-sm">2-4 weeks for complete installation</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 text-center">
          <h4 className="font-semibold text-gray-900 mb-2">Ready to Get Started?</h4>
          <p className="text-gray-600 mb-4 text-sm">Schedule a consultation to discuss your smart home automation needs.</p>
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleContactClick}
          >
            Schedule Consultation
          </Button>
        </div>
      </div>
    </DialogContent>
  ),

  EnterpriseNetworksPopup: () => (
    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-3 text-2xl">
          <div className="bg-blue-100 rounded-lg p-2 w-12 h-12 flex items-center justify-center">
            <Shield className="w-6 h-6 text-blue-600" />
          </div>
          Enterprise Networks
        </DialogTitle>
        <DialogDescription className="text-lg text-gray-600 mt-4">
          Deploy enterprise-grade networking infrastructure in your home or small business. Get the reliability, security, and performance typically reserved for large corporations.
        </DialogDescription>
      </DialogHeader>

      <div className="mt-6 space-y-6">
        {/* Pricing */}
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
            <Star className="w-4 h-4" />
            Pricing Tier
          </h4>
          <p className="text-blue-800">All Tiers</p>
        </div>

        {/* Extended Features */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Check className="w-4 h-4 text-green-600" />
            Complete Feature Set
          </h4>
          <div className="grid md:grid-cols-2 gap-2">
            {[
              "High-performance WiFi 6/6E networks",
              "Network security and firewall protection",
              "Remote access and VPN setup",
              "Network monitoring and analytics",
              "Scalable infrastructure design",
              "24/7 network health monitoring"
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2 text-gray-700">
                <Check className="w-3 h-3 text-green-500 flex-shrink-0" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Brands & Partners */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Shield className="w-4 h-4 text-blue-600" />
            Trusted Brands & Partners
          </h4>
          <div className="flex flex-wrap gap-2">
            {["Ubiquiti", "Cisco", "Aruba", "Ruckus", "SonicWall"].map((brand, idx) => (
              <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                {brand}
              </span>
            ))}
          </div>
        </div>

        {/* Process & Timeline */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Cog className="w-4 h-4 text-gray-600" />
              Our Process
            </h4>
            <p className="text-gray-700 text-sm">Assessment → Design → Installation → Configuration → Monitoring</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-600" />
              Timeline
            </h4>
            <p className="text-gray-700 text-sm">1-2 weeks for deployment</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 text-center">
          <h4 className="font-semibold text-gray-900 mb-2">Ready to Get Started?</h4>
          <p className="text-gray-600 mb-4 text-sm">Schedule a consultation to discuss your enterprise network needs.</p>
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleContactClick}
          >
            Schedule Consultation
          </Button>
        </div>
      </div>
    </DialogContent>
  ),

  // Simplified versions for the remaining services - they follow the same pattern
  HomeTheaterPopup: () => (
    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-3 text-2xl">
          <div className="bg-blue-100 rounded-lg p-2 w-12 h-12 flex items-center justify-center">
            <Database className="w-6 h-6 text-blue-600" />
          </div>
          Home Theater Technology
        </DialogTitle>
        <DialogDescription className="text-lg text-gray-600 mt-4">
          Create the ultimate entertainment experience with custom-designed home theaters. From intimate screening rooms to grand cinema spaces, we deliver professional-grade audio and video.
        </DialogDescription>
      </DialogHeader>

      <div className="mt-6 space-y-6">
        {/* Pricing */}
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
            <Star className="w-4 h-4" />
            Pricing Tier
          </h4>
          <p className="text-blue-800">Tier 2: $5k-15k</p>
        </div>

        {/* Extended Features */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Check className="w-4 h-4 text-green-600" />
            Complete Feature Set
          </h4>
          <div className="grid md:grid-cols-2 gap-2">
            {[
              "Custom acoustic design",
              "4K and Dolby Atmos support",
              "Multi-room audio/video distribution",
              "Lighting and shading integration",
              "Remote control and automation",
              "Streaming service integration"
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2 text-gray-700">
                <Check className="w-3 h-3 text-green-500 flex-shrink-0" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Brands & Partners */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Shield className="w-4 h-4 text-blue-600" />
            Trusted Brands & Partners
          </h4>
          <div className="flex flex-wrap gap-2">
            {["Sony", "Denon", "Bose", "JBL", "Control4"].map((brand, idx) => (
              <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                {brand}
              </span>
            ))}
          </div>
        </div>

        {/* Process & Timeline */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Cog className="w-4 h-4 text-gray-600" />
              Our Process
            </h4>
            <p className="text-gray-700 text-sm">Consultation → Design → Installation → Calibration → Training</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-600" />
              Timeline
            </h4>
            <p className="text-gray-700 text-sm">3-6 weeks for complete setup</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 text-center">
          <h4 className="font-semibold text-gray-900 mb-2">Ready to Experience Cinema Quality?</h4>
          <p className="text-gray-600 mb-4 text-sm">Schedule a consultation to design your custom home theater.</p>
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleContactClick}
          >
            Schedule Consultation
          </Button>
        </div>
      </div>
    </DialogContent>
  ),

  AILogicPopup: () => (
    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-3 text-2xl">
          <div className="bg-blue-100 rounded-lg p-2 w-12 h-12 flex items-center justify-center">
            <Smartphone className="w-6 h-6 text-blue-600" />
          </div>
          AI Logic Integration
        </DialogTitle>
        <DialogDescription className="text-lg text-gray-600 mt-4">
          Experience the future of home automation with our proprietary AI that learns your habits and preferences to create truly intelligent automation scenarios.
        </DialogDescription>
      </DialogHeader>

      <div className="mt-6 space-y-6">
        {/* Pricing */}
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
            <Star className="w-4 h-4" />
            Pricing Tier
          </h4>
          <p className="text-blue-800">Tier 3: Custom Pricing</p>
        </div>

        {/* Extended Features */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Check className="w-4 h-4 text-green-600" />
            Complete Feature Set
          </h4>
          <div className="grid md:grid-cols-2 gap-2">
            {[
              "Machine learning based automation",
              "Behavioral pattern recognition",
              "Adaptive lighting and climate control",
              "Voice and gesture control",
              "Energy optimization",
              "Continuous learning and updates"
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2 text-gray-700">
                <Check className="w-3 h-3 text-green-500 flex-shrink-0" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Brands & Partners */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Shield className="w-4 h-4 text-blue-600" />
            Trusted Brands & Partners
          </h4>
          <div className="flex flex-wrap gap-2">
            {["Google AI", "Amazon Alexa", "Apple HomeKit", "Control4"].map((brand, idx) => (
              <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                {brand}
              </span>
            ))}
          </div>
        </div>

        {/* Process & Timeline */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Cog className="w-4 h-4 text-gray-600" />
              Our Process
            </h4>
            <p className="text-gray-700 text-sm">Consultation → AI Training → Integration → Testing → Optimization</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-600" />
              Timeline
            </h4>
            <p className="text-gray-700 text-sm">4-8 weeks depending on complexity</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 text-center">
          <h4 className="font-semibold text-gray-900 mb-2">Ready to Automate Intelligently?</h4>
          <p className="text-gray-600 mb-4 text-sm">Schedule a consultation to explore AI-powered automation for your home.</p>
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleContactClick}
          >
            Schedule Consultation
          </Button>
        </div>
      </div>
    </DialogContent>
  ),

  ManagedServicesPopup: () => (
    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-3 text-2xl">
          <div className="bg-blue-100 rounded-lg p-2 w-12 h-12 flex items-center justify-center">
            <Cog className="w-6 h-6 text-blue-600" />
          </div>
          Managed Services
        </DialogTitle>
        <DialogDescription className="text-lg text-gray-600 mt-4">
          Ensure your smart home systems operate flawlessly with our comprehensive managed services. Our team monitors, maintains, and optimizes your technology around the clock.
        </DialogDescription>
      </DialogHeader>

      <div className="mt-6 space-y-6">
        {/* Pricing */}
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
            <Star className="w-4 h-4" />
            Pricing Tier
          </h4>
          <p className="text-blue-800">Subscription-based pricing</p>
        </div>

        {/* Extended Features */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Check className="w-4 h-4 text-green-600" />
            Complete Feature Set
          </h4>
          <div className="grid md:grid-cols-2 gap-2">
            {[
              "24/7 system monitoring",
              "Regular software updates",
              "Remote troubleshooting",
              "Priority support",
              "Preventative maintenance",
              "Performance optimization"
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2 text-gray-700">
                <Check className="w-3 h-3 text-green-500 flex-shrink-0" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Brands & Partners */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Shield className="w-4 h-4 text-blue-600" />
            Trusted Brands & Partners
          </h4>
          <div className="flex flex-wrap gap-2">
            {["Control4", "Lutron", "Ubiquiti", "Nest"].map((brand, idx) => (
              <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                {brand}
              </span>
            ))}
          </div>
        </div>

        {/* Process & Timeline */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Cog className="w-4 h-4 text-gray-600" />
              Our Process
            </h4>
            <p className="text-gray-700 text-sm">Onboarding → Monitoring → Maintenance → Support</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-600" />
              Timeline
            </h4>
            <p className="text-gray-700 text-sm">Ongoing service with monthly reporting</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 text-center">
          <h4 className="font-semibold text-gray-900 mb-2">Keep Your Systems Running Smoothly</h4>
          <p className="text-gray-600 mb-4 text-sm">Schedule a consultation to learn about our managed services plans.</p>
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleContactClick}
          >
            Schedule Consultation
          </Button>
        </div>
      </div>
    </DialogContent>
  ),

  PremiumInstallationsPopup: () => (
    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-3 text-2xl">
          <div className="bg-blue-100 rounded-lg p-2 w-12 h-12 flex items-center justify-center">
            <BarChart className="w-6 h-6 text-blue-600" />
          </div>
          Premium Installations
        </DialogTitle>
        <DialogDescription className="text-lg text-gray-600 mt-4">
          Transform luxury estates and high-end properties with comprehensive automation solutions. From whole-home integration to custom entertainment spaces, we deliver premium experiences.
        </DialogDescription>
      </DialogHeader>

      <div className="mt-6 space-y-6">
        {/* Pricing */}
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
            <Star className="w-4 h-4" />
            Pricing Tier
          </h4>
          <p className="text-blue-800">Tier 4: Custom Premium Pricing</p>
        </div>

        {/* Extended Features */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Check className="w-4 h-4 text-green-600" />
            Complete Feature Set
          </h4>
          <div className="grid md:grid-cols-2 gap-2">
            {[
              "Whole-home automation design",
              "Custom entertainment and lighting",
              "Advanced security integration",
              "Luxury climate control",
              "Dedicated support and maintenance",
              "High-end brand partnerships"
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2 text-gray-700">
                <Check className="w-3 h-3 text-green-500 flex-shrink-0" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Brands & Partners */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Shield className="w-4 h-4 text-blue-600" />
            Trusted Brands & Partners
          </h4>
          <div className="flex flex-wrap gap-2">
            {["Control4", "Lutron", "Savant", "Crestron", "Sonos"].map((brand, idx) => (
              <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                {brand}
              </span>
            ))}
          </div>
        </div>

        {/* Process & Timeline */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Cog className="w-4 h-4 text-gray-600" />
              Our Process
            </h4>
            <p className="text-gray-700 text-sm">Consultation → Custom Design → Installation → Fine Tuning → Support</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-600" />
              Timeline
            </h4>
            <p className="text-gray-700 text-sm">6-12 weeks depending on project scope</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 text-center">
          <h4 className="font-semibold text-gray-900 mb-2">Elevate Your Property</h4>
          <p className="text-gray-600 mb-4 text-sm">Schedule a consultation to discuss premium installation options.</p>
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleContactClick}
          >
            Schedule Consultation
          </Button>
        </div>
      </div>
    </DialogContent>
  ),
};
