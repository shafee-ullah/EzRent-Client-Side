import React from "react";
import RatingInput from "./RatingInput";

export default function ExperienceCard({ exp, onRate, onDelete }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">{exp.userName}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{exp.location}</p>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-green-600">
            {exp.avgRating ? Number(exp.avgRating).toFixed(1) : "0.0"}
          </div>
          <div className="text-xs text-gray-500">({exp.ratingsCount || 0})</div>
        </div>
      </div>

      <h3 className="text-lg font-semibold mb-2">{exp.title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{exp.description}</p>

      {exp.photos && exp.photos.length > 0 && (
        <div className="grid grid-cols-2 gap-2 mb-3">
          {exp.photos.slice(0,4).map((p, i) => (
            <img key={i} src={p} alt={`photo-${i}`} className="w-full h-28 object-cover rounded-lg" />
          ))}
        </div>
      )}

      <div className="flex items-center justify-between mt-2">
        <RatingInput experience={exp} onRate={onRate} />
        <button onClick={() => onDelete && onDelete(exp._id)} className="text-sm text-red-600 hover:underline">
          Delete
        </button>
      </div>
    </div>
  );
}
