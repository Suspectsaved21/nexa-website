import { CheckCircle2 } from "lucide-react";

export const Services = () => {
  const services = [
    {
      title: "Business Consulting",
      description: "Strategic guidance for your business growth and success",
    },
    {
      title: "Technical Support",
      description: "24/7 technical assistance for all your business needs",
    },
    {
      title: "Custom Solutions",
      description: "Tailored solutions designed specifically for your business",
    },
    {
      title: "Quality Assurance",
      description: "Ensuring the highest standards in all our services",
    },
  ];

  return (
    <div id="services" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-business-600 font-semibold tracking-wide uppercase">Services</h2>
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
                    <CheckCircle2 className="h-6 w-6 text-business-600" />
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
      </div>
    </div>
  );
};