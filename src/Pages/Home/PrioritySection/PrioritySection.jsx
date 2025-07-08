import React from 'react';
import sectionImage from '../../../assets/location-merchant.png'; // Replace with your actual image
import bgImage from '../../../assets/be-a-merchant-bg.png'; // Replace with your background image

const PrioritySection = () => {
  return (
    <section
      className="bg-cover bg-center bg-no-repeat py-16 bg-[#03373d] rounded-3xl mx-14 "
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-10">
        {/* Left Content */}
        <div className="md:w-1/2 text-white space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight">
            Merchant and Customer Satisfaction is Our First Priority
          </h2>
          <p className="text-gray-300 md:text-lg">
            We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-3 bg-[#caeb66] text-black font-bold hover:bg-blue-700 hover:text-white transition rounded-full">
              Become a Merchant
            </button>
            <button className="px-6 py-3 text-[#caeb66] rounded-full hover:bg-green-700 transition border border-bg[#caeb66]">
              Earn with Profast Courier
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2">
          <img
            src={sectionImage}
            alt="Customer satisfaction"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default PrioritySection;
