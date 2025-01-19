import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { NewsletterSubscription } from "@/components/NewsletterSubscription";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Contact />
      <NewsletterSubscription />
      <FAQ />
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Index;