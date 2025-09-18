import React, { useState, useEffect } from "react";
import { CiLocationOn, CiCalendar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { IoMdContacts } from "react-icons/io";
import { AiFillHeart } from "react-icons/ai";
import { Link } from "react-router"; // ✅ Correct import for routing
import { motion } from "framer-motion";

// ✅ Skeleton Loader Component
const CardLoading = () => {
  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ repeat: Infinity, duration: 1.2, repeatType: "reverse" }}
      className="w-full h-96 bg-gray-200 rounded-2xl shadow-md p-4 space-y-4"
    >
      <div className="w-full h-44 bg-gray-300 rounded-xl"></div>
      <div className="w-3/4 h-5 bg-gray-300 rounded-md"></div>
      <div className="w-1/2 h-4 bg-gray-300 rounded-md"></div>
      <div className="flex space-x-3">
        <div className="w-1/3 h-4 bg-gray-300 rounded-md"></div>
        <div className="w-1/3 h-4 bg-gray-300 rounded-md"></div>
      </div>
      <div className="w-full h-10 bg-gray-300 rounded-lg"></div>
    </motion.div>
  );
};

const FeaturedPropertiesCard = () => {
  const [expanded, setExpanded] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true); //
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setProperties([
        {
          id: 1,
          title: "Grand Palace Hotel",
          img: "https://i.ibb.co.com/TD0z77GD/andrew-neel-w84-MOr-Tfbdw-unsplash-1.jpg",
          price: 180,
          rating: 4.6,
          guest: 4,
          location: "Paris, France",
          long_description:
            "A luxurious 5-star hotel located in the heart of Paris, offering elegant rooms, fine dining, and a rooftop terrace with a view of the Eiffel Tower.",
        },
        {
          id: 2,
          title: "Riverside Boutique Hotel",
          img: "https://i.ibb.co.com/bgQ4QhVT/steven-ungermann-a-RT5-UCf2-MYY-uns.jpg",
          price: 120,
          rating: 4.3,
          guest: 2,
          location: "Prague, Czech Republic",
          long_description:
            "A cozy boutique hotel situated along the Vltava River, featuring modern rooms, a wine bar, and easy access to Charles Bridge and Old Town Square.",
        },
        {
          id: 3,
          title: "Seaside Resort & Spa",
          img: "https://i.ibb.co.com/RpV8Lmx4/khadeeja-yasser-ms-FZE7d9-KB4-unsp.jpg",
          price: 200,
          rating: 4.8,
          guest: 4,
          location: "Barcelona, Spain",
          long_description:
            "A beachside resort with a full-service spa, infinity pool, and Mediterranean cuisine, perfect for both relaxation and vibrant nightlife nearby.",
        },
        {
          id: 4,
          title: "Mountain View Lodge",
          img: "https://i.ibb.co.com/NdhGbj7m/kam-idris-kyt0-Pk-BSCNQ-unsplash-1.jpg",
          price: 95,
          rating: 4.1,
          guest: 3,
          location: "Innsbruck, Austria",
          long_description:
            "A charming alpine lodge offering panoramic mountain views, traditional Austrian breakfasts, and quick access to skiing and hiking trails.",
        },
        {
          id: 5,
          title: "Historic Royal Inn",
          img: "https://i.ibb.co.com/tPXxsrrM/visualsofdana-T5p-L6ci-En-I-unspla.jpg",
          price: 150,
          rating: 4.5,
          guest: 2,
          location: "Edinburgh, Scotland",
          long_description:
            "Located near Edinburgh Castle, this inn combines rich history with modern comfort, featuring antique-style rooms and a traditional Scottish restaurant.",
        },
        {
          id: 6,
          title: "City Center Luxury Suites",
          img: "https://i.ibb.co.com/yFFwq0N5/sidath-vimukthi-29z-Da-Mhy-Is-U-unsp.jpg",
          price: 210,
          rating: 4.7,
          guest: 2,
          location: "Rome, Italy",
          long_description:
            "Elegant suites in central Rome, offering spacious accommodations, rooftop dining, and walking distance to the Colosseum and Trevi Fountain.",
        },
        {
          id: 7,
          title: "Lakeside Serenity Hotel",
          img: "https://i.ibb.co.com/4wMzFWpP/sasha-kaunas-67-s-Oi7m-VIk-unsplas.jpg",
          price: 160,
          rating: 4.4,
          guest: 3,
          location: "Lucerne, Switzerland",
          long_description:
            "A peaceful lakeside retreat offering stunning views of the Swiss Alps, gourmet dining, and a wellness spa designed for ultimate relaxation.",
        },
        {
          id: 8,
          title: "Desert Oasis Resort",
          img: "https://i.ibb.co.com/KcYWWx4P/mark-champs-Id2-IIl1j-OB0-unsplash-1.jpg.jpg",
          price: 175,
          rating: 4.6,
          guest: 4,
          location: "Dubai, UAE",
          long_description:
            "An exotic desert resort featuring luxury villas, camel rides, infinity pools, and a unique blend of modern amenities with traditional Arabian hospitality.",
        },
        // ... add your remaining properties here
      ]);
      setLoading(false); // ✅ Stop loading
    }, 2000); // Fake 2s loading
  }, []);

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]
    );
  };

  return (
    <div className="">
      {/* Section Title */}
      <div className="flex flex-col items-center px-4">
        <p className="text-3xl font-semibold text-gray-800 text-center dark:text-[#ffffff]">
          🌟 Featured Properties
        </p>
        <div className="w-28 h-1 bg-gradient-to-r from-green-500 to-emerald-700 mt-2 rounded"></div>
      </div>

      {/* ✅ Show Skeletons when loading */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12 px-4 md:px-14">
          {Array.from({ length: 8 }).map((_, index) => (
            <CardLoading key={index} />
          ))}
        </div>
      ) : (
        // ✅ Show Real Cards after data loads
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12 px-4 md:px-14">
          {properties.map((propertie, index) => (
            <motion.div
              key={propertie.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={propertie.img}
                  alt={propertie.title}
                  className="w-full h-44 object-cover rounded-t-2xl transition-transform duration-500 group-hover:scale-110"
                />

                {/* Price Badge */}
                <motion.span
                  whileHover={{ scale: 1.1 }}
                  className="absolute top-3 left-3 bg-[#16a34a] text-white text-sm px-3 py-1 rounded-full shadow-md"
                >
                  ${propertie.price}/night
                </motion.span>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(propertie.id)}
                  className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:scale-110 transition"
                >
                  <AiFillHeart
                    size={20}
                    className={`${
                      wishlist.includes(propertie.id)
                        ? "text-red-500"
                        : "text-gray-400"
                    }`}
                  />
                </button>
              </div>

              {/* Card Content */}
              <div className="p-4 space-y-0">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1 font-medium text-gray-600 text-sm">
                    <CiLocationOn size={18} className="text-red-500" />
                    <p className="dark:text-[#ffffff]">{propertie.location}</p>
                  </div>
                  <motion.div
                    whileTap={{ scale: 1.2 }}
                    className="flex items-center gap-1 text-yellow-500 font-semibold text-sm"
                  >
                    <FaStar /> {propertie.rating}
                  </motion.div>
                </div>

                <h1 className="text-lg font-semibold text-gray-800 dark:text-[#ffffff]">
                  {propertie.title}
                </h1>

                <p className="text-sm text-gray-500 leading-relaxed dark:text-[#ffffff]">
                  {expanded === propertie.id
                    ? propertie.long_description
                    : `${propertie.long_description.slice(0, 65)}...`}
                  <button
                    onClick={() =>
                      setExpanded(
                        expanded === propertie.id ? null : propertie.id
                      )
                    }
                    className="text-green-600 ml-2 hover:underline text-sm"
                  >
                    {expanded === propertie.id ? "Show less" : "Read more"}
                  </button>
                </p>

                <div className="flex items-center gap-2 text-gray-700 text-sm dark:text-[#ffffff]">
                  <IoMdContacts size={18} />
                  <p>{propertie.guest} guests</p>
                </div>

                <Link to={`/FeaturepropertiesDitels/${propertie.id}`}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    className="mt-3 w-full py-2 flex justify-center items-center gap-2 rounded-lg font-semibold text-white bg-[#16a34a] hover:bg-[#23b323] transition"
                  >
                    <CiCalendar size={18} /> Quick Book
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedPropertiesCard;
