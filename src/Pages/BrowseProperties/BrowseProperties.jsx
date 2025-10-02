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


const BrowseProperties = () => {
 const dispatch=useDispatch();
 const {items, loading, error}=useSelector((state)=>state.products)
 console.log(items)
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
      <div className=" md:flex justify-center text-center my-2 shadow-md dark:bg-gray-900">
        <form className="text-center text-black  dark:text-white rounded-lg px-6 py-4  flex flex-col md:flex-row max-md:items-start gap-4 max-md:mx-auto">
        <div>
          <div className="flex items-center  gap-2">
            <svg
              className="w-4 h-4 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
              />
            </svg>
            <label htmlFor="destinationInput">Destination</label>
          </div>
          <input
            list="destinations"
            id="destinationInput"
            type="text"
            className=" bg-gray-300 sm:w-full text-black dark:bg-gray-900 dark:text-white rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
            placeholder="Type here"
            required
          />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
              />
            </svg>
            <label htmlFor="checkIn">Check in</label>
          </div>
          <input
            id="checkIn"
            type="date"
            className=" bg-gray-300 sm:w-full dark:bg-gray-900 dark:text-white rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
          />
        </div>

        <div>
          <div className="flex items-center gap-2 ">
            <svg
              className="w-4 h-4 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
              />
            </svg>
            <label htmlFor="checkOut">Check out</label>
          </div>
          <input
            id="checkOut"
            type="date"
            className="bg-gray-300 sm:w-full dark:bg-gray-900 dark:text-white rounded border text-gray-800 border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
          />
        </div>

        <div className="flex md:flex-col max-md:gap-2 max-md:items-center">
          <label htmlFor="guests">Guests</label>
          <input
            min={1}
            max={4}
            id="guests"
            type="number"
            className=" bg-gray-300 dark:bg-gray-900 dark:text-white  rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none  max-w-16"
            placeholder="0"
          />
        </div>

        <button className="flex items-center justify-center gap-1 rounded-md dark:border border-amber-50 dark:bg-gray-900 dark:text-white bg-green-600 py-3 px-4 text-white my-auto cursor-pointer max-md:w-full max-md:py-1">
          
          <span>Search</span>
        </button>
      </form>
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
              .map((propertie, index) => (
                <motion.div
                  key={propertie.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  className="relative group bg-[var(--primary-color)] my-2 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
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
                  <div className="p-4 space-y-1">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1 font-medium text-gray-600 text-sm">
                        <CiLocationOn size={18} className="text-red-500" />
                        <p className="dark:text-[#ffffff]">
                          {propertie.location}
                        </p>
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

                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed ">
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

                    <Link to={`/FeaturepropertiesDitels/${propertie._id}`}>
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
        </div>
      </div>
    </div>
  );
};

export default BrowseProperties;
