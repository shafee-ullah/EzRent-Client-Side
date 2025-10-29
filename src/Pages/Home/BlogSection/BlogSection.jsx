import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, User, Clock, ArrowRight, MapPin, Heart, TrendingUp, Compass, X } from "lucide-react";

const MotionDiv = motion.div;
const MotionSection = motion.section;

// Move blogPosts to top level so you can easily update it
// To add new posts, simply add objects to this array
const blogPosts = [
  {
    id: 1,
    title: "10 Hidden Gems in Bangladesh You Must Visit This Season",
    excerpt: "Discover off-the-beaten-path destinations that offer authentic cultural experiences and breathtaking landscapes away from the crowds.",
    image: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?q=80&w=600&auto=format&fit=crop",
    category: "Travel Guides",
    readTime: "6 min read",
    author: "Travel Bangladesh",
    date: "March 15, 2024",
    tags: ["Bangladesh", "Hidden Gems", "Culture"],
    gradient: "from-blue-500 to-cyan-500",
    fullContent: {
      intro: "Bangladesh is a treasure trove of unexplored destinations that offer authentic experiences away from typical tourist crowds. Here are 10 hidden gems that will transform your perspective of this beautiful country.",
      sections: [
        {
          title: "1. Ratargul Swamp Forest",
          content: "Often called the 'Amazon of Bangladesh,' this freshwater swamp forest in Sylhet is a mystical wonderland. During monsoon season, the forest floods, creating an enchanting landscape where you can boat through submerged trees. The biodiversity here is remarkable, with numerous bird species and aquatic life thriving in this unique ecosystem."
        },
        {
          title: "2. Boga Lake, Bandarban",
          content: "Nestled at 1,246 feet above sea level, Boga Lake is a natural marvel surrounded by hills and indigenous villages. The crystal-clear blue water is believed to be bottomless by locals. The trek to reach this serene lake takes you through dense forests and traditional Bawm tribal settlements, offering cultural insights alongside natural beauty."
        },
        {
          title: "3. Nijhum Dwip",
          content: "This remote island in the Bay of Bengal is a sanctuary for spotted deer and diverse bird species. Accessible by boat, Nijhum Dwip offers pristine beaches, mangrove forests, and a peaceful escape from urban life. The island's name means 'Silent Island,' perfectly capturing its tranquil atmosphere."
        },
        {
          title: "4. Mahasthangarh",
          content: "As one of the earliest urban archaeological sites in Bangladesh, Mahasthangarh dates back to the 3rd century BCE. The ancient ruins near Bogra reveal the grandeur of the Pundranagara kingdom. Walk among centuries-old fortifications and temples while imagining life in this historic city."
        },
        {
          title: "5. Lalakhal",
          content: "The tea-colored waters of Lalakhal in Sylhet create a surreal landscape. The river's unique color comes from minerals in the surrounding hills. Take a boat ride through this ethereal setting, surrounded by hills, tea gardens, and traditional villages."
        }
      ],
      conclusion: "These hidden gems represent just a fraction of Bangladesh's undiscovered beauty. Each destination offers unique experiences, from natural wonders to cultural treasures, waiting to be explored by adventurous travelers."
    }
  },
  {
    id: 2,
    title: "Sustainable Travel: How to Explore Responsibly in 2024",
    excerpt: "Learn practical tips for reducing your environmental impact while traveling and supporting local communities.",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=600&auto=format&fit=crop",
    category: "Sustainable Travel",
    readTime: "5 min read",
    author: "Eco Traveler",
    date: "March 12, 2024",
    tags: ["Sustainability", "Eco-Friendly", "Tips"],
    gradient: "from-emerald-500 to-green-500",
    fullContent: {
      intro: "As travelers, we have a responsibility to protect the destinations we visit. Sustainable travel isn't just a trend—it's a necessity for preserving our planet's beauty and supporting local communities for generations to come.",
      sections: [
        {
          title: "Choose Eco-Friendly Transportation",
          content: "Opt for trains and buses over flights when possible. In Bangladesh, the railway system offers scenic routes connecting major cities. For shorter distances, consider cycling or walking to reduce your carbon footprint while experiencing destinations more intimately. When flying is necessary, choose direct routes and consider carbon offset programs."
        },
        {
          title: "Support Local Economies",
          content: "Stay in locally-owned guesthouses and eat at family-run restaurants. Buy handicrafts directly from artisans rather than souvenir shops. In Bangladesh, purchasing products from social enterprises like Aarong or local cooperatives ensures your money benefits communities. Hire local guides who can provide authentic insights while earning fair wages."
        },
        {
          title: "Minimize Plastic Waste",
          content: "Carry a reusable water bottle with filtration capabilities, pack cloth shopping bags, and refuse single-use plastics. In Bangladesh, plastic pollution is a significant challenge. Bring a reusable coffee cup, metal straws, and bamboo utensils. Choose accommodations that have eliminated single-use plastics from their operations."
        },
        {
          title: "Respect Local Culture and Wildlife",
          content: "Research and follow local customs, dress appropriately, and ask permission before photographing people. Avoid attractions that exploit animals. In Bangladesh, this means refusing elephant rides and visiting ethical wildlife sanctuaries instead. Learn basic phrases in Bengali to show respect and facilitate genuine connections."
        },
        {
          title: "Conserve Resources",
          content: "Be mindful of water and energy consumption. Take shorter showers, reuse towels, turn off lights and air conditioning when leaving your room. In water-scarce areas of Bangladesh, this consciousness is particularly important. Choose accommodations with green certifications and renewable energy sources."
        }
      ],
      conclusion: "Sustainable travel requires conscious decisions at every step of your journey. By implementing these practices, you contribute to environmental conservation and community well-being while enjoying richer, more meaningful travel experiences."
    }
  },
  {
    id: 3,
    title: "The Ultimate Packing Checklist for Southeast Asia",
    excerpt: "Never forget essential items again with our comprehensive packing guide tailored for tropical climates.",
    image: "https://images.unsplash.com/photo-1600714480856-dc99b28892eb?q=80&w=2070&auto=format&fit=crop",
    category: "Travel Tips",
    readTime: "5 min read",
    author: "Packing Pro",
    date: "March 10, 2024",
    tags: ["Packing", "Checklist", "Asia"],
    gradient: "from-amber-500 to-orange-500",
    fullContent: {
      intro: "Packing for Southeast Asia's tropical climate requires careful consideration. Too much and you'll struggle with heavy luggage; too little and you'll be unprepared. This comprehensive checklist ensures you have everything needed for a comfortable journey.",
      sections: [
        {
          title: "Clothing Essentials",
          content: "Pack lightweight, breathable fabrics like cotton and linen. Bring 4-5 quick-dry t-shirts, 2-3 pairs of shorts, one pair of long pants, a light jacket for air-conditioned spaces, and a rain jacket. Include modest clothing for temple visits: long pants/skirts and shirts covering shoulders. Don't forget swimwear, a wide-brimmed hat, and comfortable walking sandals plus sneakers."
        },
        {
          title: "Health and Hygiene",
          content: "Essential items include sunscreen (SPF 50+), insect repellent with DEET, hand sanitizer, basic first-aid kit with bandages and antiseptic, prescription medications in original containers, and anti-diarrheal medication. Bring tampons/pads as they can be expensive. Pack a small towel that dries quickly and biodegradable toiletries to minimize environmental impact."
        },
        {
          title: "Electronics and Documents",
          content: "Carry a universal power adapter, portable charger, waterproof phone case, and backup storage for photos. Keep physical and digital copies of your passport, visa, travel insurance, vaccination records, and emergency contacts. A money belt or hidden pouch for valuables is essential. Download offline maps and translation apps before departure."
        },
        {
          title: "Practical Items",
          content: "Don't forget a reusable water bottle with filter, daypack for excursions, ziplock bags for organizing and waterproofing, travel locks for hostel lockers, sarong (multipurpose: beach towel, temple cover-up, blanket), earplugs and eye mask for better sleep, and a book or e-reader for downtime. A small padlock secures your luggage during transit."
        },
        {
          title: "What to Leave Behind",
          content: "Skip expensive jewelry, excessive clothing (you can wash or buy locally), hair dryers (most accommodations provide them), large bottles of toiletries (buy locally or refill), and too many shoes. Remember: you can purchase most forgotten items in Southeast Asian cities, often at lower prices than home."
        }
      ],
      conclusion: "This checklist balances preparation with practicality. Adapt it to your specific needs and destination, but remember: experienced travelers often say they packed too much, never too little. When in doubt, leave it out!"
    }
  },
  {
    id: 4,
    title: "Local Cuisine Tour: Must-Try Foods in Dhaka",
    excerpt: "From street food to fine dining, explore the vibrant culinary scene of Bangladesh's capital city.",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=600&auto=format&fit=crop",
    category: "Food & Drink",
    readTime: "7 min read",
    author: "Food Explorer",
    date: "March 8, 2024",
    tags: ["Food", "Dhaka", "Local"],
    gradient: "from-purple-500 to-pink-500",
    fullContent: {
      intro: "Dhaka's food scene is a sensory explosion of flavors, aromas, and textures. From bustling street corners to elegant restaurants, the city offers culinary adventures that reflect its rich cultural heritage and modern innovation.",
      sections: [
        {
          title: "Kacchi Biriyani",
          content: "No visit to Dhaka is complete without experiencing authentic Kacchi Biriyani. This royal dish features marinated mutton cooked with fragrant basmati rice, saffron, and aromatic spices in a sealed pot. Head to Haji Biriyani in Old Dhaka for the most legendary version, or try Fakruddin for a more upscale experience. The meat falls off the bone, and the rice absorbs all the incredible flavors. Best enjoyed with a side of borhani (spiced yogurt drink) and a fiery green chili."
        },
        {
          title: "Fuchka (Pani Puri)",
          content: "These crispy, hollow spheres filled with spiced potatoes and tangy tamarind water are Dhaka's most beloved street snack. Watch vendors expertly prepare each fuchka, filling them with a mixture of mashed potatoes, chickpeas, and spices before dunking them in flavored water. The best fuchka vendors are found near TSC at Dhaka University and in front of Aziz Market. The explosion of flavors—sweet, spicy, tangy—makes them utterly addictive."
        },
        {
          title: "Beef Tehari",
          content: "A specialty of Old Dhaka, beef tehari is aromatic rice cooked with tender beef, potatoes, and a blend of spices that's less rich than biriyani but equally flavorful. Nanna Biriyani House and Haji Nanna are legendary spots for this dish. Typically served for breakfast, tehari represents the city's Mughal culinary heritage. The meat is incredibly tender, and the rice has a distinctive yellow color from turmeric."
        },
        {
          title: "Shorshe Ilish (Hilsa in Mustard Sauce)",
          content: "Hilsa fish is Bangladesh's national fish and a source of immense pride. The most traditional preparation involves cooking it in a pungent mustard sauce with green chilies. While intimidating for newcomers due to numerous bones, mastering the art of eating ilish is a rite of passage. Visit traditional Bengali restaurants like Kasturi or Izumi for expertly prepared versions. The combination of the fish's natural oils with sharp mustard creates an unforgettable flavor."
        },
        {
          title: "Street Chai and Snacks",
          content: "Dhaka's street tea culture is an experience in itself. Roadside stalls serve strong, sweet milk tea in small clay cups called 'bhaar.' Pair your chai with samosas, jilapi (crispy orange swirls of fried dough soaked in syrup), or singara (triangular savory pastries). The tea stall near Shahbag or any corner of Old Dhaka offers authentic experiences. These moments of slowing down with locals over chai provide insight into daily Dhaka life."
        }
      ],
      conclusion: "Dhaka's culinary landscape tells the story of its history, from Mughal influences to contemporary fusion. Don't be afraid to eat street food—it's often the most delicious and authentic. Just choose busy stalls with high turnover for freshness and safety."
    }
  },
  {
    id: 5,
    title: "Budget Travel: How to Save on Accommodation Without Sacrificing Comfort",
    excerpt: "Smart strategies to find affordable yet comfortable stays during your travels across Bangladesh.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600&auto=format&fit=crop",
    category: "Budget Travel",
    readTime: "4 min read",
    author: "Budget Traveler",
    date: "March 5, 2024",
    tags: ["Budget", "Savings", "Tips"],
    gradient: "from-red-500 to-rose-500",
    fullContent: {
      intro: "Comfortable accommodation doesn't have to drain your travel budget. With smart strategies and flexibility, you can find clean, safe, and comfortable places to stay while keeping plenty of money for experiences and adventures.",
      sections: [
        {
          title: "Book Strategically",
          content: "Timing is everything in budget accommodation. Book during off-peak seasons for significant discounts—Bangladesh's shoulder seasons (October-November and March-April) offer great weather with lower prices. Use booking platforms' filters for 'free cancellation' so you can rebook if prices drop. Consider booking longer stays for weekly or monthly discounts. In cities like Dhaka and Chittagong, mid-week bookings are often cheaper than weekends."
        },
        {
          title: "Choose Alternative Accommodations",
          content: "Look beyond traditional hotels. Guesthouses run by local families offer authentic experiences at fraction of hotel costs. In Bangladesh, many homeowners rent rooms through local Facebook groups and community boards. Consider university dormitories during summer breaks, which sometimes offer budget rooms to travelers. Hostels in Dhaka and Cox's Bazar provide social atmospheres and often include breakfast, saving money and facilitating connections with other travelers."
        },
        {
          title: "Location Trade-offs",
          content: "Staying slightly outside tourist centers can save 40-50% on accommodation costs. In Dhaka, areas like Mohammadpur or Mirpur offer cheaper options than Gulshan or Banani, with good transport connections. Research public transportation routes before booking. Sometimes paying a bit more for a central location saves money on daily transport costs. Calculate the total cost including transportation to determine true value."
        },
        {
          title: "Negotiate and Bundle",
          content: "Don't hesitate to negotiate, especially for longer stays or during low season. Contact accommodations directly rather than through booking platforms—they often offer better rates without commission fees. Ask about package deals including meals or transportation. In Bangladesh, bundling breakfast or airport transfers often provides better value than booking separately. Building rapport with staff can lead to upgrades or extended checkout times."
        },
        {
          title: "Essential Comfort Criteria",
          content: "Budget doesn't mean uncomfortable. Prioritize: cleanliness (read recent reviews carefully), secure locks and safe location, functioning air conditioning or fan in hot climates, reliable hot water, and strong Wi-Fi if you need to work. Verify these basics before booking. In Bangladesh, ensure the accommodation has backup power during load shedding. A slightly higher price for these essentials prevents miserable experiences that could cost more to fix."
        }
      ],
      conclusion: "Smart accommodation choices free up budget for experiences, food, and adventures. The key is finding the sweet spot between cost and comfort that matches your travel style. Remember: the best accommodation is one you barely spend time in because you're too busy exploring!"
    }
  },
  {
    id: 6,
    title: "Seasonal Guide: Best Times to Visit Cox's Bazar",
    excerpt: "Plan your perfect beach getaway with our month-by-month guide to weather, crowds, and events.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop",
    category: "Seasonal Guide",
    readTime: "5 min read",
    author: "Beach Expert",
    date: "March 3, 2024",
    tags: ["Beach", "Seasonal", "Cox's Bazar"],
    gradient: "from-teal-500 to-cyan-500",
    fullContent: {
      intro: "Cox's Bazar, home to the world's longest natural sea beach, offers different experiences throughout the year. Understanding seasonal variations helps you plan the perfect beach vacation matching your preferences for weather, crowds, and budget.",
      sections: [
        {
          title: "Peak Season (November to February)",
          content: "These months offer the best weather—clear skies, comfortable temperatures (20-28°C), low humidity, and calm seas perfect for swimming. This is peak tourist season, especially during winter holidays and Bengali New Year. Expect crowded beaches, higher accommodation prices (often double low-season rates), and advance booking requirements. The advantage? Perfect beach weather, all water activities available, and festive atmosphere. Book 2-3 months ahead for better rates and selection. Despite crowds, the comfortable weather makes it worthwhile for beach lovers."
        },
        {
          title: "Shoulder Season (October and March)",
          content: "These transition months offer the sweet spot for many travelers. October sees monsoon ending with occasional rain but fewer tourists and lower prices. March brings warming temperatures before the hot season, with beautiful sunsets and reasonable rates. You'll find 30-40% discounts on accommodation compared to peak season. Beaches are less crowded, allowing peaceful walks along the 120km coastline. Weather is generally good with some unpredictability. Perfect for photographers—dramatic cloud formations and golden light create stunning conditions."
        },
        {
          title: "Hot Season (April to May)",
          content: "Temperatures soar to 35-40°C with high humidity. This is the least popular time for tourists, resulting in the best deals—accommodation can be 50-60% cheaper than peak season. If you can handle heat, you'll have beaches almost to yourself. Early mornings and evenings are pleasant for beach activities. Many locals visit during Bengali New Year (mid-April), creating a brief cultural experience. Consider it if you prioritize budget and solitude over perfect weather. Stay hydrated and use high SPF sunscreen."
        },
        {
          title: "Monsoon Season (June to September)",
          content: "The monsoon brings heavy rainfall, rough seas, and occasional cyclone risks. Most water activities are suspended for safety. However, this season has its appeal for specific travelers: massive discounts on everything (accommodation, food, transport), dramatically beautiful stormy seascapes, experiencing local life without tourism, and lush green surroundings. Not recommended for first-time visitors or those specifically seeking beach activities. Perfect for writers, artists, and travelers seeking solitude and reflection."
        },
        {
          title: "Special Events and Considerations",
          content: "Plan around these events: Bengali New Year (Pohela Boishakh, mid-April) sees huge crowds and celebrations; Eid holidays bring domestic tourists—avoid if you want peace, embrace if you want cultural immersion; full moon nights offer magical beach experiences year-round; fishing festivals occur in winter months. For the best value and experience, visit in November (early peak season with good availability) or October (shoulder season with great weather). Avoid late December and early January unless you book months ahead."
        }
      ],
      conclusion: "Cox's Bazar rewards flexible travelers willing to adjust expectations based on season. There's no 'wrong' time to visit—only different experiences. Consider your priorities: perfect weather, budget, crowds, or unique seasonal attractions, then choose accordingly."
    }
  }
];

