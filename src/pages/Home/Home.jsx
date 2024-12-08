import { Helmet } from "react-helmet-async";
import AboutWorldPass from "../../components/AboutWorldPass/AboutWorldPass";
import Banner from "../../components/Banner/Banner";
import Faq from "../../components/Faq/Faq";
import LatestVisas from "../../components/LatestVisas/LatestVisas";
import Services from "../../components/Services/Services";
import WhyChoose from "../../components/WhyChoose/WhyChoose";

const Home = () => {
  return (
    <div className="px-0">
      {/* Dynamic Title */}
      <Helmet>
        <title>World Pass Express | Home</title>
      </Helmet>

      {/* Banner */}
      <Banner />

      {/* About World Pass */}
      <AboutWorldPass />

      {/* Latest Visas */}
      <LatestVisas />

      {/* Services */}
      <Services />

      {/* Why Choose */}
      <WhyChoose />

      {/* Faq Section */}
      <Faq />
    </div>
  );
};

export default Home;
