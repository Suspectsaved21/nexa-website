import React, { createContext, useContext, useState } from "react";

type Language = "en" | "fr";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const translations = {
  en: {
    // Navigation
    "nav.services": "Services",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.faq": "FAQ",

    // Hero
    "hero.title": "Your fastest shopping",
    "hero.subtitle": "solutions in one click",
    "hero.description": "Experience seamless dropshipping and exceptional client satisfaction with our comprehensive business solutions.",
    "hero.getStarted": "Get Started",
    "hero.learnMore": "Learn More",

    // Services
    "services.title": "Services",
    "services.subtitle": "What We Offer",
    "services.description": "Comprehensive business solutions tailored to your needs",
    "services.dropshipping.title": "Dropshipping Solutions",
    "services.dropshipping.description": "Streamlined dropshipping services with reliable suppliers and fast delivery",
    "services.satisfaction.title": "Client Satisfaction",
    "services.satisfaction.description": "Dedicated support team ensuring 100% customer satisfaction",
    "services.support.title": "Technical Support",
    "services.support.description": "24/7 technical assistance at +32466255891",
    "services.quality.title": "Quality Assurance",
    "services.quality.description": "Rigorous quality control for all products and services",
    "services.complaints.title": "Client Complaints",
    "services.complaints.description": "Swift resolution of customer issues with dedicated complaint handling",
    "services.refund.title": "Refund Policy",
    "services.refund.description": "Hassle-free refund process with transparent policies",
    "services.reviews.title": "Product Reviews",
    "services.reviews.description": "Verified customer reviews and ratings for all products",
    "services.customerReviews": "Customer Reviews",
    "services.writeReview": "Write a Review",
    "services.submitReview": "Submit Review",
    "services.reviewPlaceholder": "Share your experience...",

    // About
    "about.title": "About Us",
    "about.subtitle": "Your Business Partner",
    "about.description": "We are committed to delivering excellence in business solutions and technical support",
    "about.location": "Based in Flemalle, Belgium, we are proud to serve the entire Liege region with our comprehensive dropshipping and business solutions.",
    "about.experience": "With years of experience in the industry, we understand the unique challenges businesses face in today's dynamic environment.",
    "about.commitment": "We take pride in our Belgian roots and our commitment to supporting local businesses while providing international-standard services.",

    // Contact
    "contact.title": "Contact Us",
    "contact.subtitle": "Get in Touch",
    "contact.name": "Your Name",
    "contact.email": "Your Email",
    "contact.message": "Your Message",
    "contact.send": "Send Message",
    "contact.support": "Technical Support",
    "contact.office": "Office",
    "contact.messageType": "Message Type",
    "contact.general": "General Inquiry",
    "contact.technical": "Technical Support",
    "contact.complaint": "Complaint",

    // FAQ
    "faq.title": "FAQ",
    "faq.subtitle": "Frequently Asked Questions",
  },
  fr: {
    // Navigation
    "nav.services": "Services",
    "nav.about": "À propos",
    "nav.contact": "Contact",
    "nav.faq": "FAQ",

    // Hero
    "hero.title": "Vos solutions d'achat",
    "hero.subtitle": "les plus rapides en un clic",
    "hero.description": "Découvrez le dropshipping sans effort et une satisfaction client exceptionnelle avec nos solutions commerciales complètes.",
    "hero.getStarted": "Commencer",
    "hero.learnMore": "En savoir plus",

    // Services
    "services.title": "Services",
    "services.subtitle": "Ce que nous offrons",
    "services.description": "Des solutions commerciales complètes adaptées à vos besoins",
    "services.dropshipping.title": "Solutions de Dropshipping",
    "services.dropshipping.description": "Services de dropshipping optimisés avec des fournisseurs fiables et une livraison rapide",
    "services.satisfaction.title": "Satisfaction Client",
    "services.satisfaction.description": "Équipe de support dédiée assurant 100% de satisfaction client",
    "services.support.title": "Support Technique",
    "services.support.description": "Assistance technique 24/7 au +32466255891",
    "services.quality.title": "Assurance Qualité",
    "services.quality.description": "Contrôle qualité rigoureux pour tous les produits et services",
    "services.complaints.title": "Réclamations Clients",
    "services.complaints.description": "Résolution rapide des problèmes avec gestion dédiée des réclamations",
    "services.refund.title": "Politique de Remboursement",
    "services.refund.description": "Processus de remboursement simple avec des politiques transparentes",
    "services.reviews.title": "Avis Produits",
    "services.reviews.description": "Avis et évaluations clients vérifiés pour tous les produits",
    "services.customerReviews": "Avis Clients",
    "services.writeReview": "Écrire un avis",
    "services.submitReview": "Soumettre l'avis",
    "services.reviewPlaceholder": "Partagez votre expérience...",

    // About
    "about.title": "À propos",
    "about.subtitle": "Votre Partenaire Commercial",
    "about.description": "Nous nous engageons à offrir l'excellence en solutions commerciales et support technique",
    "about.location": "Basés à Flemalle, Belgique, nous sommes fiers de servir toute la région de Liège avec nos solutions complètes de dropshipping.",
    "about.experience": "Avec des années d'expérience dans l'industrie, nous comprenons les défis uniques auxquels les entreprises font face.",
    "about.commitment": "Nous sommes fiers de nos racines belges et de notre engagement à soutenir les entreprises locales.",

    // Contact
    "contact.title": "Contactez-nous",
    "contact.subtitle": "Prenez Contact",
    "contact.name": "Votre Nom",
    "contact.email": "Votre Email",
    "contact.message": "Votre Message",
    "contact.send": "Envoyer",
    "contact.support": "Support Technique",
    "contact.office": "Bureau",
    "contact.messageType": "Type de Message",
    "contact.general": "Demande Générale",
    "contact.technical": "Support Technique",
    "contact.complaint": "Réclamation",

    // FAQ
    "faq.title": "FAQ",
    "faq.subtitle": "Questions Fréquentes",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};