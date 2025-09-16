import React from 'react';
import { CiLocationOn } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { CiCalendar } from "react-icons/ci";
import { IoMdContacts } from "react-icons/io";
import { Link } from 'react-router';
  const properties = [
  {
    "id": 1,
    "title": "Grand Palace Hotel",
    "img": "https://i.ibb.co.com/78YYvHg/ahmed-rangel-QAzk-ce-Ff-w-unsplash.jpg",
    "price": 180,
    "rating": 4.6,
    "guest":4,
    "location": "Paris, France",
    "long_description": "A luxurious 5-star hotel located in the heart of Paris, offering elegant rooms, fine dining, and a rooftop terrace with a view of the Eiffel Tower."
  },
  {
    "id": 2,
    "title": "Riverside Boutique Hotel",
    "img": "https://i.ibb.co.com/nsV22Z3d/ikshana-productions-mjb-M-086-Tng-unsplash.jpg",
    "price": 120,
    "rating": 4.3,
     "guest":2,
    "location": "Prague, Czech Republic",
    "long_description": "A cozy boutique hotel situated along the Vltava River, featuring modern rooms, a wine bar, and easy access to Charles Bridge and Old Town Square."
  },
  {
    "id": 3,
    "title": "Seaside Resort & Spa",
    "img": "https://i.ibb.co.com/LdzxL6c6/sreesanth-p-NHVI1dkl6-WU-unsplash.jpg",
    "price": 200,
    "rating": 4.8,
     "guest":4,
    "location": "Barcelona, Spain",
    "long_description": "A beachside resort with a full-service spa, infinity pool, and Mediterranean cuisine, perfect for both relaxation and vibrant nightlife nearby."
  },
  {
    "id": 4,
    "title": "Mountain View Lodge",
    "img": "https://i.ibb.co.com/vxSD57L9/vojtech-bruzek-Yrxr3bs-Pd-S0-unsplash.jpg",
    "price": 95,
    "rating": 4.1,
     "guest":3,
    "location": "Innsbruck, Austria",
    "long_description": "A charming alpine lodge offering panoramic mountain views, traditional Austrian breakfasts, and quick access to skiing and hiking trails."
  },
  {
    "id": 5,
    "title": "Historic Royal Inn",
    "img": "https://i.ibb.co.com/Dg9NLZgD/visualsofdana-T5p-L6ci-En-I-unsplash.jpg",
    "price": 150,
    "rating": 4.5,
     "guest":2,
    "location": "Edinburgh, Scotland",
    "long_description": "Located near Edinburgh Castle, this inn combines rich history with modern comfort, featuring antique-style rooms and a traditional Scottish restaurant."
  },
  {
    "id": 6,
    "title": "City Center Luxury Suites",
    "img": "https://i.ibb.co.com/psHLNV7/sidath-vimukthi-29z-Da-Mhy-Is-U-unsplash.jpg",
    "price": 210,
    "rating": 4.7,
     "guest":2,
    "location": "Rome, Italy",
    "long_description": "Elegant suites in central Rome, offering spacious accommodations, rooftop dining, and walking distance to the Colosseum and Trevi Fountain."
  }
]

const FeaturedPropertiesCard = () => {
    return (
        <div>
          <div className="mt-14">
      <div className="flex flex-col items-center">
        <p className="text-3xl font-medium">Featured properties </p>
        <div className="w-28 h-0.5 bg-[#16a34a] mt-2"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-8 mt-12 md:px-14 px-4">
        {properties.map((propertie) => (
          <div key={propertie.id} className="relative group  shadow-lg   rounded-2xl">
            <img
              src={propertie.img}
            //   alt={propertie.title}
              className="group-hover:brightness-75 transition duration-300 w-full  h-64 auto object-cover rounded-tr-2xl rounded-tl-2xl "
            />
          <div className='p-4 bg-white  rounded-2xl space-y-2'>
            <div className='flex justify-between '>
             <div className='flex justify-center items-center gap-1 font-bold'>
              <CiLocationOn size={18} />
             <p > {propertie.location}</p>
             </div>
        
          <div className='flex justify-center items-center gap-1 '>
          <FaStar className='text-amber-400' />
            <p > {propertie.rating}</p>
          </div>
        
            </div>
           
            <h1 className='text-xl '>{propertie.title}</h1>
            {/* <p>{propertie.long_description.slice(0,50)}...</p> */}
          <div className='flex justify-between'>
             <div className='flex justify-center items-center gap-1'>
             <IoMdContacts size={24} />
            <p>{propertie.guest} guests</p>
           </div>
            <p className='font-bold'>${propertie.price}/night</p>
          </div>
            <div className='flex justify-center items-center '>
              <Link className='w-full' to={`/FeaturepropertiesDitels/${propertie.id}`}> 
                 <button className='  p-2 hover:bg-[#16a34a] w-full flex justify-center items-center rounded-md font-bold text-white gap-1 bg-[#186034]'>  <CiCalendar  size={18}/>Quick Book</button>
                 </Link>
            </div>
           
          </div>
          </div>
        ))}
      </div>
    </div>
        </div>
    );
};

export default FeaturedPropertiesCard;