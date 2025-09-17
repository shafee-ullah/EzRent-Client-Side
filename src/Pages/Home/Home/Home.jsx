import React from 'react';
import Banner from '../Banner/Banner';
import FeaturedPropertiesCard from '../FeaturedProperties/FeaturedPropertiesCard';
import Explore from '../Explore/Explore';
import Offers from '../Offers/Offers';
const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeaturedPropertiesCard></FeaturedPropertiesCard>
            <Offers></Offers>
            <Explore></Explore>


        </div>
    );
};

export default Home;