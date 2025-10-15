import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addExperience } from "../../redux/experienceSlice";
import axios from "axios";


export default function AddExperience() {
  const dispatch = useDispatch();
  const currentUser =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("currentUser") || "null")
      : null;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [photos, setPhotos] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const name = currentUser?.name || "";
  const email = currentUser?.email || "";

  // 📸 Handle photo file selection
  const handlePhotoChange = (e) => {
    setPhotos(Array.from(e.target.files));
  };

  // 📤 Upload photo files to backend
  const uploadPhotos = async () => {
    if (photos.length === 0) return [];
    const formData = new FormData();
    photos.forEach((file) => formData.append("photos", file));

    try {
      setUploading(true);
      const res = await axios.post(
        "http://localhost:5000/api/experiences/upload", // your upload route
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return res.data.urls; // expecting backend to return { urls: [ ...uploadedImageUrls ] }
    } catch (err) {
      console.error("Upload failed", err);
      alert("Photo upload failed");
      return [];
    } finally {
      setUploading(false);
    }
  };

  // 📝 Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email) {
      const uName = prompt("Enter your name");
      const uEmail = prompt("Enter your email");
      if (!uName || !uEmail) return alert("Name and email required");
      localStorage.setItem("currentUser", JSON.stringify({ name: uName, email: uEmail }));
    }

    try {
      setSubmitting(true);
      const uploadedUrls = await uploadPhotos();

      const payload = {
        name: currentUser?.name || name || JSON.parse(localStorage.getItem("currentUser")).name,
        email: currentUser?.email || email || JSON.parse(localStorage.getItem("currentUser")).email,
        title,
        description,
        location,
        photos: uploadedUrls,
      };

      await dispatch(addExperience(payload)).unwrap();

      setTitle("");
      setDescription("");
      setLocation("");
      setPhotos([]);
      alert("Experience posted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to post experience");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-emerald-600">
        Share Your Travel Experience 🌍
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        {/* Location + Photos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Upload Photos</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handlePhotoChange}
              className="w-full px-2 py-2 border rounded-xl"
            />
            {photos.length > 0 && (
              <p className="text-sm text-gray-600 mt-1">{photos.length} file(s) selected</p>
            )}
          </div>
        </div>

        {/* Preview */}
        {photos.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mt-3">
            {photos.map((file, i) => (
              <img
                key={i}
                src={URL.createObjectURL(file)}
                alt="Preview"
                className="w-full h-28 object-cover rounded-lg border"
              />
            ))}
          </div>
        )}

        {/* Submit */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={uploading || submitting}
            className={`px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 text-white font-semibold ${
              (uploading || submitting) && "opacity-70 cursor-not-allowed"
            }`}
          >
            {uploading
              ? "Uploading Photos..."
              : submitting
              ? "Posting..."
              : "Post Experience"}
          </button>
        </div>
      </form>
    </div>
  );
}
