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
import EzRentChatbot from "../../../Components/Chatbot/EzRentChatbot.jsx";
import AIAssistantSection from "../AIAssistantSection/AIAssistantSection.jsx";
import ConversationPreview from "../ConversationPreview/ConversationPreview.jsx";

// import JourneySection from '../JourneySection/JourneySection';
const Home = () => {
  return (
    <div className="">
      <Banner></Banner>
      <FeaturedPropertiesCard></FeaturedPropertiesCard>
      <PopularDestinations></PopularDestinations>
      <HowItWorks></HowItWorks>
      <Testimonials></Testimonials>
      <WhyChooseUs></WhyChooseUs>
      {/* <AIAssistantSection></AIAssistantSection> */}
      <ConversationPreview></ConversationPreview>
      <GuestExperienceSection></GuestExperienceSection>
      <BlogSection></BlogSection>
      <Newsletter></Newsletter>
      <EzRentChatbot></EzRentChatbot>
    </div>
  );
};

export default Home;
