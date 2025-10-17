import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import FeaturepropertiesDitelsCard from "./FeaturepropertiesDitelsCard";
 import { useDispatch, useSelector } from "react-redux";

const FeaturepropertiesDitels = () => {
  const {id}=useParams()
   const  dispatch = useDispatch()
   const {items,loading, error}=useSelector((state)=>state.products)
  
  const [data, setdata] = useState();
 
  useEffect(() => {
     fetch (`https://ez-rent-server-side.vercel.appFeaturepropertiesDitels/${id}`)
       .then(res => res.json())
      .then(result => setdata(result));
    const ditels = items.find((propertie) => propertie._id == id);
    setdata(ditels);
  }, [id,dispatch]);
  return (
    <div>
      <FeaturepropertiesDitelsCard data={data} loading={loading} error={error}></FeaturepropertiesDitelsCard>
    </div>
  );
};

export default FeaturepropertiesDitels;
