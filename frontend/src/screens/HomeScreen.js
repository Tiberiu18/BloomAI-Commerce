import React from "react";
import Header from "./../components/Header";
import ContactInfo from "./../components/homeComponents/ContactInfo";
import CalltoActionSection from "./../components/homeComponents/CalltoActionSection";
import Footer from "./../components/Footer";
import BestSellers from "./../components/homeComponents/BestSellers";

const HomeScreen = ({match}) => {
  window.scrollTo(0, 0);

  const keyword = match.params.keyword;
  const pagenumber = match.params.pageNumber;


  return (
    <div>
      <Header />
      <BestSellers keyword={keyword} pagenumber={pagenumber} />
      <CalltoActionSection />
      <ContactInfo />
      <Footer />
    </div>
  );
};

export default HomeScreen;
