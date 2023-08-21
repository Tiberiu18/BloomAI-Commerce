import React from "react";
import Header from "./../components/Header";
import ShopSection from "./../components/homeComponents/ShopSection";
import ContactInfo from "./../components/homeComponents/ContactInfo";
import CalltoActionSection from "./../components/homeComponents/CalltoActionSection";
import Footer from "./../components/Footer";
import SuggestionSection from "../components/homeComponents/SuggestionSection";

const AllProductsScreen = ({match}) => {
  window.scrollTo(0, 0);

  const keyword = match.params.keyword;
  const pagenumber = match.params.pageNumber;


  return (
    <div>
      <Header />
      <ShopSection keyword={keyword} pagenumber={pagenumber} />
      <SuggestionSection />
      <Footer />
    </div>
  );
};

export default AllProductsScreen;
