import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { MapPin, Star, Heart, Navigation, Users, Calendar } from "lucide-react";

const MotionDiv = motion.div;
const MotionSection = motion.section;

const destinations = [
  {
    name: "Dhaka",
    image: "https://images.unsplash.com/photo-1564034503-e7c9edcb420c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "The bustling capital city blends ancient Mughal heritage with modern development. Experience vibrant street markets, historic mosques, colorful rickshaws, and authentic Bengali cuisine in this energetic metropolis.",
    rating: 4.8,
    reviews: 1247,
    properties: 342,
    price: "From $35/night",
    trending: true,
    categories: ["city", "culture"]
  },
  {
    name: "Cox's Bazar",
    image: "https://images.unsplash.com/photo-1619177383949-f03975e50b19?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Home to the world's longest unbroken natural sea beach stretching 120km. Golden sands, stunning sunsets, fresh seafood, and endless ocean views make it Bangladesh's premier beach destination.",
    rating: 4.9,
    reviews: 892,
    properties: 156,
    price: "From $45/night",
    trending: true,
    categories: ["beach", "nature"]
  },
  {
    name: "Sylhet",
    image: "https://images.unsplash.com/photo-1634962546038-b7eddb268dd7?q=80&w=1152&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "A paradise of rolling tea gardens, cascading waterfalls, and mystical swamp forests. Visit Ratargul, Jaflong, and experience the spiritual atmosphere of numerous shrines dotting the lush landscape.",
    rating: 4.7,
    reviews: 567,
    properties: 89,
    price: "From $28/night",
    trending: false,
    categories: ["nature", "adventure"]
  },
  {
    name: "Chattogram",
    image: "https://images.unsplash.com/photo-1601410928419-3c56069edfb0?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Bangladesh's second-largest city and major port offers diverse attractions from Patenga Beach to scenic hill districts. Gateway to the stunning Bandarban and Rangamati hill tracts with tribal culture.",
    rating: 4.6,
    reviews: 423,
    properties: 134,
    price: "From $32/night",
    trending: true,
    categories: ["city", "beach", "nature"]
  },
  {
    name: "Rajshahi",
    image: "https://as2.ftcdn.net/v2/jpg/02/80/62/11/1000_F_280621126_DQa3AcG5isfDDFNWOHnAb6XAkLptByHF.jpg",
    description: "Known as the 'Silk City,' this cultural hub features ancient archaeological sites including Paharpur Buddhist Vihara, lush mango orchards, and traditional silk weaving heritage spanning centuries.",
    rating: 4.5,
    reviews: 289,
    properties: 76,
    price: "From $25/night",
    trending: false,
    categories: ["city", "culture", "history"]
  },
  {
    name: "Khulna",
    image: "https://media.istockphoto.com/id/2153871770/photo/sixty-dome-mosque-bagerhat-khulna-bangladesh-unesco-world-heritage-site-archaeological-sites.jpg?s=2048x2048&w=is&k=20&c=QT24Kdypi4VFrWA7rVVIEu6kz_3HP_DZYs4gTRo6tP8=",
    description: "Gateway to the magnificent Sundarbans, the world's largest mangrove forest and home to Royal Bengal Tigers. Explore UNESCO heritage sites and embark on unforgettable wildlife adventures.",
    rating: 4.8,
    reviews: 378,
    properties: 67,
    price: "From $30/night",
    trending: true,
    categories: ["nature", "adventure", "wildlife"]
  },
  {
    name: "Bandarban",
    image: "https://images.unsplash.com/photo-1585123388867-3bfe6dd4bdbf?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2001",
    description: "The most picturesque hill district with towering peaks, serene lakes like Boga Lake, Buddhist temples, and indigenous tribal communities. Perfect for trekking, hiking, and mountain adventures.",
    rating: 4.9,
    reviews: 445,
    properties: 52,
    price: "From $22/night",
    trending: true,
    categories: ["nature", "adventure", "mountains"]
  },
  {
    name: "Sundarbans",
    image: "https://plus.unsplash.com/premium_photo-1661866193149-4cb5997e111e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070",
    description: "The world's largest tidal mangrove forest, a UNESCO World Heritage Site. Experience thrilling boat safaris through winding rivers, spot Royal Bengal Tigers, spotted deer, and diverse bird species.",
    rating: 4.9,
    reviews: 512,
    properties: 28,
    price: "From $50/night",
    trending: true,
    categories: ["nature", "wildlife", "adventure"]
  },
  {
    name: "Saint Martin's Island",
    image: "https://images.unsplash.com/photo-1609170587020-b7dea81e6635?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1974",
    description: "Bangladesh's only coral island, a tropical paradise with crystal-clear waters, pristine beaches, and vibrant marine life. Perfect for snorkeling, diving, and experiencing island tranquility.",
    rating: 4.8,
    reviews: 634,
    properties: 45,
    price: "From $40/night",
    trending: true,
    categories: ["beach", "nature", "island"]
  }
];