const BlogCard = ({ post, index, onReadMore }) => {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className={`absolute top-4 left-4 px-3 py-1 rounded-full bg-gradient-to-r ${post.gradient} text-white text-xs font-semibold`}>
          {post.category}
        </div>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {post.date}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {post.readTime}
          </div>
        </div> */}

        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
          {post.title}
        </h3>

        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {post.author}
            </span>
          </div>

          <button
            onClick={() => onReadMore(post)}
            className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold text-sm hover:gap-2 transition-all duration-300 cursor-pointer"
          >
            Read More
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full text-xs"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Hover Effect */}
      <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${post.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`} />
    </MotionDiv>
  );
};

const BlogModal = ({ post, onClose }) => {
  if (!post) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors"
          >
            <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </button>

          {/* Scrollable Content */}
          <div className="overflow-y-auto max-h-[90vh]">
            {/* Header Image */}
            <div className="relative h-64 overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${post.gradient} opacity-20`} />
              <div className={`absolute bottom-4 left-4 px-4 py-2 rounded-full bg-gradient-to-r ${post.gradient} text-white text-sm font-semibold`}>
                {post.category}
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              {/* Meta Info */}
              <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400 mb-4">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {post.author}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </div>
              </div>

              {/* Title */}
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {post.title}
              </h2>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Full Content */}
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  {post.fullContent.intro}
                </p>

                {post.fullContent.sections.map((section, index) => (
                  <div key={index} className="mb-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {section.title}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                ))}

                <div className={`p-6 rounded-xl bg-gradient-to-r ${post.gradient} bg-opacity-10 dark:bg-opacity-20 mt-8`}>
                  <p className="text-gray-800 dark:text-gray-200 leading-relaxed font-medium">
                    {post.fullContent.conclusion}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

const CategoryFilter = ({ activeCategory, setActiveCategory, posts }) => {
  // Dynamically calculate category counts from posts
  const categoryCounts = React.useMemo(() => {
    const counts = { "All Articles": posts.length };
    posts.forEach(post => {
      counts[post.category] = (counts[post.category] || 0) + 1;
    });
    return counts;
  }, [posts]);

  // Generate categories dynamically
  const dynamicCategories = React.useMemo(() => {
    const allCategories = [{ name: "All Articles", icon: <Compass className="w-4 h-4" /> }];
    const uniqueCategories = [...new Set(posts.map(p => p.category))];
    
    const iconMap = {
      "Travel Guides": <MapPin className="w-4 h-4" />,
      "Travel Tips": <TrendingUp className="w-4 h-4" />,
      "Local Culture": <Heart className="w-4 h-4" />,
      "Food & Drink": "🍽️",
      "Budget Travel": "💰",
      "Sustainable Travel": "🌱",
      "Seasonal Guide": "📅"
    };
    
    uniqueCategories.forEach(cat => {
      allCategories.push({
        name: cat,
        icon: iconMap[cat] || <Compass className="w-4 h-4" />
      });
    });
    
    return allCategories;
  }, [posts]);

  return (
    <div className="flex flex-wrap gap-3 justify-center mb-8">
      {dynamicCategories.map((category) => (
        <button
          key={category.name}
          onClick={() => setActiveCategory(category.name)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${
            activeCategory === category.name
              ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white border-transparent shadow-lg"
              : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-600"
          }`}
        >
          {category.icon}
          <span className="font-medium">{category.name}</span>
          <span className={`text-xs px-2 py-1 rounded-full ${
            activeCategory === category.name
              ? "bg-white/20 text-white"
              : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
          }`}>
            {categoryCounts[category.name] || 0}
          </span>
        </button>
      ))}
    </div>
  );
};

const BlogSection = () => {
  const [activeCategory, setActiveCategory] = useState("All Articles");
  const [selectedPost, setSelectedPost] = useState(null);
  
  // Filter posts based on active category
  const filteredPosts = React.useMemo(() => {
    if (activeCategory === "All Articles") return blogPosts;
    return blogPosts.filter(post => post.category === activeCategory);
  }, [activeCategory]);

  const handleReadMore = (post) => {
    setSelectedPost(post);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
    document.body.style.overflow = 'unset'; // Restore scrolling
  };

  return (
    <>
      <MotionSection
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className="relative max-w-11/12 mx-auto px-4 py-16 lg:py-24"
      >
        {/* Background Elements */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <MotionDiv
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -top-20 -right-20 w-64 h-64  rounded-full blur-3xl opacity-30"
          />
          <MotionDiv
            animate={{
              rotate: [360, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full blur-3xl opacity-30"
          />
        </div>

        {/* Header Section */}
        <div className="relative text-center mb-12">
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200 dark:border-gray-800 shadow-sm mb-6"
          >
            <TrendingUp className="w-4 h-4 text-emerald-500" />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Latest Travel Insights
            </span>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 dark:from-emerald-400 dark:via-green-400 dark:to-teal-400">
                Travel Blog & Tips
              </span>
            </h2>
            
            <MotionDiv
              initial={{ width: 0 }}
              whileInView={{ width: 120 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-1.5 bg-gradient-to-r from-emerald-400 to-green-600 rounded-full mx-auto mb-4"
            />
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Discover expert travel advice, local insights, and inspiring stories to make your next 
              Bangladeshi adventure unforgettable.
            </p>
          </MotionDiv>
        </div>

        {/* Category Filters */}
        <div className="relative mb-12">
          <CategoryFilter 
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            posts={blogPosts}
          />
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} onReadMore={handleReadMore} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No posts found in this category.
              </p>
            </div>
          )}
        </div>
      </MotionSection>

      {/* Modal */}
      {selectedPost && <BlogModal post={selectedPost} onClose={handleCloseModal} />}
    </>
  );
};

export default BlogSection;