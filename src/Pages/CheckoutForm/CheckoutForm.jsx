
import React, { useContext } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Context/AuthContext';
// import { useDispatch, useSelector } from 'react-redux';
// import { addProperty } from '../../redux/PropertieSlice';

const CheckoutForm = ({data}) => {
  const {user}=useContext(AuthContext)
  // console.log(user.email)
  // const dispatch = useDispatch();
  // const {  error } = useSelector((state) => state.products);
  // const [booking,setbooking]=useState()
  // console.log(booking)
 const handelcheckout = (e)=>{
 e.preventDefault();
  const form = e.target;
  const formdata = new FormData(form)
  const Updatedata = Object.fromEntries(formdata.entries())
    const  Bookingdata ={
     Checkin: Updatedata.Checkin,
     Checkout:Updatedata.Checkout,
     guest : Updatedata.number,
    id:data._id,
    img:data.image,
    Location:data.Location,
    // rating:data.rating,
    status:"pending",
    price:data.offerPrice,
    email:user?.email,
    name:user?.displayName,
    title:data.name,
    }


fetch('https://ez-rent-server-side.vercel.app/bookinghotel',{
    method:"POST",
    headers:{
       'content-type':'application/json'
    },
    body:JSON.stringify(Bookingdata)
  })
  .then(res=> res.json())
  .then(data=>{
    console.log('after data is',data)
    Swal.fire({
  icon: "success",
  title: "Your hotel booking has been successfully..!",
  showConfirmButton: false,
  timer: 1500
});
  })


 }
 
    return (
       <form onSubmit={handelcheckout} className=' dark:border border-1 shadow-md  w-full rounded-lg px-6 py-4  flex flex-col md:flex-row max-md:items-start gap-14 max-md:mx-auto'>
   
         <div className=' md:flex w-full justify-between  '>
             <div className='md:flex gap-8 space-y-4'>
              <div>
                <div className='flex items-center gap-2 w-full'>
                    <label htmlFor="checkIn">Check in</label>
                </div>
                <input id="checkInDate"  name="Checkin" type="date" className=" w-full rounded border border-gray-200 px-3 py-2 mt-1.5  outline-none" required />
            </div>
 <div className='w-px h-18 bg-gray-300/70 max-md:hidden'></div>
            <div>
                <div className='flex items-center gap-2'>
                    <label htmlFor="checkOut">Check out</label>
                </div>
                <input id="checkOutDate" name="Checkout" type="date" className=" w-full rounded border border-gray-300 px-3 py-2 mt-1.5  outline-none" required />
            </div>

        <div className='w-px h-18 bg-gray-300/70 max-md:hidden'></div>
            <div >
               <div className='flex items-center gap-2'>
                 <label htmlFor="guests">Guests</label>
               </div>
                <input min={1} max={5} id="guests" name="number" type="number" className=" rounded border border-gray-300 px-3 py-1.5 mt-1.5 text-sm outline-none mb-4  w-full" placeholder="0" required />
            </div>
          </div>

           <div className='md:flex justify-center items-center'>
            <button className=' w-full px-16 py-4 font-semibold bg-green-600 rounded-md text-white'> Book Now </button>
           </div>
         </div>
        
        </form>
    );
};

export default CheckoutForm;