import React from 'react';

const HowItWork = () => {
  const steps = [
    {
      title: 'Booking Pick & Drop',
      description: 'From personal packages to business shipments — we deliver on time, every time.',
      icon: '🚚',
    },
    {
      title: 'Cash On Delivery',
      description: 'From personal packages to business shipments — we deliver on time, every time.',
      icon: '💵',
    },
    {
      title: 'Delivery Hub',
      description: 'From personal packages to business shipments — we deliver on time, every time.',
      icon: '🏢',
    },
    {
      title: 'Booking SME & Corporate',
      description: 'From personal packages to business shipments — we deliver on time, every time.',
      icon: '📦',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>
      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-2 items-center space-x-6">
        {steps.map((step, index) => (
          <div
            key={index}
            className="space-y-3 items-start bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition-shadow"
          >
            <div className="text-4xl mr-6">{step.icon}</div>
            <div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWork;
