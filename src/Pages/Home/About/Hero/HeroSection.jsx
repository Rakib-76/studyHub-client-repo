import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaPlay } from "react-icons/fa";

const HeroSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="relative w-full h-screen flex items-center">
      <div className="container mx-auto flex flex-col lg:flex-row items-center px-6 gap-12">
        {/* Left Text */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold mb-4 dark:text-black">
            We're <span className="text-[#78C841] underline">Qeducato</span> & We're Different
          </h1>
          <p className="text-gray-700 text-lg">
            Our community is being called to reimagine the future. As the only university 
            where a renowned design school colleges,
          </p>
        </motion.div>

        {/* Right Image with Play Button */}
        <motion.div
          className="flex-1 relative"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="https://i.postimg.cc/hPNrY17V/istockphoto-1347652268-2048x2048.jpg"
            alt="Hero"
            className="w-full h-full object-cover rounded-xl shadow-lg"
          />

          {/* Play Button */}
          <motion.button
            onClick={() => setIsOpen(true)}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white bg-[#78C841] rounded-full p-6 shadow-lg hover:bg-green-700"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaPlay className="text-3xl" />
          </motion.button>
        </motion.div>
      </div>

      {/* Video Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="relative w-11/12 md:w-3/4 lg:w-1/2">
            <button
              className="absolute top-3 right-3 text-white text-2xl"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full rounded-lg"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
