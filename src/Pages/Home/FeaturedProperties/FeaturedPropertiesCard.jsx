import React, { useState, useEffect, useContext } from "react";
import { CiLocationOn, CiCalendar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { IoMdContacts } from "react-icons/io";
import { AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchlimit, addToWishlist, removeFromWishlist, fetchWishlist } from "../../../redux/PropertieSlice";
import { MdCategory } from "react-icons/md";
import { AuthContext } from "../../../Context/AuthContext";
import Swal from "sweetalert2";

const MotionDiv = motion.div;

// Skeleton Loader
const CardLoading = () => (
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

const FeaturedPropertiesCard = () => {
  const dispatch = useDispatch();
  const { user } = useContext(AuthContext);

  const { featuredItems, loading, error, wishlist } = useSelector(state => state.products);

  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    dispatch(fetchlimit());
    if (user?.email) {
      dispatch(fetchWishlist(user.email));
    }
  }, [dispatch, user?.email]);

  // Handle wishlist click
  const handleWishlist = (property) => {
    if (!user?.email) {
      return Swal.fire({
        title: "Login Required",
        text: "Please login to save properties",
        icon: "warning",
        confirmButtonColor: "#10b981",
        background: "rgba(255, 255, 255, 0.8)",
        customClass: { popup: "backdrop-blur-sm rounded-3xl" },
      });
    }

    const isInWishlist = wishlist?.some(w => w.propertyId === property._id);

    if (isInWishlist) {
      dispatch(removeFromWishlist({ propertyId: property._id, email: user.email }))
        .unwrap()
        .then(() => Swal.fire({
          title: "Removed!",
          text: "Property removed from wishlist",
          icon: "success",
          confirmButtonColor: "#10b981",
          background: "rgba(255, 255, 255, 0.8)",
          customClass: { popup: "backdrop-blur-sm rounded-3xl" },
        }))
        .catch(() => Swal.fire({
          title: "Error",
          text: "Failed to remove from wishlist",
          icon: "error",
          confirmButtonColor: "#ef4444",
          background: "rgba(255, 255, 255, 0.8)",
          customClass: { popup: "backdrop-blur-sm rounded-3xl" },
        }));
    } else {
      const wishlistPayload = {
        email: user.email,
        propertyId: property._id,
        name: property.name,
        image: property.image,
        price: property.price,
        host: property.name,
      };

      dispatch(addToWishlist(wishlistPayload))
        .unwrap()
        .then(() => Swal.fire({
          title: "Saved!",
          text: "Property added to wishlist",
          icon: "success",
          confirmButtonColor: "#10b981",
          background: "rgba(255, 255, 255, 0.8)",
          customClass: { popup: "backdrop-blur-sm rounded-3xl" },
        }))
        .catch(() => Swal.fire({
          title: "Error",
          text: "Already added to wishlist",
          icon: "error",
          confirmButtonColor: "#ef4444",
          background: "rgba(255, 255, 255, 0.8)",
          customClass: { popup: "backdrop-blur-sm rounded-3xl" },
        }));
    }
  };

  if (loading) return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12 px-4 md:px-14">{Array.from({ length: 8 }).map((_, i) => <CardLoading key={i} />)}</div>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="relative max-w-11/12 mx-auto px-4 py-16 lg:py-12">
      <div className="flex flex-col items-center px-4">
        <MotionDiv initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 dark:from-emerald-400 dark:via-green-400 dark:to-teal-400">
              Featured Properties
            </span>
          </h2>
          <MotionDiv initial={{ width: 0 }} whileInView={{ width: 120 }} transition={{ duration: 0.8, delay: 0.3 }} className="h-1.5 bg-gradient-to-r from-emerald-400 to-green-600 rounded-full mx-auto mb-4" />
        </MotionDiv>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12 px-4 md:px-14">
        {featuredItems?.map((property, index) => {
          const isInWishlist = wishlist?.some(w => w.propertyId === property._id);

          return (
            <motion.div
              key={property._id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all bg-[var(--primary-color)]/90 dark:bg-[var(--primary-color)] border border-gray-100/60 dark:border-gray-800 flex flex-col h-full"
            >
              {/* Image */}
              <div className="relative">
                <img src={property.image} alt={property.name} className="w-full h-44 object-cover rounded-t-2xl transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/5 to-transparent" />

                {/* Wishlist */}
                <button
                  onClick={() => handleWishlist(property)}
                  className="absolute top-3 right-3 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full backdrop-blur-sm hover:bg-emerald-500 transition-all duration-300"
                >
                  <AiFillHeart
                    size={20}
                    className={isInWishlist ? "text-red-500" : "text-gray-600 dark:text-gray-400"}
                  />
                </button>

                {/* Price */}
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 text-white text-sm font-semibold shadow-md">
                  ${property.price}/night
                </span>
              </div>

              {/* Card Content */}
              <div className="p-4 flex flex-col justify-between flex-grow bg-white dark:bg-gray-900 rounded-b-2xl">
                <div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1 font-medium text-gray-600 text-sm">
                      <CiLocationOn size={18} className="text-red-500" />
                      <p className="dark:text-white">{property.Location}</p>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-500 font-semibold text-sm">
                      <FaStar /> {property.reating}
                    </div>
                  </div>

                  <h1 className="text-[18px] leading-snug font-semibold text-gray-900 dark:text-white mt-2">
                    {property.name}
                  </h1>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {expanded === property._id ? property.description : `${property.description?.slice(0, 65)}...`}
                    {property.description?.length > 65 && (
                      <button
                        onClick={() => setExpanded(expanded === property._id ? null : property._id)}
                        className="text-[var(--btn-primary)] ml-2 hover:underline text-sm"
                      >
                        {expanded === property._id ? "Show less" : "Read more"}
                      </button>
                    )}
                  </p>

                  <div className="flex justify-between mt-3">
                    <div className="flex items-center gap-2 text-gray-700 text-sm dark:text-white">
                      <IoMdContacts size={18} />
                      <p>{property.guest} guests</p>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 text-sm dark:text-white">
                      <MdCategory size={18} />
                      <p className="text-green-500">{property.category}</p>
                    </div>
                  </div>
                </div>

                <Link to={`/FeaturepropertiesDitels/${property._id}`} className="mt-4">
                  <button className="w-full py-2.5 flex justify-center items-center gap-2 rounded-full font-semibold bg-gradient-to-r from-emerald-500 to-green-500 text-white hover:brightness-110 transition">
                    <CiCalendar size={18} /> Quick Book
                  </button>
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturedPropertiesCard;
