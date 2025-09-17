import React from 'react';
import Banner from '../Banner/Banner';
import FeaturedPropertiesCard from '../FeaturedProperties/FeaturedPropertiesCard';
import Explore from '../Explore/Explore';
const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeaturedPropertiesCard></FeaturedPropertiesCard>
            <Explore></Explore>

        </div>
    );
};

export default Home;