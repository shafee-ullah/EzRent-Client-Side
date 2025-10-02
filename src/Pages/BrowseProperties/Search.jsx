import React, { useState } from 'react';

const Search = ({hendalSerch}) => {
      const [serchtext,  setserchtext ] =useState('')
    return (
           <div className=' 
        space-y-4 my-4  '>
          <form onSubmit={ (e)=>hendalSerch(e,serchtext)}>
             <div className=' flex justify-center items-center'>
          <label className="input bg-white  border-black dark:border-white dark:bg-gray-900 md:w-3xl">
  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
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
  onChange={e=>setserchtext(e.target.value)}
  value={serchtext}
   type="search" required placeholder="Search" />
</label>
 <button className='hover:bg-green-600 text-green-300   border-2 py-2 px-4 rounded-md ml-2 font-semibold' type='submit' > search</button>
           </div>
          </form>
          </div>
    );
};

export default Search;