
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: 'Smart Home Automation',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

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
      details: ["info@tcltechsolutions.com"],
      link: "mailto:info@tcltechsolutions.com"
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Basic form validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      setSubmitMessage('Please fill in all required fields.');
      setIsSubmitting(false);
      return;
    }

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitMessage('Thank you for your message! We\'ll get back to you within 24 hours.');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        service: 'Smart Home Automation',
        message: ''
      });
    } catch (error) {
      setSubmitMessage('There was an error sending your message. Please try again or call us directly.');
    }
    
    setIsSubmitting(false);
  };

  const handlePhoneCall = () => {
    window.location.href = "tel:+12109958655";
  };

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
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <Input 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="John" 
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <Input 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Doe" 
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <Input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com" 
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <Input 
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Your phone number" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Interest
                </label>
                <select 
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
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
                  Message *
                </label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  placeholder="Tell us about your smart home project..."
                  required
                ></textarea>
              </div>
              
              {submitMessage && (
                <div className={`p-3 rounded-md ${submitMessage.includes('error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                  {submitMessage}
                </div>
              )}
              
              <Button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
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
              <Button 
                variant="outline" 
                className="bg-white text-blue-600 hover:bg-gray-100 border-white"
                onClick={handlePhoneCall}
              >
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
