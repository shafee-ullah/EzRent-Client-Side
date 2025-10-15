import React from "react";
import { motion } from "framer-motion";
import { Calendar, User, Clock, ArrowRight, MapPin, Heart, TrendingUp, Compass } from "lucide-react";

const MotionDiv = motion.div;
const MotionSection = motion.section;

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
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    id: 2,
    title: "Sustainable Travel: How to Explore Responsibly in 2024",
    excerpt: "Learn practical tips for reducing your environmental impact while traveling and supporting local communities.",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=600&auto=format&fit=crop",
    category: "Sustainable Travel",
    readTime: "8 min read",
    author: "Eco Traveler",
    date: "March 12, 2024",
    tags: ["Sustainability", "Eco-Friendly", "Tips"],
    gradient: "from-emerald-500 to-green-500"
  },
  {
    id: 3,
    title: "The Ultimate Packing Checklist for Southeast Asia",
    excerpt: "Never forget essential items again with our comprehensive packing guide tailored for tropical climates.",
    image: "https://images.unsplash.com/photo-1600714480856-dc99b28892eb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Travel Tips",
    readTime: "5 min read",
    author: "Packing Pro",
    date: "March 10, 2024",
    tags: ["Packing", "Checklist", "Asia"],
    gradient: "from-amber-500 to-orange-500"
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
    gradient: "from-purple-500 to-pink-500"
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
    gradient: "from-red-500 to-rose-500"
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
    gradient: "from-teal-500 to-cyan-500"
  }
];

const categories = [
  { name: "All Articles", count: 24, icon: <Compass className="w-4 h-4" /> },
  { name: "Travel Guides", count: 8, icon: <MapPin className="w-4 h-4" /> },
  { name: "Travel Tips", count: 6, icon: <TrendingUp className="w-4 h-4" /> },
  { name: "Local Culture", count: 5, icon: <Heart className="w-4 h-4" /> },
  { name: "Food & Drink", count: 3, icon: "🍽️" },
  { name: "Budget Travel", count: 2, icon: "💰" }
];

const BlogCard = ({ post, index }) => {
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
        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {post.date}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {post.readTime}
          </div>
        </div>

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

          <MotionDiv
            whileHover={{ x: 4 }}
            className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold text-sm group-hover:gap-2 transition-all duration-300"
          >
            Read More
            <ArrowRight className="w-4 h-4" />
          </MotionDiv>
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

const CategoryFilter = () => {
  const [activeCategory, setActiveCategory] = React.useState("All Articles");

  return (
    <div className="flex flex-wrap gap-3 justify-center mb-8">
      {categories.map((category) => (
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
            {category.count}
          </span>
        </button>
      ))}
    </div>
  );
};

const BlogSection = () => {
  return (
    <MotionSection
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      className="relative max-w-11/12 mx-auto px-4 py-16 lg:py-12"
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
          className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-r from-emerald-200 to-green-200 dark:from-emerald-900/20 dark:to-green-900/20 rounded-full blur-3xl opacity-30"
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
        <CategoryFilter />
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {blogPosts.map((post, index) => (
          <BlogCard key={post.id} post={post} index={index} />
        ))}
      </div>

      
 
      
    </MotionSection>
  );
};

export default BlogSection;