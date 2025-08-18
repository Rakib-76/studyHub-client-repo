import React from "react";
import { FaCheckCircle, FaAward } from "react-icons/fa";

const AboutSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16 flex flex-col lg:flex-row gap-12 items-center">
      {/* Left Content */}
      <div className="flex-1">
        <p className="text-[#78C841] font-bold text-2xl mb-2">About Our StudyHub</p>
        <h2 className="text-4xl font-bold mb-4">
          A Few Words About the StudyHub
        </h2>
        <p className="text-gray-600 mb-6">
          Education is a vital aspect of human development, providing
          individuals with knowledge, skills, and opportunities to acquire
          new information. Encompasses formal learning institutions.
        </p>

        {/* Features List */}
        <div className="grid grid-cols-2 gap-y-2 mb-6">
          <p className="flex items-center gap-2">
            <FaCheckCircle className="text-[#78C841]" /> 9 Product Market Fit Mistakes
          </p>
          <p className="flex items-center gap-2">
            <FaCheckCircle className="text-[#78C841]" /> How to Get Any Startup Idea
          </p>
          <p className="flex items-center gap-2">
            <FaCheckCircle className="text-[#78C841]" /> 100 Product Management tip
          </p>
          <p className="flex items-center gap-2">
            <FaCheckCircle className="text-[#78C841]" /> 3 Ways to Improve Your Converter
          </p>
        </div>

        {/* Award Badge */}
        <div className="flex items-center gap-3 bg-[#78C841] text-black font-semibold px-4 py-2 rounded-lg w-fit">
          <FaAward className="text-2xl" /> 20+ Winning award
        </div>
      </div>

      {/* Right Content - Images */}
      <div className="flex-1 grid grid-cols-2 gap-4">
        <div className="relative">
          <img
            src="https://i.postimg.cc/wBQWFnq4/istockphoto-1438969575-2048x2048.jpg"
            alt="Students"
            className="w-full rounded-lg shadow-lg"
          />
          {/* Award Info Card on first image */}
          <div className="absolute -bottom-10 left-50 bg-[#78C841] text-black px-4 py-3 rounded-lg shadow-lg flex items-center gap-3">
            <FaAward className="text-2xl" />
            <div>
              <p className="font-bold text-lg">1.5k+</p>
              <p className="text-sm">Awards Winner</p>
            </div>
          </div>
        </div>

        <img
          src="https://i.postimg.cc/SNYDHnQM/istockphoto-1438971921-2048x2048.jpg"
          alt="Graduate"
          className="w-full rounded-lg shadow-lg"
        />
        <img
          src="https://i.postimg.cc/NftKvVBk/pexels-anastasiya-gepp-654466-1462630.jpg"
          alt="Campus"
          className="w-full rounded-lg shadow-lg"
        />
        <img
          src="https://i.postimg.cc/bvpgGLxx/istockphoto-1455082369-2048x2048.jpg"
          alt="Library"
          className="w-full rounded-lg shadow-lg"
        />
      </div>
    </section>
  );
};

export default AboutSection;
