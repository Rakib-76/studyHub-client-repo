// src/components/ClientSlider.jsx
import React from 'react';
import Marquee from 'react-fast-marquee';


import logo1 from '../../../assets/brands/amazon.png'
import logo2 from '../../../assets/brands/amazon_vector.png'
import logo3 from '../../../assets/brands/casio.png'
import logo4 from '../../../assets/brands/moonstar.png'
import logo5 from '../../../assets/brands/randstad.png'
import logo6 from '../../../assets/brands/start-people 1.png'
import logo7 from '../../../assets/brands/start.png'

const logos = [logo1,logo2,logo3,logo4,logo5,logo6,logo7];

const ClientSlider = () => {
  return (
    <section className=" p-14 ">
      <h2 className="text-2xl font-bold text-center mb-10 text-[#03373D]">We've helped thousands of sales teams</h2>

      <Marquee
        speed={50}           
        pauseOnHover={true}  
        gradient={false}      
        direction="left"    
      >
        {logos.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Client logo ${index}`}
            className="h-6 mx-[50px] w-auto object-contain mb-20"
          />
        ))}
      </Marquee>

        <div className=" mx-auto border-b-2 border-dashed border-gray-400 mb-10" />
    </section>
  );
};

export default ClientSlider;
