// client/src/components/ExperienceFeed.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadExperiences, submitRating, removeExperience } from "../../redux/experienceSlice";
import ExperienceCard from "./ExperienceCard";

export default function ExperienceFeed() {
  const dispatch = useDispatch();
  const experiences = useSelector(s => s.experience.items || []);
  const loading = useSelector(s => s.experience.loading);

  useEffect(() => {
    dispatch(loadExperiences());
  }, [dispatch]);

  const handleRate = async (id, value) => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
    if (!currentUser || !currentUser.email) {
      const email = prompt("Enter your email to rate:");
      if (!email) return alert("Email required to rate");
      localStorage.setItem("currentUser", JSON.stringify({ name: "Anonymous", email }));
    }

    const raterEmail = (JSON.parse(localStorage.getItem("currentUser")) || {}).email;
    try {
      await dispatch(submitRating({ id, payload: { raterEmail, value } })).unwrap();
      alert("Thanks for rating!");
    } catch (err) {
      alert(err?.message || "Failed to rate");
    }
  };

  const handleDelete = async (id) => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
    if (!currentUser || !currentUser.email) return alert("You must provide the same email used to post to delete");
    try {
      await dispatch(removeExperience({ id, payload: { email: currentUser.email } })).unwrap();
      alert("Deleted");
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4 text-emerald-600">Guest Experiences</h2>
      {loading && <div>Loading...</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {experiences.map(exp => (
          <ExperienceCard key={String(exp._id)} exp={exp} onRate={handleRate} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}
