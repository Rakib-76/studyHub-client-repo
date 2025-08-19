import React from "react";
import { motion } from "framer-motion";
import { FaChalkboardTeacher, FaDollarSign, FaClock } from "react-icons/fa";

const FeaturesSection = () => {
  return (
    <section className="relative py-16 overflow-hidden md:mb-48 -mb-20 lg:-mb-10">
      {/* Animated Background */}
      <motion.div
        className="absolute max-w-full inset-0 bg-gradient-to-r from-[#78C841] via-transparent to-[#B4E50D]"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        style={{ backgroundSize: "200% 200%" }}
      />

      <div className="relative max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 px-6">
        {/* Left Text Content */}
        <motion.div
          className="flex-1 z-10"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-4 dark:text-black">Our Best Features</h2>
          <p className="text-gray-600 mb-6">
            Special wedding garments are often worn, and the ceremony is sometimes 
            followed by a wedding reception. Music, poetry.
          </p>

          {/* Feature 1 */}
          <div className="flex  gap-4 mb-6 items-center">
            <div className="text-white text-4xl bg-[#78C841] p-3 rounded-full">
              <FaChalkboardTeacher />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 dark:text-black">Skilled Teachers</h3>
              <p className="text-gray-600">
                Special wedding garments are often worn, and the ceremony is 
                sometimes followed by a wedding reception. Music, poetry, 
                prayers, or readings from.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex items-center gap-4 mb-6">
            <div className="text-white text-4xl bg-[#78C841] p-3 rounded-full">
              <FaDollarSign />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 dark:text-black">Affordable Courses</h3>
              <p className="text-gray-600">
                Special wedding garments are often worn, and the ceremony is 
                sometimes followed by a wedding reception. Music, poetry, 
                prayers, or readings from.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex items-center gap-4">
            <div className="text-white text-4xl bg-[#78C841] p-3 rounded-full">
              <FaClock />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 dark:text-black">Efficient & Flexible</h3>
              <p className="text-gray-600">
                Special wedding garments are often worn, and the ceremony is 
                sometimes followed by a wedding reception. Music, poetry, 
                prayers, or readings from.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right Image Content */}
        <motion.div
          className="flex-1 z-10"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="https://i.postimg.cc/3xjRHtVp/istockphoto-1354640844-2048x2048.jpg"
            alt="Features"
            className="w-full lg:min-h-screen object-cover rounded-lg  shadow-lg"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
