
// import React, { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { AuthContext } from "../../Context/AuthContext";


// const CheckoutForm = ({ data }) => {
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();
//   console.log(user)
//   const handelcheckout = (e) => {
//     e.preventDefault();
//     const form = e.target;
//     const formdata = new FormData(form);
//     const Updatedata = Object.fromEntries(formdata.entries());
//     const Bookingdata = {
//       Checkin: Updatedata.Checkin,
//       Checkout: Updatedata.Checkout,
//       guest: Updatedata.number,
//       room:Updatedata.room,
//       extaOptions:Updatedata.extaOptions,
//       id: data._id,
//       img: data.image,
//       Location: data.Location,
//       hostemail:data?.email,
//       hostname:data?.Name,
//       status: "pending",
//       price: data.price,
//       email: user?.email,
//       name: user?.displayName,
//       title: data.name,
//     };
//     console.log(Bookingdata)
//     // Create booking first, then redirect to payment
//     fetch("https://ez-rent-server-side.vercel.app/bookinghotel", {
//       method: "POST",
//       headers: {
//         "content-type": "application/json",
//       },
//       body: JSON.stringify(Bookingdata),
//     })
//       .then((res) => res.json())
//       .then((bookingResult) => {
//         console.log("Booking created:", bookingResult);

//         // Prepare payment data
//         const paymentData = {
//           bookingId: bookingResult.insertedId || bookingResult._id,
//           userId: user?.uid || user?.email,
//           userName: user?.displayName || "Guest User",
//           userEmail: user?.email,
//           propertyName: data.name,
//           propertyLocation: data.Location,
//           checkIn: Updatedata.Checkin,
//           checkOut: Updatedata.Checkout,
//           guests: Updatedata.number,
//           amount: data.Price,
//           totalPrice: data.Price,
//           propertyImage: data.image,
//           bookingData: Bookingdata,
//         };

//         // Show success message and redirect to payment
//         Swal.fire({
//           icon: "success",
//           title: "Booking created successfully!",
//           text: "Redirecting to payment...",
//           showConfirmButton: false,
//           timer: 1500,
//         }).then(() => {
//           // Navigate to payment page with booking data
//           navigate("/payment", {
//             state: {
//               bookingData: paymentData,
//               fromBooking: true,
//             },
//           });
//         });
//       })
//       .catch((error) => {
//         console.error("Booking error:", error);
//         Swal.fire({
//           icon: "error",
//           title: "Booking Failed",
//           text: "There was an error creating your booking. Please try again.",
//           confirmButtonText: "OK",
//         });
//       });
//   };

//   return (
//     <form
//       onSubmit={handelcheckout}
//       className=" dark:border border-1 shadow-md  w-full rounded-lg px-6 py-4  flex flex-col md:flex-row max-md:items-start gap-14 max-md:mx-auto"
//     >
//       <div className=" md:flex w-full justify-between  ">
//         <div className="md:flex gap-8 space-y-4">
//           <div>
//             <div className="flex items-center gap-2 w-full">
//               <label htmlFor="checkIn">Check in</label>
//             </div>
//             <input
//               id="checkInDate"
//               name="Checkin"
//               type="date"
//               className=" w-full rounded border border-gray-200 px-3 py-2 mt-1.5  outline-none"
//               required
//             />
//           </div>
//           <div className="w-px h-18 bg-gray-300/70 max-md:hidden"></div>
//           <div>
//             <div className="flex items-center gap-2">
//               <label htmlFor="checkOut">Check out</label>
//             </div>
//             <input
//               id="checkOutDate"
//               name="Checkout"
//               type="date"
//               className=" w-full rounded border border-gray-300 px-3 py-2 mt-1.5  outline-none"
//               required
//             />
//           </div>

//           <div className="w-px h-18 bg-gray-300/70 max-md:hidden"></div>
//           <div>
//             <div className="flex items-center gap-2">
//               <label htmlFor="guests">Guests</label>
//             </div>
//             <input
//               min={1}
//               max={5}
//               id="guests"
//               name="number"
//               type="number"
//               className=" rounded border border-gray-300 px-3 py-1.5 mt-1.5 text-sm outline-none mb-4  w-full"
//               placeholder="0"
//               required
//             />
//           </div>
//           <div>
//             <div className="flex items-center gap-2">
//               <label htmlFor="Rooms">Rooms</label>
//             </div>
//             <input
//               min={1}
//               max={5}
//               id="Rooms"
//               name="room"
//               type="number"
//               className=" rounded border border-gray-300 px-3 py-1.5 mt-1.5 text-sm outline-none mb-4  w-full"
//               placeholder="0"
//               required
//             />
//           </div>
          
//        <div>
//               <label> Extra Options </label>
//              <select
//               type="text"
//                 name="extaOptions"
//                 className= "rounded border  dark:bg-gray-800 border-gray-300 px-3 py-2 mt-1.5 w-full outline-none"
//               >
//                 <option value="Breakfast">Breakfast</option>
//                 <option value="Lunch">Lunch</option>
//                 <option value="Dinner">Dinner</option>
//                 <option value="extraBed">extraBed</option>
//               </select>
//             </div>
//         </div>

