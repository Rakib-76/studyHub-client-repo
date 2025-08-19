import React from "react";
import { motion } from "framer-motion";

const InfoSection = () => {
  return (
    <section className="max-w-8xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center lg:mb-20">
      {/* Image */}
      <div>
        <img
          src="https://i.postimg.cc/RV3xrmXy/istockphoto-1587713852-2048x2048.jpg" 
          alt="Student"
          className=" rounded-lg shadow-lg"
        />
      </div>

      {/* Text Content */}
      <div>
        <h2 className="text-5xl font-bold mb-4 dark:text-black">Admission & Aid</h2>
        <p className="text-gray-700 mb-4">
          Our community is being called to reimagine the future. As the only
          university where a renowned design school comes together with premier
          colleges, we are making learning more relevant and transformational.
        </p>
        <p className="text-gray-700">
          At Estuidar University, we prepare you to launch your career by pro
          supportive, creative, and professional environment from which to learn
          practical skills, build a network of industry contacts.
        </p>
          <motion.button
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className="px-6 py-2 mt-10 bg-gradient-to-r from-[#B4E50D] to-[#FF9B2F] text-black  font-medium rounded hover: transition"
              >
                Read more </motion.button>
      </div>
    </section>
  );
};

export default InfoSection;
