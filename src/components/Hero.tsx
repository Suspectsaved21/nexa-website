
import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { IPhonePaymentButton } from "./payment/IPhonePaymentButton";

const Hero: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <section className="min-h-[70vh] w-full bg-hero-pattern bg-cover bg-center py-20 px-4 md:px-10 lg:px-20 flex items-center">
      <div
        className="max-w-4xl mx-auto text-center text-white"
        data-aos="fade-up"
        data-aos-duration="800"
      >
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
          {t("welcome")}
        </h1>
        <p className="text-xl md:text-2xl mb-10">{t("tagLine")}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => navigate("/market")}
            className="text-base px-6 py-3 bg-[#721244] hover:bg-[#5d0f37]"
          >
            {t("shopNow")}
          </Button>
          <IPhonePaymentButton className="text-base px-6 py-3" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
