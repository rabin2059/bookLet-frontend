import React from "react";
import HeroSection from "../../components/user/home/HeroSection";
import BookSection from "../../components/user/home/BookSection";
import GenreSection from "../../components/user/home/GenreSection";
import DealSection from "../../components/user/home/DealSection";

const Home = () => {
  return (
      <>
    <div className="bg-web-background px-24">
      <HeroSection />
      <GenreSection />
      <BookSection />

      <DealSection />
    </div>
      </>
  );
};

export default Home;