const DestinationCard = ({ destination, index, isMobile }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <MotionDiv
      initial={!isMobile ? { opacity: 0, y: 50, scale: 0.9 } : false}
      whileInView={!isMobile ? { opacity: 1, y: 0, scale: 1 } : false}
      viewport={!isMobile ? { once: true, amount: 0.3 } : undefined}
      whileHover={!isMobile ? { y: -8, scale: 1.02 } : {}}
      transition={!isMobile ? { duration: 0.5, delay: index * 0.1 } : undefined}
      onHoverStart={() => !isMobile && setIsHovered(true)}
      onHoverEnd={() => !isMobile && setIsHovered(false)}
      className="relative group"
    >
      <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        {/* Image with overlay */}
        <div className="relative w-full h-full overflow-hidden">
          <img
            src={destination.image}
            alt={destination.name}
            className={`w-full h-full object-cover ${!isMobile ? 'transform group-hover:scale-110 transition-transform duration-700' : ''}`}
            loading="lazy"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          {/* Trending Badge - Commented for future use */}
          {/* {destination.trending && (
            <MotionDiv
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.3, type: "spring" }}
              className="absolute top-4 left-4"
            >
              <div className="px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold shadow-lg flex items-center gap-1">
                <Star className="w-3 h-3 fill-current" />
                Trending
              </div>
            </MotionDiv>
          )} */}

          {/* Content Container */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            {!isMobile ? (
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
              >
                {/* Location */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    <span className="font-bold text-xl">{destination.name}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm opacity-90 mb-4 line-clamp-3 leading-relaxed">
                  {destination.description}
                </p>

                {/* CTA Button */}
                {/* <div className="flex items-center justify-end">
                  <MotionDiv
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <button className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-green-500 backdrop-blur-sm rounded-full text-sm font-semibold hover:from-emerald-600 hover:to-green-600 transition-all duration-300 shadow-lg flex items-center gap-2">
                      Explore Now
                      <Navigation className="w-4 h-4" />
                    </button>
                  </MotionDiv>
                </div> */}
              </MotionDiv>
            ) : (
              <div>
                {/* Location */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    <span className="font-bold text-xl">{destination.name}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm opacity-90 mb-4 line-clamp-3 leading-relaxed">
                  {destination.description}
                </p>

                {/* CTA Button */}
                <div className="flex items-center justify-end">
                  <button className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-green-500 backdrop-blur-sm rounded-full text-sm font-semibold shadow-lg flex items-center gap-2">
                    Explore Now
                    <Navigation className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Hover Effect Layer */}
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-green-500/10"
          />
        </div>
      </div>
    </MotionDiv>
  );
};

const PopularDestinations = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  // Dynamically generate filters based on destination categories
  const filters = useMemo(() => {
    const categoryCount = {};
    
    destinations.forEach(dest => {
      dest.categories.forEach(cat => {
        categoryCount[cat] = (categoryCount[cat] || 0) + 1;
      });
    });

    const filterList = [
      { id: "all", label: "All Destinations", count: destinations.length }
    ];

    // Trending filter - commented for future use
    // const trendingCount = destinations.filter(d => d.trending).length;
    // if (trendingCount > 0) {
    //   filterList.push({ id: "trending", label: "Trending", count: trendingCount });
    // }

    // Add category filters
    const categoryLabels = {
      beach: "Beach",
      city: "City",
      nature: "Nature",
      culture: "Culture",
      adventure: "Adventure",
      wildlife: "Wildlife",
      history: "History",
      mountains: "Mountains",
      island: "Island"
    };

    Object.entries(categoryCount).forEach(([category, count]) => {
      filterList.push({
        id: category,
        label: categoryLabels[category] || category,
        count: count
      });
    });

    return filterList;
  }, []);

  // Filter destinations based on active filter
  const filteredDestinations = useMemo(() => {
    if (activeFilter === "all") {
      return destinations;
    }
    // Trending filter - commented for future use
    // if (activeFilter === "trending") {
    //   return destinations.filter(d => d.trending);
    // }
    return destinations.filter(d => d.categories.includes(activeFilter));
  }, [activeFilter]);

  return (
    <MotionSection
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      className="relative max-w-11/12 mx-auto px-4 py-16 lg:py-24"
    >
      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <MotionDiv
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-r from-emerald-200 to-green-200 dark:from-emerald-900/20 dark:to-green-900/20 rounded-full blur-3xl opacity-30"
        />
        <MotionDiv
          animate={{
            rotate: [360, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-r from-blue-200 to-cyan-200 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-full blur-3xl opacity-30"
        />
      </div>

      {/* Header Section */}
      <div className="relative text-center mb-12">
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200 dark:border-gray-800 shadow-sm mb-6"
        >
          <MapPin className="w-4 h-4 text-emerald-500" />
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Explore Beautiful Bangladesh
          </span>
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 dark:from-emerald-400 dark:via-green-400 dark:to-teal-400">
              Popular Destinations
            </span>
          </h2>
          
          <MotionDiv
            initial={{ width: 0 }}
            whileInView={{ width: 140 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1.5 bg-gradient-to-r from-emerald-400 to-green-600 rounded-full mx-auto mb-4"
          />
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Discover the most loved destinations in Bangladesh, each offering unique experiences 
            and unforgettable memories for every traveler.
          </p>
        </MotionDiv>
      </div>

      {/* Filter Tabs */}
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-wrap gap-3 justify-center mb-12"
      >
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-4 py-2 rounded-full border transition-all duration-300 ${
              activeFilter === filter.id
                ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white border-transparent shadow-lg"
                : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-600"
            }`}
          >
            <span className="font-medium">{filter.label}</span>
            <span className={`ml-2 text-xs px-2 py-1 rounded-full ${
              activeFilter === filter.id
                ? "bg-white/20 text-white"
                : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
            }`}>
              {filter.count}
            </span>
          </button>
        ))}
      </MotionDiv>

      {/* Mobile Carousel */}
      <div className="lg:hidden overflow-x-auto pb-4 no-scrollbar">
        <div className="flex gap-6 px-2 snap-x snap-mandatory">
          {filteredDestinations.map((destination, index) => (
            <div key={destination.name} className="min-w-[85%] snap-start">
              <DestinationCard 
                destination={destination} 
                index={index}
                isMobile={true}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Grid */}
      <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredDestinations.map((destination, index) => (
          <DestinationCard 
            key={destination.name} 
            destination={destination} 
            index={index}
            isMobile={false}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredDestinations.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No destinations found in this category.
          </p>
        </div>
      )}
    </MotionSection>
  );
};

export default PopularDestinations;