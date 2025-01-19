export const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <span className="text-2xl font-bold text-business-600">BusinessName</span>
            <p className="mt-4 text-gray-500">
              Your trusted partner in business solutions. We provide comprehensive services to help your business grow and succeed.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Quick Links</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#services" className="text-base text-gray-500 hover:text-gray-900">
                  Services
                </a>
              </li>
              <li>
                <a href="#about" className="text-base text-gray-500 hover:text-gray-900">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="text-base text-gray-500 hover:text-gray-900">
                  Contact
                </a>
              </li>
              <li>
                <a href="#faq" className="text-base text-gray-500 hover:text-gray-900">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Contact</h3>
            <ul className="mt-4 space-y-4">
              <li className="text-base text-gray-500">
                Technical Support: +32466255891
              </li>
              <li className="text-base text-gray-500">
                Email: support@yourbusiness.com
              </li>
              <li className="text-base text-gray-500">
                Location: Belgium
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 text-center">
            © {new Date().getFullYear()} BusinessName. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};