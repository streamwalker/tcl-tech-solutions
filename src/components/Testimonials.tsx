
import { Star, Quote } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      quote: "TCL Tech Solutions transformed our San Antonio home with their innovative smart home automation and wireless upgrades. Their commitment to excellence is truly commendable!",
      name: "Carlos D. — San Antonio, TX",
      serviceType: "Smart Home & Wireless Upgrades",
      rating: 5
    },
    {
      id: 2,
      quote: "The home theater system TCL installed in our Stone Oak home exceeded all my expectations. The Dolby Atmos sound quality is incredible and the Control4 automation makes everything so easy.",
      name: "Earl W. — Stone Oak, San Antonio",
      serviceType: "Home Theater & Audio/Video Setup",
      rating: 5
    },
    {
      id: 3,
      quote: "From design to installation, TCL's custom home theater work in our Alamo Ranch home is outstanding. They really know how to create an amazing 4K entertainment experience with Savant integration.",
      name: "Brian M. — Alamo Ranch, San Antonio",
      serviceType: "Custom Home Theater Design & Installation",
      rating: 5
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real experiences from San Antonio homeowners who've transformed their homes with our smart technology solutions.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Carousel className="w-full">
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id}>
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 relative">
                    {/* Quote icon */}
                    <div className="absolute -top-4 left-8">
                      <div className="bg-blue-600 rounded-full p-3">
                        <Quote className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    <div className="pt-6">
                      {/* Rating */}
                      <div className="flex items-center mb-4">
                        {renderStars(testimonial.rating)}
                      </div>

                      {/* Quote */}
                      <blockquote className="text-lg text-gray-800 mb-6 leading-relaxed italic">
                        "{testimonial.quote}"
                      </blockquote>

                      {/* Customer info */}
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-1">
                            {testimonial.name}
                          </h4>
                          <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                            {testimonial.serviceType}
                          </div>
                        </div>
                        
                        {/* Trust indicator */}
                        <div className="text-right">
                          <div className="text-sm text-gray-500 mb-1">Verified Customer</div>
                          <div className="flex items-center text-green-600 text-sm">
                            <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                            Project Completed
                          </div>
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

        {/* Call to action */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Join Our Happy Customers?</h3>
            <p className="text-lg mb-6 opacity-90">
              Experience the same level of excellence and innovation that Carlos and our other customers have enjoyed.
            </p>
            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">5.0★</div>
                <div className="text-sm opacity-80">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">15+</div>
                <div className="text-sm opacity-80">Homes Transformed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">100%</div>
                <div className="text-sm opacity-80">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
