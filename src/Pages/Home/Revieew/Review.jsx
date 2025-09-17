import { FaStar } from "react-icons/fa";

const teamReviews = [
  {
    id: 1,
    name: "Shakib",
    location: "Dhaka, Bangladesh",
    image: "https://i.ibb.co.com/Z6DbkhLM/sk8-24-at-09-22-28-1cea5aae.jpg",
    title: "Very Good Apartment",
    rating: 5,
    review:
      "The service was top-notch and the place was exactly as described. The cleanliness and hospitality made my stay very comfortable. Highly recommended!",
  },
  {
    id: 2,
    name: "Airin",
    location: "Chittagong, Bangladesh",
    image: "https://randomuser.me/api/portraits/women/11.jpg",
    title: "Comfortable & Clean Stay",
    rating: 4,
    review:
      "I really enjoyed my time here. The apartment was clean and spacious. The staff was very helpful. Would love to stay again!",
  },
  {
    id: 3,
    name: "Aman",
    location: "Sylhet, Bangladesh",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
    title: "Excellent Service",
    rating: 5,
    review:
      "From check-in to check-out, everything went smoothly. The apartment was modern and comfortable. Great value for money.",
  },
  {
    id: 4,
    name: "Shafi",
    location: "Rajshahi, Bangladesh",
    image: "https://randomuser.me/api/portraits/men/13.jpg",
    title: "Amazing Experience",
    rating: 5,
    review:
      "This was one of the best experiences I’ve ever had. The attention to detail, the service, and the overall vibe were excellent. I would recommend this place to anyone.",
  },
];

const Review = () => {
  return (
    <section className="bg-gray-900 dark:bg-slate-900 max-w-11/12 mx-auto rounded-2xl text-white my-10 py-16 px-6 md:px-12">
      <div className=" text-center">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">
            Meet Our Happy Team
          </h2>
          <button className="text-yellow-400 font-semibold hover:underline">
            MORE REVIEW
          </button>
        </div>

        {/* Review Card */}
        <div className="bg-white text-gray-800 p-8 rounded-lg shadow-lg relative">
          <h3 className="text-lg font-semibold mb-2 flex items-center justify-center gap-2">
            {teamReviews[0].title}
            <span className="flex">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`h-5 w-5 ${
                    i < teamReviews[0].rating
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </span>
          </h3>
          <p className="text-sm md:text-base leading-relaxed">
            {teamReviews[0].review}
          </p>
          <div className="absolute -bottom-5 left-12 w-0 h-0 border-l-[15px] border-r-[15px] border-t-[20px] border-transparent border-t-white"></div>
        </div>

        {/* Team Profiles */}
        <div className="flex justify-center gap-12 mt-12 flex-wrap">
          {teamReviews.map((member) => (
            <div
              key={member.id}
              className="flex flex-col items-center cursor-pointer group"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-16 h-16 rounded-full border-2 border-yellow-400 group-hover:scale-110 transition-transform"
              />
              <h4 className="mt-2 font-semibold">{member.name}</h4>
              <p className="text-sm text-gray-400">{member.location}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Review;
