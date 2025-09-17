import React from 'react';
import Banner from '../Banner/Banner';
import FeaturedPropertiesCard from '../FeaturedProperties/FeaturedPropertiesCard';
import Explore from '../Explore/Explore';
import Offers from '../Offers/Offers';
import Review from '../Revieew/Review';
import AboutCompany from '../Company/AboutCompany';
import JourneySection from '../JourneySection/JourneySection';
const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeaturedPropertiesCard></FeaturedPropertiesCard>
            <Offers></Offers>
            <Explore></Explore>
            <Review></Review>
            <AboutCompany></AboutCompany>
            {/* <JourneySection></JourneySection> */}
        </div>
    );
};

export default Home;