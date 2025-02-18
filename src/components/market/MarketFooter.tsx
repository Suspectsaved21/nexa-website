
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

export const MarketFooter = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t("nexa")}</h3>
            <p className="text-base text-gray-500">{t("footer.description")}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">
              {t("footer.quickLinks")}
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/market" className="text-base text-gray-500 hover:text-nexa-600">
                  {t("home")}
                </Link>
              </li>
              <li>
                <Link to="/deals" className="text-base text-gray-500 hover:text-nexa-600">
                  {t("deals")}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-base text-gray-500 hover:text-nexa-600">
                  {t("contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">
              {t("footer.contact")}
            </h3>
            <ul className="mt-4 space-y-4">
              <li className="text-base text-gray-500">
                {t("footer.technicalSupport")}: +32466255891
              </li>
              <li className="text-base text-gray-500">
                {t("footer.email")}: nexsup@nexabelgium.xyz
              </li>
              <li className="text-base text-gray-500">
                {t("footer.location")}: Belgium
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">
              {t("footer.quickLinks")}
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#facebook" className="text-base text-gray-500 hover:text-nexa-600">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#twitter" className="text-base text-gray-500 hover:text-nexa-600">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#instagram" className="text-base text-gray-500 hover:text-nexa-600">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 text-center">
            © {new Date().getFullYear()} Nexa. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
};
