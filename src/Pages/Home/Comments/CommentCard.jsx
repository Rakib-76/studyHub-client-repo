

import React from 'react';
import { FaCommentAlt } from 'react-icons/fa';

const CommentCard = ({ data, isActive }) => {
  return (
    <div

    // Here they use conditional rendering to show active card full opacity and passing and comming card are showing 50 opacity .
    
      className={`p-6  shadow-lg bg-[#78C841] hover:bg-[#eaeced] transition-all duration-300 ${
        isActive ? 'opacity-100 scale-100' : 'opacity-50 scale-90'
      }`}
    >
      <div className="text-blue-500 mb-3 flex justify-center items-center h-16 w-16 mx-auto rounded-full">
        <FaCommentAlt className="text-2xl" />
      </div>
      <p className="text-gray-700 mb-4 text-center">{data.comment}</p>
      <div className=" text-center gap-4 mt-3">
        <img src={data.profile} alt={data.name} className="w-12 mx-auto h-12 rounded-full object-cover" />
        <div>
          <h4 className="text-lg font-semibold text-gray-800">{data.name}</h4>
          <p className="text-sm text-gray-500">{data.profession}</p>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
