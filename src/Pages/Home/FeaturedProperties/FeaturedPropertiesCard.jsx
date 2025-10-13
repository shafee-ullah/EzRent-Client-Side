import React, { useState, useEffect } from "react";
import { CiLocationOn, CiCalendar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { IoMdContacts } from "react-icons/io";
import { AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchlimit } from "../../../redux/PropertieSlice";
const MotionDiv = motion.div;
import { MdCategory } from "react-icons/md";
const MotionSection = motion.section;
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
  //  const [Loading, setLoading] = useState(true); //
  // const [properties, setProperties] = useState([]);

  const dispatch = useDispatch();
  const {  featuredItems, loading, error } = useSelector((state) => state.products);
  console.log("faturelimit",featuredItems)
 useEffect(() => {
  dispatch(fetchlimit());
}, [dispatch]);
 
  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]
    );
  };
  if (loading)
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12 px-4 md:px-14">
        {Array.from({ length: 8 }).map((_, index) => (
          <CardLoading key={index} />
        ))}
      </div>
    );
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  return (
    <div className="my-16 py-16 lg:py-8 ">
      {/* Section Title */}
      <div className="flex flex-col items-center px-4">
        {/* <p className="text-3xl font-semibold text-gray-800 text-center dark:text-[#ffffff]">
          🌟 Featured Properties
        </p> */}
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 dark:from-emerald-400 dark:via-green-400 dark:to-teal-400">
              Featured Properties
            </span>
          </h2>

          <MotionDiv
            initial={{ width: 0 }}
            whileInView={{ width: 120 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1.5 bg-gradient-to-r from-emerald-400 to-green-600 rounded-full mx-auto mb-4"
          />
        </MotionDiv>
        {/* <div className="w-28 h-1 bg-gradient-to-r from-green-500 to-emerald-700 mt-2 rounded"></div> */}
      </div>

      {/* ✅ Show Skeletons when loading */}

      <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12 px-4 md:px-14">
        { featuredItems?.filter((p)=>p.propertystatus=== "active")?.map((propertie, index) => (
          <motion.div
            key={propertie._id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            // whileHover={{ scale: 1.02 }}
            className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all bg-[var(--primary-color)]/90 dark:bg-[var(--primary-color)] border border-gray-100/60 dark:border-gray-800"
          >
            {/* Image */}
            <div className="relative">
              <img
                src={propertie?.image}
                alt={propertie.name}
                className="w-full h-44 object-cover rounded-t-2xl transition-transform duration-500 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-black/5 to-transparent" />

              {/* Price Badge */}
              <motion.span
                whileHover={{ scale: 1.1 }}
                className="absolute top-3 left-3 backdrop-blur bg-[var(--btn-primary)]/90 text-white text-[13px] px-3 py-1 rounded-full shadow-md ring-1 ring-white/20"
              >
                ${propertie.price}/night
              </motion.span>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(propertie._id)}
                aria-label={
                  wishlist.includes(propertie._id)
                    ? "Remove from wishlist"
                    : "Add to wishlist"
                }
                className="absolute top-3 right-3 bg-white/90 dark:bg-gray-900 text-gray-700 dark:text-gray-200 p-2 rounded-full shadow-md hover:scale-110 transition ring-1 ring-black/5"
              >
                <AiFillHeart
                  size={20}
                  className={`${
                    wishlist.includes(propertie._id)
                      ? "text-red-500"
                      : "text-gray-400"
                  }`}
                />
              </button>
            </div>

            {/* Card Content */}
            <div className="p-4 space-y-0  dark:bg-gray-900 rounded-2xl  shadow-sm border border-gray-100 dark:border-gray-800 group-hover:shadow-lg transition-all duration-300  overflow-hidden">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1 font-medium text-gray-600 text-sm">
                  <CiLocationOn size={18} className="text-red-500" />
                  <p className="dark:text-[#ffffff]">{propertie.Location}</p>
                </div>
                <motion.div
                  whileTap={{ scale: 1.2 }}
                  className="flex items-center gap-1 text-yellow-500 font-semibold text-sm"
                >
                  <FaStar /> {propertie.reating}
                </motion.div>
              </div>

              <h1 className="text-[18px] leading-snug font-semibold text-gray-900 dark:text-white">
                {propertie.name}
              </h1>

              <p className="text-sm text-gray-600 leading-relaxed dark:text-gray-400">
                {expanded === propertie.id
                  ? propertie?.description
                  : `${propertie?.description?.slice(0, 65)}...`}
                <button
                  onClick={() =>
                    setExpanded(expanded === propertie.id ? null : propertie.id)
                  }
                  className="text-[var(--btn-primary)] ml-2 hover:underline text-sm"
                >
                  {expanded === propertie.id ? "Show less" : "Read more"}
                </button>
              </p>

           <div className="flex justify-between ">
               <div className="flex items-center gap-2 text-gray-700 text-smdark:text-[#ffffff]">
                <IoMdContacts className="dark:text-white" size={18} />
                <p className="dark:text-white">{propertie.guest} guests</p>
              </div>
              <div className="flex items-center gap-2 text-gray-700 text-smdark:text-[#ffffff]">
                <MdCategory className="dark:text-white" size={18} />
                <p className="text-green-400">{propertie.category} </p>
              </div>
           </div>
              <Link to={`/FeaturepropertiesDitels/${propertie._id}`}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  className="mt-3 w-full py-2.5  flex justify-center items-center gap-2 rounded-full font-semibold bg-gradient-to-r from-emerald-500 to-green-500 text-white hover:brightness-110 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--btn-primary)]/70"
                >
                  <CiCalendar size={18} /> Quick Book
                </motion.button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedPropertiesCard;
