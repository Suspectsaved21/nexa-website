import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export const FAQ = () => {
  const faqs = [
    {
      question: "What services do you offer?",
      answer: "We offer a comprehensive range of business solutions including technical support, consulting, and custom solutions tailored to your needs.",
    },
    {
      question: "How can I get technical support?",
      answer: "You can reach our technical support team 24/7 at +32466255891 or through our contact form above.",
    },
    {
      question: "What are your business hours?",
      answer: "Our office is open Monday through Friday, 9:00 AM to 6:00 PM CET. However, our technical support is available 24/7.",
    },
    {
      question: "Do you offer custom solutions?",
      answer: "Yes, we specialize in creating custom solutions tailored to your specific business needs and requirements.",
    },
  ];

  return (
    <div id="faq" className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-12">
          <h2 className="text-base text-business-600 font-semibold tracking-wide uppercase">FAQ</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Frequently Asked Questions
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};