import { useLanguage } from "@/contexts/LanguageContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export const FAQ = () => {
  const { t } = useLanguage();
  
  const faqs = [
    {
      question: t("faq.questions.services"),
      answer: t("faq.answers.services"),
    },
    {
      question: t("faq.questions.support"),
      answer: t("faq.answers.support"),
    },
    {
      question: t("faq.questions.hours"),
      answer: t("faq.answers.hours"),
    },
    {
      question: t("faq.questions.solutions"),
      answer: t("faq.answers.solutions"),
    },
  ];

  return (
    <div id="faq" className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-12">
          <h2 className="text-base text-business-600 font-semibold tracking-wide uppercase">{t("faq.title")}</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {t("faq.subtitle")}
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