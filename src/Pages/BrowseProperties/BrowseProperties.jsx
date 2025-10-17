import React, { useEffect, useState, useContext } from "react";
import { CiLocationOn, CiCalendar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { IoMdContacts } from "react-icons/io";
import { AiFillHeart } from "react-icons/ai";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  fetchWishlist,
  removeFromWishlist,
  fetchmanageproperty,
} from "../../redux/PropertieSlice";
import Loading from "../../components/Loading";
import Search from "./Search";
import { MdCategory } from "react-icons/md";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthContext";

const BrowseProperties = () => {
  const dispatch = useDispatch();
  const { user } = useContext(AuthContext);

  const { items, loading, error, wishlist } = useSelector(
    (state) => state.products
  );

  const [price, setPrice] = useState(500);
  const [selectedCategory, setSelectedCategory] = useState("All Types");
  const [searchText, setSearchText] = useState("");
  const [expanded, setExpanded] = useState(null);
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  useEffect(() => {
    dispatch(fetchmanageproperty());
    if (user?.email) {
      dispatch(fetchWishlist(user.email));
    }
  }, [dispatch, user?.email]);

  const hendalSerch = (text) => {
    setSearchText(text.toLowerCase());
  };

  const handleWishlist = (property) => {
    if (!user?.email) {
      return Swal.fire({
        title: "Login Required",
        text: "Please login to save properties",
        icon: "warning",
        confirmButtonColor: "#10b981",
        background: "rgba(255, 255, 255, 0.8)",
        customClass: {
          popup: "backdrop-blur-sm rounded-3xl",
        },
      });
    }

    const isInWishlist = wishlist?.some((w) => w.propertyId === property._id);

    if (isInWishlist) {
      dispatch(
        removeFromWishlist({ propertyId: property._id, email: user.email })
      )
        .unwrap()
        .then(() =>
          Swal.fire({
            title: "Removed!",
            text: "Property removed from wishlist",
            icon: "success",
            confirmButtonColor: "#10b981",
            background: "rgba(255, 255, 255, 0.8)",
            customClass: { popup: "backdrop-blur-sm rounded-3xl" },
          })
        )
        .catch(() =>
          Swal.fire({
            title: "Error",
            text: "Failed to remove from wishlist",
            icon: "error",
            confirmButtonColor: "#ef4444",
            background: "rgba(255, 255, 255, 0.8)",
            customClass: { popup: "backdrop-blur-sm rounded-3xl" },
          })
        );
    } else {
      const wishlistPayload = {
        email: user.email,
        propertyId: property._id,
        name: property.name,
        image: property.image,
        price: property.offerPrice || property.price,
        host: property.name,
      };

      dispatch(addToWishlist(wishlistPayload))
        .unwrap()
        .then(() =>
          Swal.fire({
            title: "Saved!",
            text: "Property added to wishlist",
            icon: "success",
            confirmButtonColor: "#10b981",
            background: "rgba(255, 255, 255, 0.8)",
            customClass: { popup: "backdrop-blur-sm rounded-3xl" },
          })
        )
        .catch(() =>
          Swal.fire({
            title: "Error",
            text: "Already added to wishlist",
            icon: "error",
            confirmButtonColor: "#ef4444",
            background: "rgba(255, 255, 255, 0.8)",
            customClass: { popup: "backdrop-blur-sm rounded-3xl" },
          })
        );
    }
  };

  const toggleAmenity = (amenity) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  const resetFilters = () => {
    setPrice(500);
    setSelectedCategory("All Types");
    setSearchText("");
    setSelectedAmenities([]);
  };

  if (loading) return <Loading />;
  if (error) return <p className="text-red-500 text-center py-8">{error}</p>;

  // ✅ Dynamically load amenities from DB (services field)
  const allAmenities = Array.from(
    new Set(
      items
        .map((p) => {
          if (Array.isArray(p.services)) return p.services;
          if (typeof p.services === "string") return [p.services];
          return [];
        })
        .flat()
        .filter((s) => typeof s === "string" && s.trim() !== "")
    )
  );

  // ✅ Filter properties
  const filteredItems = items.filter((p) => {
    const matchesPrice = p.price <= price;
    const matchesCategory =
      selectedCategory === "All Types" || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchText) ||
      p.Location.toLowerCase().includes(searchText);
    const matchesAmenities =
      selectedAmenities.length === 0 ||
      selectedAmenities.every((a) => p.services?.includes(a));

    return (
      p.propertystatus === "active" &&
      matchesPrice &&
      matchesCategory &&
      matchesSearch &&
      matchesAmenities
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50/50 via-white to-green-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-emerald-900/10">
      <div className="max-w-11/12 mx-auto py-8 px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-green-600 mb-4">
            Browse Properties
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Discover your perfect stay from our curated collection of
            exceptional properties
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <Search hendalSerch={hendalSerch} />
        </motion.div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-1/4 w-full"
          >
            <div className="backdrop-blur-sm bg-white/70 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-lg p-6 sticky top-6">
              <h2 className="text-2xl font-bold mb-6 text-center text-emerald-600">
                Filters
              </h2>

              {/* Price */}
              <div className="mb-6">
                <label className="block mb-3 font-semibold text-gray-700 dark:text-gray-300">
                  Price Range: <span className="text-emerald-600">${price}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="50"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer"
                />
              </div>

              {/* Category */}
              <div className="mb-6">
                <label className="block mb-3 font-semibold text-gray-700 dark:text-gray-300">
                  Property Type
                </label>
                <select
                  className="w-full px-4 py-3 rounded-2xl border bg-white dark:bg-gray-800"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option>All Types</option>
                  <option>Apartment</option>
                  <option>Cabin</option>
                  <option>House</option>
                  <option>Villa</option>
                  <option>Studio</option>
                </select>
              </div>

              {/* ✅ Amenities (From Database) */}
              {allAmenities.length > 0 && (
                <div className="mb-6">
                  <label className="block mb-3 font-semibold text-gray-700 dark:text-gray-300">
                    Amenities
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {allAmenities.map((amenity, i) => (
                      <label
                        key={i}
                        className="flex items-center gap-2 cursor-pointer p-2 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all"
                      >
                        <input
                          type="checkbox"
                          className="w-4 h-4 accent-emerald-500"
                          checked={selectedAmenities.includes(amenity)}
                          onChange={() => toggleAmenity(amenity)}
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {amenity}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Reset */}
              <motion.button
                onClick={resetFilters}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Reset Filters
              </motion.button>
            </div>
          </motion.div>

          {/* Properties Grid */}
          <div className="flex-1">
            {filteredItems.length === 0 ? (
              <div className="text-center py-12 bg-white/70 dark:bg-gray-800/70 rounded-3xl shadow-lg">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                  No Properties Found
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Try adjusting your filters or search terms
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-3 rounded-2xl bg-emerald-500 text-white font-semibold shadow-lg"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredItems.map((property) => {
                  const isInWishlist = wishlist?.some(
                    (w) => w.propertyId === property._id
                  );

                  return (
                    <div
                      key={property._id}
                      className="bg-white/70 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg overflow-hidden hover:-translate-y-1 transition-all"
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={property.image}
                          alt={property.name}
                          className="w-full h-40 object-cover"
                        />
                        <button
                          onClick={() => handleWishlist(property)}
                          className="absolute top-3 right-3 bg-white/80 p-2 rounded-full"
                        >
                          <AiFillHeart
                            size={20}
                            className={
                              isInWishlist ? "text-red-500" : "text-gray-600"
                            }
                          />
                        </button>
                      </div>

                      <div className="p-5 space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-1 text-gray-600">
                            <CiLocationOn className="text-emerald-500" />
                            <p className="text-sm font-medium dark:text-white">
                              {property.Location}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 bg-amber-500 text-white px-2 py-1 rounded-full">
                            <FaStar className="text-xs" />
                            <span className="text-sm font-semibold">
                              {property.reating}
                            </span>
                          </div>
                        </div>

                        <h3 className="text-xl font-bold dark:text-white text-gray-900">
                          {property.name}
                        </h3>

                        <p className="text-gray-600 text-sm dark:text-white">
                          {expanded === property._id
                            ? property.description
                            : `${property.description?.slice(0, 80)}...`}
                          {property.description?.length > 80 && (
                            <button
                              onClick={() =>
                                setExpanded(
                                  expanded === property._id
                                    ? null
                                    : property._id
                                )
                              }
                              className="text-emerald-600 font-semibold ml-1 hover:underline text-sm"
                            >
                              {expanded === property._id
                                ? "Show less"
                                : "Read more"}
                            </button>
                          )}
                        </p>

                        <div className="flex justify-between text-gray-600 text-sm">
                          <div className="flex items-center gap-2">
                            <IoMdContacts className="text-emerald-500" />
                            <p className="dark:text-white">{property.guest} guests</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <MdCategory className="text-emerald-500" />
                            <p className="font-semibold text-emerald-600">
                              {property.category}
                            </p>
                          </div>
                        </div>

                        <Link to={`/FeaturepropertiesDitels/${property._id}`}>
                          <button className="w-full py-2.5 flex justify-center items-center gap-2 rounded-full font-semibold bg-gradient-to-r from-emerald-500 to-green-500 text-white hover:brightness-110 transition ">
                            <CiCalendar />
                            Quick Book
                          </button>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseProperties;
