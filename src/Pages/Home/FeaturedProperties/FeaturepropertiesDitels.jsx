import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import FeaturepropertiesDitelsCard from './FeaturepropertiesDitelsCard';
  const properties = [
  {
    "id": 1,
    "title": "Grand Palace Hotel",
    "img": "https://i.ibb.co.com/78YYvHg/ahmed-rangel-QAzk-ce-Ff-w-unsplash.jpg",
    "price1":220,
    "price": 180,
    "rating": 4.6,
    "ratingimg":"https://i.ibb.co.com/qYXhnbPH/graph.png",
    "guest":4,
    "location": "Paris, France",
    "services": ["Free WiFi", "Spa & Wellness", "Airport Shuttle", "Fitness Center", "Restaurant & Bar"],
    "long_description":"Nestled in the heart of Paris, the Grand Royal Palace offers an unforgettable stay with elegant interiors and modern comfort. Guests enjoy close proximity to iconic landmarks, fine dining, and cultural attractions. Perfect for both romantic escapes and business trips with luxury amenities throughout.",
  },
  {
    "id": 2,
    "title": "Riverside Boutique Hotel",
    "img": "https://i.ibb.co.com/nsV22Z3d/ikshana-productions-mjb-M-086-Tng-unsplash.jpg",
    "price": 120,
     "price1":200,
    "rating": 4.3,
    "ratingimg":"https://i.ibb.co.com/qYXhnbPH/graph.png",
     "guest":2,
    "location": "Prague, Czech Republic",
      "services": ["Swimming Pool", "Free Breakfast", "Concierge Service", "Fitness Center", "Pet Friendly"],
    "long_description": "Overlooking the Mediterranean Sea, Ocean View Retreat combines modern architecture with warm hospitality. Spacious rooms with balconies, stunning views, and top-tier facilities make it a popular choice. Ideal for families and couples seeking relaxation, sunshine, and access to vibrant local culture.",
  },
  {
    "id": 3,
    "title": "Seaside Resort & Spa",
    "img": "https://i.ibb.co.com/LdzxL6c6/sreesanth-p-NHVI1dkl6-WU-unsplash.jpg",
    "price": 200,
     "price1":250,
    "rating": 4.8,
    "ratingimg":"https://i.ibb.co.com/qYXhnbPH/graph.png",
     "guest":4,
    "location": "Barcelona, Spain",
      "services": ["Room Service", "Bar & Lounge", "Laundry Service", "Free WiFi", "Airport Shuttle"],
    "long_description":"Surrounded by the Austrian Alps, Mountain Escape Lodge offers breathtaking scenery and cozy accommodations. Guests can unwind in rustic-style rooms while enjoying access to outdoor adventures. Perfect for skiing in winter, hiking in summer, and experiencing authentic alpine traditions year-round.",
  },
  {
    "id": 4,
    "title": "Mountain View Lodge",
    "img": "https://i.ibb.co.com/vxSD57L9/vojtech-bruzek-Yrxr3bs-Pd-S0-unsplash.jpg",
    "price": 95,
     "price1":120,
    "rating": 4.1,
    "ratingimg":"https://i.ibb.co.com/qYXhnbPH/graph.png",
     "guest":3,
    "location": "Innsbruck, Austria",
    "services": ["Ski Access", "Spa & Sauna", "Restaurant", "Free WiFi", "Fitness Center"],
    "long_description": "Located near the Old Town Square, Historic City Inn captures the charm of Prague with a blend of classic design and modern amenities. Guests enjoy walking distance to historic landmarks, lively cafes, and cultural hotspots, making it ideal for sightseeing and short stays.",
  },
  {
    "id": 5,
    "title": "Historic Royal Inn",
    "img": "https://i.ibb.co.com/Dg9NLZgD/visualsofdana-T5p-L6ci-En-I-unsplash.jpg",
    "price": 150,
     "price1":190,
    "ratingimg":"https://i.ibb.co.com/qYXhnbPH/graph.png",
    "rating": 4.5,
     "guest":2,
    "location": "Edinburgh, Scotland",
     "services": ["Business Center", "Bar & Lounge", "Free WiFi", "Laundry Service", "Concierge Service"],
    "long_description": "Nestled on the shores of Lake Como, this luxury hotel provides an idyllic escape with panoramic views and lush gardens. Guests enjoy gourmet dining, elegant rooms, and direct access to the lake. Ideal for relaxation, weddings, or romantic getaways in a stunning Italian setting.",
  },
  {
    "id": 6,
    "title": "City Center Luxury Suites",
    "img": "https://i.ibb.co.com/psHLNV7/sidath-vimukthi-29z-Da-Mhy-Is-U-unsplash.jpg",
    "price": 210,
     "price1":250,
    "ratingimg":"https://i.ibb.co.com/qYXhnbPH/graph.png",
    "rating": 4.7,
     "guest":2,
    "location": "Rome, Italy",
    "services": ["Free Parking", "Organic Restaurant", "Pet Friendly", "Free WiFi", "Garden & Terrace"],
    "long_description": "City Lights Hotel offers a modern and stylish experience in the vibrant heart of Berlin. With easy access to nightlife, museums, and shopping districts, it provides comfort and convenience. Perfect for travelers seeking a lively urban stay with excellent service and amenities.",
  }
]
const FeaturepropertiesDitels = () => {
const {id }=useParams()
const [data ,setdata]=useState()
useEffect(()=>{
  const ditels = properties.find((propertie)=>propertie.id ==id)
  setdata(ditels)
},[id,properties])
    return (
        <div>
         <FeaturepropertiesDitelsCard data={data}></FeaturepropertiesDitelsCard>
        </div>
    );
};

export default FeaturepropertiesDitels;