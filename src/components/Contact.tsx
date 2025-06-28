import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["(210) 995-8655"],
      link: "tel:+12109958655"
    },
    {
      icon: Mail,
      title: "Email",
      details: ["theconnectedlifestyletech@gmail.com"],
      link: "mailto:theconnectedlifestyletech@gmail.com"
    },
    {
      icon: MapPin,
      title: "Office",
      details: ["7634 Goldstrike Drive", "San Antonio, TX 78254"],
      link: "https://maps.google.com/?q=7634+Goldstrike+Drive+San+Antonio+TX+78254"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon - Fri: 8:00 AM - 6:00 PM CST", "Sat: 9:00 AM - 2:00 PM CST"],
      link: null
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to transform your home with smart technology? Contact us for a free consultation 
            and discover how we can automate your San Antonio home.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <Input placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <Input placeholder="Doe" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <Input type="email" placeholder="john@example.com" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <Input placeholder="Your phone number" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Interest
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Smart Home Automation</option>
                  <option>Enterprise Networks</option>
                  <option>Home Theater Technology</option>
                  <option>AI Logic Integration</option>
                  <option>Managed Services</option>
                  <option>Premium Installations</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  placeholder="Tell us about your smart home project..."
                ></textarea>
              </div>
              
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3">
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Contact Information</h3>
            <div className="space-y-8">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="bg-blue-100 rounded-lg p-3 flex items-center justify-center">
                    <info.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">{info.title}</h4>
                    {info.details.map((detail, detailIndex) => (
                      <p key={detailIndex} className="text-gray-600">
                        {info.link ? (
                          <a href={info.link} className="hover:text-blue-600 transition-colors">
                            {detail}
                          </a>
                        ) : (
                          detail
                        )}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Box */}
            <div className="mt-12 bg-blue-600 rounded-2xl p-8 text-white">
              <h4 className="text-xl font-bold mb-4">Ready to Get Started?</h4>
              <p className="mb-6">
                Schedule a free consultation with our smart home experts. We'll assess your 
                current setup and provide recommendations tailored to your home automation needs.
              </p>
              <Button variant="outline" className="bg-white text-blue-600 hover:bg-gray-100 border-white">
                Schedule Consultation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
