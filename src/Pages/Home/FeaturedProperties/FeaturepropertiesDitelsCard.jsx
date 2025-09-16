import { Server } from 'lucide-react';
import React from 'react';

const FeaturepropertiesDitelsCard = ({data}) => {
 console.log(data)
 const {img,title,price,rating,long_description,ratingimg,price1,services,guest,location}= data ||{}
    return (
        <div className='px-6 md:px-16 lg:px-32 pt-14  h-screen'>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className=" rounded-xl overflow-hidden">
            <img  className="rounded-xl "src={img} alt="" />
          </div>
          <div className="flex flex-col ">
            <h1 className="text-3xl font-medium">
              {title}
            </h1>
            <div className="flex items-center ">
              <img src={ratingimg} alt="" />
              <p>({rating})</p>
            </div>
            <p className="">{long_description}</p>
            <p className="text-3xl font-medium ">
              ${price}
              <span className="text-base font-normal  line-through ml-2">
                ${price1}
              </span>
            </p>
            <hr className="bg-gray-600 " />
             <h1 className='text-3xl font-medium '>Serveces</h1>
            <div className=" flex  gap-12 overflow-x-auto">
                   <div>
                    {
                        services?.map((Serverce)=> <ul>
                        <li>{Serverce}</li>
                        </ul>)
                    }

                   </div>
                    <div>
                      <h1><span className='font-bold'>guest:</span> {guest}</h1>
                      <p><span className='font-bold'>location:</span> {location}</p>
                    </div>
                  {/* <tr>
                  <td className="text-gray-800 ">{services[0]}</td>              
                
                  </tr>
                  <tr>         
                    <td className="text-gray-800 ">{services[1]}</td>
                  </tr>
                  <tr>
                  <td className="text-gray-800">{services[2]}</td>
                   
                  </tr>
                  <tr>
                     <td className="text-gray-800 ">{services[3]}</td>
                  </tr>
                  <tr>
                   <td className="text-gray-800 ">{services[4]}</td>
                  </tr> */}

                  {/* <tr>
                    <td className="text-gray-600 font-medium">location</td>
                    <td className="text-gray-800/50">{location}</td>
                  </tr> */}
              
            </div>

            <div className="flex items-center mt-10 gap-4">
              <button
                className="w-full py-3.5 bg-gray-100 rounded-md text-gray-800/80 hover:bg-gray-200 transition"
              >
                Add to Cart
              </button>
              <button
                
                className="w-full py-3.5 rounded-md bg-[#2b603e] text-white hover:bg-[#16a34a] transition"
              >
                Booking Now
              </button>
            </div>

          </div>
        </div>
        </div>
    );
};

export default FeaturepropertiesDitelsCard;