import React, {  useContext, useEffect } from "react";
import { Calendar } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../../components/Loading";
import {
  deleteBooking,
  fetchbooking,
  updateBookingStatus,
} from "../../../../redux/PropertieSlice";
 import { AuthContext } from "../../../../Context/AuthContext";
const BookingsSection = () => {
   const {user}=useContext(AuthContext)
  const dispatch = useDispatch();
  
const {bookings,loading,error}=useSelector((state)=>state.products)
   console.log(bookings)  
  // const [activeTab, setActiveTab] = useState("all");
// console.log(user)
  useEffect(() => {
    if (bookings.length===0)  {
      dispatch(fetchbooking());
    }
  }, [dispatch,bookings.length]);

  console.log("this booking data", bookings);
  

  // Loading & Error
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Bookings
        </h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl font-medium hover:shadow-md transition-all duration-300">
          <Calendar className="w-4 h-4" />
          Calendar View
        </button>
      </div>

      {/* Table */}
      <div className="bg-white/80 dark:bg-gray-800/20 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Guest & Property
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Dates
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {bookings.filter((h)=>h.hostemail===user?.email)?.map((booking) => (
                <tr
                  key={booking._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {booking.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {booking.Location}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {new Date(booking.Checkin).toLocaleDateString()} -{" "}
                      {new Date(booking.Checkout).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {booking.guest} guests
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                      ${booking.price}
                    </div>
                  </td>
                  {/* states */}
                  <td>
                    <p
                      className={` px-2 py-1 w-fit rounded-full text-xs font-medium ${
                        booking.status === "confirmed"
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
                    : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300" }`}
                    >
                      {booking.status}
                    </p>
                  </td>
                  <td>
  {/* যদি status confirmed হয়, তাহলে Accept/Reject বাটন দেখাবে না */}
  {booking.status !== "confirmed" ? (
    <div className="flex gap-2">
      <button
        onClick={() =>
          dispatch(
            updateBookingStatus({
              bookingId: booking._id,
              newStatus: "confirmed",
            })
          )
        }
        className="px-3 py-1 text-white bg-green-500 rounded-lg hover:bg-green-600"
      >
        Accept
      </button>

      <button
        onClick={() => dispatch(deleteBooking(booking._id))}
        className="px-3 py-1 text-white bg-red-500 rounded-lg hover:bg-red-600"
      >
        Reject
      </button>
    </div>
  ) : ('')}
</td>
                </tr>
              ))}
            </tbody>
          </table>

          {bookings.length === 0 && (
            <p className="text-center text-gray-500 py-6">No bookings found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingsSection;
