import React, { useState } from "react";

const Search = ({ hendalSerch }) => {
  const [text, setText] = useState("");

  // live search function
  const handleChange = (e) => {
    const value = e.target.value;
    setText(value);
    hendalSerch(value); // instantly search
  };

  // prevent form reload
  const handleSubmit = (e) => {
    e.preventDefault();
    hendalSerch(text);
  };

  return (
    <div className="space-y-4 my-4">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center items-center">
          <label className="input bg-white border border-black dark:border-white dark:bg-gray-900 md:w-3xl flex items-center gap-2 px-4 py-2 rounded-xl">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>

            <input
              type="search"
              value={text}
              onChange={handleChange}
              placeholder="Search by Property or Location"
              className="flex-1 bg-transparent outline-none text-gray-700 dark:text-gray-200 placeholder-gray-400"
            />
          </label>

          <button
            className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-green-500 text-white font-semibold hover:shadow-xl transition-all duration-300 border-2 py-2 px-8 rounded-xl ml-2 hover:-translate-y-0.5"
            type="submit"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default Search;
