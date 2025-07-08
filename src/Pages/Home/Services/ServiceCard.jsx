// src/components/ServiceCard.jsx
import React from 'react';

const ServiceCard = ({ service }) => {
    const { icon: Icon, title, description } = service;
    return (
        <div className="
        card 
        bg-base-100 
        shadow-md 
        hover:shadow-xl 
        transition duration-300
        hover:bg-[#caeb66]            
        hover:text-white                    
        rounded-xl              
    ">
            <div className="
            card-body 
            items-center 
            text-center
            flex flex-col 
            justify-center               
            space-y-4                  
            ">
                <div className="text-4xl text-primary mb-4">
                    <Icon />
                </div>
                <h3 className="card-title text-xl font-semibold mb-2  text-primary">{title}</h3>
                <p className="text-gray-600">{description}</p>
            </div>
        </div>
    );
};

export default ServiceCard;
