// import React, { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { AuthContext } from "../../Context/AuthContext";

// const CheckoutForm = ({ data }) => {
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [extras, setExtras] = useState({
//     breakfast: false,
//     airportPickup: false,
//     extraBed: false,
//   });
//   const [submitting, setSubmitting] = useState(false);

//   const handelcheckout = (e) => {
//     e.preventDefault();
//     const form = e.target;
//     const formdata = new FormData(form);
//     const Updatedata = Object.fromEntries(formdata.entries());

//     // Calculate extra cost
//     let extraCost = 0;
//     if (extras.breakfast) extraCost += 20;
//     if (extras.airportPickup) extraCost += 30;
//     if (extras.extraBed) extraCost += 25;

//     const Bookingdata = {
//       Checkin: Updatedata.Checkin,
//       Checkout: Updatedata.Checkout,
//       adults: Updatedata.adults,
//       children: Updatedata.children,
//       rooms: Updatedata.rooms,
//       guest: parseInt(Updatedata.adults) + parseInt(Updatedata.children),
//       extras,
//       extraCost,
//       id: data._id,
//       img: data.image,
//       Location: data.Location,
//       hostemail: data.email,
//       hostname: data.Name,
//       status: "pending",
//       price: data.offerPrice,
//       email: user?.email,
//       name: user?.displayName,
//       title: data.name,
//     };

//     setSubmitting(true);

//     fetch("https://ezrent-backend.vercel.appbookinghotel", {
//       method: "POST",
//       headers: { "content-type": "application/json" },
//       body: JSON.stringify(Bookingdata),
//     })
//       .then((res) => res.json())
//       .then((bookingResult) => {
//         const paymentData = {
//           bookingId: bookingResult.insertedId || bookingResult._id,
//           userId: user?.uid || user?.email,
//           userName: user?.displayName || "Guest User",
//           userEmail: user?.email,
//           propertyName: data.name,
//           propertyLocation: data.Location,
//           checkIn: Updatedata.Checkin,
//           checkOut: Updatedata.Checkout,
//           guests: Bookingdata.guest,
//           rooms: Updatedata.rooms,
//           amount: data.offerPrice,
//           totalPrice: data.offerPrice,
//           propertyImage: data.image,
//           bookingData: Bookingdata,
//         };

//         Swal.fire({
//           icon: "success",
//           title: "Booking created successfully!",
//           text: "Redirecting to payment...",
//           showConfirmButton: false,
//           timer: 1500,
//         }).then(() => {
//           navigate("/payment", {
//             state: { bookingData: paymentData, fromBooking: true },
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
//       })
//       .finally(() => setSubmitting(false));
//   };

//   return (
//     <form
//       onSubmit={handelcheckout}
//       className="dark:border border-1 shadow-md w-full rounded-lg px-6 py-4 flex flex-col md:flex-row max-md:items-start gap-14 max-md:mx-auto"
//     >
//       <div className="md:flex w-full justify-between gap-6">
//         {/* Guest / Room Inputs */}
//         <div className="md:flex gap-8 space-y-4">
//           <div>
//             <label>Check in</label>
//             <input
//               name="Checkin"
//               type="date"
//               className="w-full rounded border border-gray-200 px-3 py-2 mt-1.5 outline-none"
//               required
//             />
//           </div>
//           <div>
//             <label>Check out</label>
//             <input
//               name="Checkout"
//               type="date"
//               className="w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none"
//               required
//             />
//           </div>
//           <div>
//             <label>Guest</label>
//             <input
//               type="number"
//               name="adults"
//               min={1}
//               max={10}
//               defaultValue={1}
//               className="rounded border border-gray-300 px-3 py-1.5 mt-1.5 w-full outline-none"
//               required
//             />
//           </div>

//           <div>
//             <label>Rooms</label>
//             <input
//               type="number"
//               name="rooms"
//               min={1}
//               max={5}
//               defaultValue={1}
//               className="rounded border border-gray-300 px-3 py-1.5 mt-1.5 w-full outline-none"
//               required
//             />
//           </div>
//         </div>

//         <div>
//               <label> Extra Options </label>
//               <select
//                 name="extaOptions"
//                 className= "rounded border border-gray-300 px-3 py-2 mt-1.5 w-full outline-none"
//               >
//                 <option value="">Breakfast</option>
//                 <option value="Flexible">Lunch</option>
//                 <option value="Moderate">Dinner</option>
//                 <option value="Strict">extraBed</option>
//               </select>
//             </div>
//       </div>

//       {/* Book & Pay Button */}
//       <div className="md:flex justify-center items-center mt-6 md:mt-0">
//         <button
//           type="submit"
//           disabled={submitting}
//           className="w-full px-16 py-2 font-semibold bg-green-600 rounded-md text-white hover:bg-green-700 transition duration-200"
//         >
//           {submitting ? "Processing..." : "Book & Pay Now"}
//         </button>
//       </div>

//     </form>

//   );
// };

// export default CheckoutForm;

import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthContext";

const CheckoutForm = ({ data }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log(user);
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
      hostemail: data.email,
      hostname: data.Name,
      status: "pending",
      price: data.price,
      email: user?.email,
      name: user?.displayName,
      title: data.name,
    };

    // Create booking first, then redirect to payment
    fetch("https://ezrent-backend.vercel.app/bookinghotel", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(Bookingdata),
    })
      .then((res) => res.json())
      .then((bookingResult) => {
        console.log("Booking created:", bookingResult);

        // Prepare payment data
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
          amount: data.Price,
          totalPrice: data.Price,
          propertyImage: data.image,
          bookingData: Bookingdata,
        };

        // Show success message and redirect to payment
        Swal.fire({
          icon: "success",
          title: "Booking created successfully!",
          text: "Redirecting to payment...",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          // Navigate to payment page with booking data
          navigate("/payment", {
            state: {
              bookingData: paymentData,
              fromBooking: true,
            },
          });
        });
      })
      .catch((error) => {
        console.error("Booking error:", error);
        Swal.fire({
          icon: "error",
          title: "Booking Failed",
          text: "There was an error creating your booking. Please try again.",
          confirmButtonText: "OK",
        });
      });
  };

  return (
    <form
      onSubmit={handelcheckout}
      className=" dark:border border-1 shadow-md  w-full rounded-lg px-6 py-4  flex flex-col md:flex-row max-md:items-start gap-14 max-md:mx-auto"
    >
      <div className=" md:flex w-full justify-between  ">
        <div className="md:flex gap-8 space-y-4">
          <div>
            <div className="flex items-center gap-2 w-full">
              <label htmlFor="checkIn">Check in</label>
            </div>
            <input
              id="checkInDate"
              name="Checkin"
              type="date"
              className=" w-full rounded border border-gray-200 px-3 py-2 mt-1.5  outline-none"
              required
            />
          </div>
          <div className="w-px h-18 bg-gray-300/70 max-md:hidden"></div>
          <div>
            <div className="flex items-center gap-2">
              <label htmlFor="checkOut">Check out</label>
            </div>
            <input
              id="checkOutDate"
              name="Checkout"
              type="date"
              className=" w-full rounded border border-gray-300 px-3 py-2 mt-1.5  outline-none"
              required
            />
          </div>

          <div className="w-px h-18 bg-gray-300/70 max-md:hidden"></div>
          <div>
            <div className="flex items-center gap-2">
              <label htmlFor="guests">Guests</label>
            </div>
            <input
              min={1}
              max={5}
              id="guests"
              name="number"
              type="number"
              className=" rounded border border-gray-300 px-3 py-1.5 mt-1.5 text-sm outline-none mb-4  w-full"
              placeholder="0"
              required
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <label htmlFor="Rooms">Rooms</label>
            </div>
            <input
              min={1}
              max={5}
              id="Rooms"
              name="room"
              type="number"
              className=" rounded border border-gray-300 px-3 py-1.5 mt-1.5 text-sm outline-none mb-4  w-full"
              placeholder="0"
              required
            />
          </div>

          <div>
            <label> Extra Options </label>
            <select
              type="text"
              name="extaOptions"
              className="rounded border  dark:bg-gray-800 border-gray-300 px-3 py-2 mt-1.5 w-full outline-none"
            >
              <option value="">Breakfast</option>
              <option value="Flexible">Lunch</option>
              <option value="Moderate">Dinner</option>
              <option value="Strict">extraBed</option>
            </select>
          </div>
        </div>

        <div className="md:flex justify-center items-center">
          <button className=" w-full px-16 py-4 font-semibold bg-green-600 rounded-md text-white hover:bg-green-700 transition duration-200">
            {" "}
            Book & Pay Now{" "}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CheckoutForm;