//         <div className="md:flex justify-center items-center">
//           <button className=" w-full px-16 py-4 font-semibold bg-green-600 rounded-md text-white hover:bg-green-700 transition duration-200">
//             {" "}
//             Book & Pay Now{" "}
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default CheckoutForm;


import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthContext";

const CheckoutForm = ({ data }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isAvailable, setIsAvailable] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAvailabilityCheck = async (e) => {
    e.preventDefault();
    setLoading(true);

    const checkIn = e.target.checkInDate.value;
    const checkOut = e.target.checkOutDate.value;

    if (!checkIn || !checkOut) {
      Swal.fire({
        icon: "warning",
        title: "Please select Check-in & Check-out dates",
      });
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/checkBooking?roomId=${data._id}&checkIn=${checkIn}&checkOut=${checkOut}`
      );
      const result = await res.json();

      if (result?.isBooked) {
        Swal.fire({
          icon: "error",
          title: "Already Booked!",
          text: "This room is not available for the selected dates.",
        });
        setIsAvailable(false);
      } else {
        Swal.fire({
          icon: "success",
          title: "Room Available!",
          text: "You can proceed to book this room.",
          timer: 1500,
          showConfirmButton: false,
        });
        setIsAvailable(true);
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };

  const handelcheckout = (e) => {
    e.preventDefault();
    const form = e.target;
    const formdata = new FormData(form);
    const Updatedata = Object.fromEntries(formdata.entries());
    const Bookingdata = {
      Checkin: Updatedata.Checkin,
      Checkout: Updatedata.Checkout,
      guest: Updatedata.number,
      room: Updatedata.room,
      extaOptions: Updatedata.extaOptions,
      id: data._id,
      img: data.image,
      Location: data.Location,
      hostemail: data?.email,
      hostname: data?.Name,
      status: "pending",
      price: data.price,
      email: user?.email,
      name: user?.displayName,
      title: data.name,
    };

    fetch("https://ez-rent-server-side.vercel.app/bookinghotel", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(Bookingdata),
    })
      .then((res) => res.json())
      .then((bookingResult) => {
        Swal.fire({
          icon: "success",
          title: "Booking created successfully!",
          text: "Redirecting to payment...",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          const paymentData = {
            bookingId: bookingResult.insertedId || bookingResult._id,
            userId: user?.uid || user?.email,
            userName: user?.displayName || "Guest User",
            userEmail: user?.email,
            propertyName: data.name,
            propertyLocation: data.Location,
            checkIn: Updatedata.Checkin,
            checkOut: Updatedata.Checkout,
            guests: Updatedata.number,
            amount: data.price,
            totalPrice: data.price,
            propertyImage: data.image,
            bookingData: Bookingdata,
          };
          navigate("/payment", {
            state: { bookingData: paymentData, fromBooking: true },
          });
        });
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Booking Failed",
          text: "There was an error creating your booking. Please try again.",
        });
      });
  };

  return (
    <form
      onSubmit={isAvailable ? handelcheckout : handleAvailabilityCheck}
      className="dark:border border-1 shadow-md w-full rounded-lg px-6 py-4 flex flex-col md:flex-row max-md:items-start gap-14 max-md:mx-auto"
    >
      <div className="md:flex w-full justify-between">
        <div className="md:flex gap-8 space-y-4">
          <div>
            <label htmlFor="checkInDate">Check in</label>
            <input
              id="checkInDate"
              name="Checkin"
              type="date"
              className="w-full rounded border border-gray-200 px-3 py-2 mt-1.5 outline-none"
              required
            />
          </div>

          <div className="w-px h-18 bg-gray-300/70 max-md:hidden"></div>

          <div>
            <label htmlFor="checkOutDate">Check out</label>
            <input
              id="checkOutDate"
              name="Checkout"
              type="date"
              className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
              required
            />
          </div>

          <div className="w-px h-18 bg-gray-300/70 max-md:hidden"></div>

          <div>
            <label htmlFor="guests">Guests</label>
            <input
              min={1}
              max={5}
              id="guests"
              name="number"
              type="number"
              className="rounded border border-gray-300 px-3 py-1.5 mt-1.5 text-sm outline-none mb-4 w-full"
              placeholder="0"
              required
            />
          </div>

          <div>
            <label htmlFor="Rooms">Rooms</label>
            <input
              min={1}
              max={5}
              id="Rooms"
              name="room"
              type="number"
              className="rounded border border-gray-300 px-3 py-1.5 mt-1.5 text-sm outline-none mb-4 w-full"
              placeholder="0"
              required
            />
          </div>

          <div>
            <label>Extra Options</label>
            <select
              name="extaOptions"
              className="  rounded border dark:bg-gray-800 border-gray-300 px-3 py-2 mt-1.5 w-full md:w-fit outline-none mb-4 "
            >
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="extraBed">extraBed</option>
            </select>
          </div>
        </div>

        <div className="md:flex justify-center items-center">
          <button
            type="submit"
            disabled={loading}
            className={`w-full md:px-18  py-2  px-6 font-semibold  rounded-md text-white  transition duration-200 ${
              isAvailable
                ? "bg-green-600 hover:bg-green-700"
                : " bg-gradient-to-r from-blue-500 to-cyan-500"
            }`}
          >
            {loading
              ? "Checking..."
              : isAvailable
              ? "Book & Pay Now"
              : "Checking Availability  "}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CheckoutForm;
