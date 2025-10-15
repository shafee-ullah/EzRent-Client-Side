// client/src/components/RatingInput.jsx
import React, { useState } from "react";

export default function RatingInput({ experience, onRate }) {
  const [value, setValue] = useState("");

  const handleRate = async () => {
    const val = parseInt(value, 10);
    if (!val || val < 1 || val > 10) return alert("Please enter a rating 1-10");
    if (!onRate) return;
    await onRate(experience._id, val);
    setValue("");
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="number"
        min="1"
        max="10"
        className="w-16 px-3 py-1 rounded-xl border"
        placeholder="1-10"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={handleRate} className="px-3 py-1 rounded-xl bg-emerald-600 text-white text-sm">Rate</button>
    </div>
  );
}
