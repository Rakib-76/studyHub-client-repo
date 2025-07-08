// src/pages/OurServices.jsx
import React from 'react';
import ServiceCard from './ServiceCard';
import {
  FaShippingFast,
  FaMapMarkedAlt,
  FaBoxes,
  FaMoneyBillWave,
  FaBuilding,
  FaUndoAlt,
} from 'react-icons/fa';


const services = [
  {
    icon: FaShippingFast,
    title: 'Express & Standard Delivery',
    description:
      'We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.',
  },
  {
    icon: FaMapMarkedAlt,
    title: 'Nationwide Delivery',
    description:
      'We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.',
  },
  {
    icon: FaBoxes,
    title: 'Fulfillment Solution',
    description:
      'We also offer customized service with inventory management support, online order processing, packaging, and after sales support.',
  },
  {
    icon: FaMoneyBillWave,
    title: 'Cash on Home Delivery',
    description:
      '100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.',
  },
  {
    icon: FaBuilding,
    title: 'Corporate Service / Contract In Logistics',
    description:
      'Customized corporate services which includes warehouse and inventory management support.',
  },
  {
    icon: FaUndoAlt,
    title: 'Parcel Return',
    description:
      'Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.',
  },
];

const Services = () => {
  return (
    <section className="p-16 bg-[#03373d] rounded-3xl mb-5">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
          Our Services
        </h2>
        <p className="text-gray-300 max-w-3xl mx-auto mb-12">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
          From personal packages to business shipments — we deliver on time, every time.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, idx) => (
            <ServiceCard
              key={idx}
              service={service}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;