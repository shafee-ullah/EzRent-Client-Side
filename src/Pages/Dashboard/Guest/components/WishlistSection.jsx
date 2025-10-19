import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, Star, MapPin, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlist, removeFromWishlist } from "../../../../redux/PropertieSlice";
import { AuthContext } from "../../../../Context/AuthContext";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MotionDiv = motion.div;

const WishlistSection = () => {
  const dispatch = useDispatch();
  const { user } = React.useContext(AuthContext);
  const wishlist = useSelector((state) => state.products.wishlist);
  console.log(wishlist);

  useEffect(() => {
    if (user?.email) {
      dispatch(fetchWishlist(user.email));
    }
  }, [user, dispatch]);


  const handleRemoveWishlist = (item) => {
    if (!user?.email) {
      return Swal.fire("Login required", "Please login first", "warning");
    }

    dispatch(removeFromWishlist({ propertyId: item.propertyId, email: user.email }))
      .unwrap()
      .then(() => Swal.fire("Removed!", "Property removed from wishlist", "success"))
      .catch(() => Swal.fire("Error", "Failed to remove", "error"));
  };

  return (
    <div className="space-y-6">


      {/* if no wishlist data then show a design */}
      {
        wishlist.length === 0 ? <>
          <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-md">
            <svg
              className="w-20 h-20 mb-4 text-gray-300 dark:text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.682l-7.682-7.682a4.5 4.5 0 010-6.364z"
              ></path>
            </svg>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Your wishlist is empty
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4 text-center px-4">
              Browse properties and add your favorite ones to your wishlist. They’ll appear here for easy access later.
            </p>
            <Link to={"/BrowseProperties"} className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
              Browse Properties
            </Link>
          </div></> : <>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              My Wishlist
            </h2>
          </div>

          {/* wishlist card */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((item, index) => (
              <MotionDiv
                key={item._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white/80 dark:bg-gray-800/20 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
              >
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                  <button
                    onClick={() => handleRemoveWishlist(item)}
                    className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-gray-800/90 rounded-full hover:scale-110 transition-transform duration-300"
                  >
                    <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {item.name}
                  </h3>
                  <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 mb-3">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{item.host}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-gray-900 dark:text-white">
                        ৳{item.price}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400 text-sm">
                        /night
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-medium">{item.rating || 0}</span>
                    </div>
                  </div>
                  <button className="w-full mt-4 py-2 hover:text-lg bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
                    <Link to={`/FeaturepropertiesDitels/${item?.propertyId}`} >
                      Book Now
                    </Link>
                  </button>

                </div>
              </MotionDiv>
            ))}
          </div></>
      }
    </div>
  );
};

export default WishlistSection;
