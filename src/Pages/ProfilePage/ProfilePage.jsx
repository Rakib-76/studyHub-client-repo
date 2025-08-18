// ProfilePage.jsx
import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const ProfilePage = ({ user }) => {
  // Example user object if not passed as prop
  user = user || {
    name: "Rakib Hasan",
    email: "rakib@example.com",
    phone: "+880123456789",
    address: "Dhaka, Bangladesh",
    profilePic: "https://i.pravatar.cc/150?img=3",
    role: "Student",
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg max-w-3xl mx-auto mt-6">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <img
          src={user.profilePic}
          alt={user.name}
          className="w-32 h-32 rounded-full object-cover shadow-lg"
        />
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-gray-500 capitalize">{user.role}</p>
          <div className="mt-4 space-y-2 text-gray-600">
            <p className="flex items-center gap-2">
              <FaEnvelope /> {user.email}
            </p>
            <p className="flex items-center gap-2">
              <FaPhone /> {user.phone}
            </p>
            <p className="flex items-center gap-2">
              <FaMapMarkerAlt /> {user.address}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
