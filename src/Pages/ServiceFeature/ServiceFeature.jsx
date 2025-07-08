import React from 'react';
import image1 from '../../assets/banner/live-tracking.png'
import image2 from '../../assets/banner/safe-delivery.png'


const features = [
    {
        title: 'Live Parcel Tracking',
        description:
            'Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment\'s journey and get instant status updates for complete peace of mind.',
        image: image1
    },
    {
        title: '100% Safe Delivery',
        description:
            'We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.',
        image: image2
    },
    {
        title: '24/7 Call Center Support',
        description:
            'Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.',
        image: image2
    },
];

const ServiceFeature = () => {
    return (
        <section className="max-w-7xl px-4 py-16 space-y-10 mx-14">
            {features.map((feature, index) => (
                <div key={index} className="w-full bg-white p-6 rounded-xl shadow-sm">
                    {/* 🔧 Flex layout for icon + text */}
                    <div className="lg:flex items-center gap-6">
                        {/* Icon */}
                        <img src={feature.image} alt={feature.title} className="w-16 h-16 object-contain" />


                        <div className="divider divider-horizontal border-dashed"></div>

                        {/* Title and Description */}
                        <div>
                            <h3 className="text-xl font-bold mb-2 text-gray-800">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
};

export default ServiceFeature;
