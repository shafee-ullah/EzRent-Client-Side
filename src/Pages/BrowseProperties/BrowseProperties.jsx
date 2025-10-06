import React, { useEffect, useState } from "react";
import { CiLocationOn, CiCalendar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { IoMdContacts } from "react-icons/io";
import { AiFillHeart } from "react-icons/ai";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/PropertieSlice";
import Loading from "../../components/Loading";
import Search from "./Search";
import { MdCategory } from "react-icons/md";


const BrowseProperties = () => {
 const dispatch=useDispatch();
 const {items, loading, error}=useSelector((state)=>state.products)
//  console.log(items)
 useEffect(()=>{
  dispatch(fetchProducts())
 },[dispatch])

  const [price, setPrice] = useState(500);
  const [expanded, setExpanded] = useState(null);
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]
    );
  };
    if (loading) return <Loading></Loading>
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  return (
    <div className="max-w-11/12 mx-auto ">
      <div className=" md:flex justify-center text-center my-4  w-full shadow-md dark:bg-gray-900">
     <Search></Search>
      </div>
      <div className="flex flex-col md:flex-row h-screen  ">
        {/* Sidebar */}
        <div className="md:w-1/3 w-full dark:bg-gray-900 p-4 h-screen shadow-md md:top-0 md:left-0  overflow-y-auto">
          <h2 className="text-3xl font-semibold mb-4 text-center">Filters</h2>

          {/* Price Filter */}
          <div className="mb-6">
            <label className="block mb-2 font-medium">Price Range</label>

            <input
              type="range"
              min="0"
              max="1000"
              step="50"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>$0</span>
              <span>${price}</span>
              <span>$1000+</span>
            </div>
          </div>

          {/* Property Type */}
          <div className="mb-6">
            <label className="block mb-2 font-medium">Property Type</label>
            <select className="w-full border rounded dark:bg-black p-2">
              <option>All Types</option>
              <option>Apartment</option>
              <option>Cabin</option>
              <option>House</option>
            </select>
          </div>

          {/* Amenities */}
          <div className="mb-6">
            <label className="block mb-2 font-medium">Amenities</label>
            {[
              "WiFi",
              "Kitchen",
              "Parking",
              "Pool",
              "Pet Friendly",
              "Air Conditioning",
            ].map((amenity, i) => (
              <div key={i} className="flex items-center mb-2">
                <input type="checkbox" className="mr-2" />
                <span>{amenity}</span>
              </div>
            ))}
          </div>

          <button className="w-full bg-gray-200 py-2 rounded-md dark:text-black">
            Reset Filters
          </button>
        </div> 

        {/* Cards Section */}
        <div className="w-full  h-screen overflow-y-scroll md:p-6 p-4 ">
          {/* <h2 className="text-2xl font-semibold mb-4">6 properties found</h2> */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {items
              .filter((p) => p.price <= price)
              ?.map((propertie, index) => (
                <motion.div
                  key={propertie._id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                  // whileHover={{ scale: 1.05 }}
                  className="relative group bg-white dark:bg-gray-900  my-2 rounded-2xl overflow-hidden shadow-lg border-gray-100 dark:border-gray-800 hover:shadow-2xl transition-all"
                >
                  {/* Image */}
                  <div className="relative">
                    <img
                      src={propertie.image}
                      alt={propertie.name}
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
                      onClick={() => toggleWishlist(propertie._id)}
                      className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:scale-110 transition"
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
                  <div className="p-4 space-y-1">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1 font-medium text-gray-600 text-sm">
                        <CiLocationOn size={18} className="text-red-500" />
                        <p className="dark:text-[#ffffff]">
                          {propertie.Location}
                        </p>
                      </div>
                      <motion.div
                        whileTap={{ scale: 1.2 }}
                        className="flex items-center gap-1 text-yellow-500 font-semibold text-sm"
                      >
                        <FaStar /> {propertie.reating}
                      </motion.div>
                    </div>

                    <h1 className="text-lg font-semibold text-gray-800 dark:text-[#ffffff]">
                      {propertie.name}
                    </h1>

                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed ">
                      {expanded === propertie.id
                        ? propertie?.description
                        : `${propertie?.description?.slice(0, 65)}...`}
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
            <div className="flex justify-between"  >
  
                    <div className="flex items-center gap-2 text-gray-700 text-sm dark:text-[#ffffff]">
                      <IoMdContacts size={18} />
                      <p>{propertie.guest} guests</p>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 text-sm dark:text-[#ffffff]">
                      <MdCategory size={18} />
                      <p className="text-green-400">{propertie.category}</p>
                    </div>
              </div>

                    <Link to={`/FeaturepropertiesDitels/${propertie._id}`}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.9 }}
                        className="mt-3 w-full py-2 flex justify-center items-center gap-2 rounded-full font-semibold bg-gradient-to-r from-emerald-500 to-green-500 text-white transition"
                      >
                        <CiCalendar size={18} /> Quick Book
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseProperties;




