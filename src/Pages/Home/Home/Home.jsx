import React from "react";
import Banner from "../Banner/Banner";
import FeaturedPropertiesCard from "../FeaturedProperties/FeaturedPropertiesCard";
import PopularDestinations from "../PopularDestinations/PopularDestinations";
import WhyChooseUs from "../WhyChooseUs/WhyChooseUs";
import Testimonials from "../Testimonials/Testimonials";
import HowItWorks from "../HowItWorks/HowItWorks";
import BlogSection from "../BlogSection/BlogSection";
import Newsletter from "../Newsletter/Newsletter";
import GuestExperienceSection from "../GuestExperienceSection/GuestExperienceSection.jsx";

// import JourneySection from '../JourneySection/JourneySection';
const Home = () => {
  return (
    <div className="">
      <Banner></Banner>
      <FeaturedPropertiesCard></FeaturedPropertiesCard>
      <PopularDestinations></PopularDestinations>      
      <HowItWorks></HowItWorks>
      <WhyChooseUs></WhyChooseUs>
      <Testimonials></Testimonials>
      <BlogSection></BlogSection>
      <GuestExperienceSection></GuestExperienceSection>
      <Newsletter></Newsletter>
    </div>
  );
};

export default Home;
