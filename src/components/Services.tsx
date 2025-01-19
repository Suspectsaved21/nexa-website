import { Package, Star, CheckCircle2, ThumbsUp } from "lucide-react";

export const Services = () => {
  const services = [
    {
      title: "Dropshipping Solutions",
      description: "Streamlined dropshipping services with reliable suppliers and fast delivery",
      icon: Package,
    },
    {
      title: "Client Satisfaction",
      description: "Dedicated support team ensuring 100% customer satisfaction",
      icon: ThumbsUp,
    },
    {
      title: "Technical Support",
      description: "24/7 technical assistance at +32466255891",
      icon: CheckCircle2,
    },
    {
      title: "Quality Assurance",
      description: "Rigorous quality control for all products and services",
      icon: Star,
    },
  ];

  return (
    <div id="services" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-nexa-600 font-semibold tracking-wide uppercase">Services</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            What We Offer
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Comprehensive business solutions tailored to your needs
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <div key={index} className="relative">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <service.icon className="h-6 w-6 text-nexa-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{service.title}</h3>
                    <p className="mt-2 text-base text-gray-500">{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-center mb-8">Customer Reviews</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      className={`h-5 w-5 ${starIndex < 4 ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Excellent service! The dropshipping process was seamless and the support team was incredibly helpful."
                </p>
                <p className="font-semibold text-nexa-600">- Happy Customer {index + 1}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};