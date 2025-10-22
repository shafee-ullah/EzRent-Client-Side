
import React, { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Heart,
  CheckCircle,
  Star,
  MapPin,
  Users,
} from "lucide-react";
import { AuthContext } from "../../../../Context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyBooking, fetchWishlist } from "../../../../redux/PropertieSlice";
import { MdHotel } from "react-icons/md";
import { Link } from "react-router";

const MotionDiv = motion.div;

const OverviewSection = ({ data }) => {


  const dispatch = useDispatch();
  const { user } = useContext(AuthContext);

  // Use myBookings from Redux state
  const { myBookings: bookings, loading, error } = useSelector(
    (state) => state.products
  );

  const wishlist = useSelector((state) => state.products.wishlist);

  useEffect(() => {
    if (user?.email) {
      dispatch(fetchMyBooking(user.email));
      dispatch(fetchWishlist(user.email));
    }
  }, [dispatch, user?.email]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  console.log("over ", bookings);



  const stats = [
    {
      label: "Upcoming Bookings",
      value: bookings.length || 0,
      icon: <Calendar className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
      description: "Trips coming up",
    },
    {
      label: "Wishlist Items",
      value: wishlist.length || 0,
      icon: <Heart className="w-6 h-6" />,
      color: "from-pink-500 to-rose-500",
      description: "Saved properties",
    },
    {
      label: "Past Trips",
      value: data.stats.pastTrips,
      icon: <CheckCircle className="w-6 h-6" />,
      color: "from-emerald-500 to-green-500",
      description: "Completed stays",
    },
    {
      label: "Reviews",
      value: data.stats.reviews,
      icon: <Star className="w-6 h-6" />,
      color: "from-amber-500 to-orange-500",
      description: "Properties reviewed",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <MotionDiv
            key={stat.label}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white/80 dark:bg-gray-800/20 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mt-1">
                  {stat.label}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  {stat.description}
                </p>
              </div>
              <div
                className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} text-white`}
              >
                {stat.icon}
              </div>
            </div>
          </MotionDiv>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MotionDiv
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/80 dark:bg-gray-800/20 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items:center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Upcoming Bookings
            </h3>
            <Calendar className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="space-y-4">
            {bookings?.length > 0 ? (
              bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-md transition-all duration-300"
                >
                  <img
                    src={booking?.img}
                    alt={booking?.property}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(booking?.Checkin).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {booking?.guest} guests
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-semibold text-gray-900 dark:text-white">
                        ৳{booking?.price}
                      </span>
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 rounded-full text-xs font-medium">
                        {booking?.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              // No Bookings Design
              <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-md text-center">
                <MdHotel className="w-20 h-20 mb-4 text-gray-300 dark:text-gray-600" />
                <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  No Bookings Yet
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6 px-4">
                  You haven't made any bookings yet. Browse our properties and book your favorite stay.
                </p>
                <Link to="/BrowseProperties">
                  <button className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
                    Browse Properties
                  </button>
                </Link>
              </div>
            )}
          </div>

        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white/80 dark:bg-gray-800/20 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recommended for You
            </h3>
            <Star className="w-5 h-5 text-amber-500" />
          </div>
          <div className="space-y-4">
            {[
              {
                name: "Sundarbans Eco Resort",
                location: "Khulna",
                price: 5600,
                rating: 4.8,
                image:
                  "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=500&auto=format&fit=crop",
              },
              {
                name: "Heritage Home Old Dhaka",
                location: "Dhaka",
                price: 3200,
                rating: 4.6,
                image:
                  "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?q=80&w=500&auto=format&fit=crop",
              },
            ].map((property) => (
              <div
                key={property.name}
                className="flex gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-md transition-all duration-300"
              >
                <img
                  src={property.image}
                  alt={property.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {property.name}
                  </h4>
                  <div className="flex items-center gap-1 mt-1 text-gray-600 dark:text-gray-400">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{property.location}</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      ৳{property.price}/night
                    </span>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-medium">
                        {property.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </MotionDiv>
      </div>
    </div>
  );
};

export default OverviewSection;
