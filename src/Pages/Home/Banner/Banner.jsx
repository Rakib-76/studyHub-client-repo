import React from 'react';
import { Link } from 'react-router'; // ✅ Make sure this is react-router-dom

const Home = () => {
  return (
    <div className="relative min-h-screen bg-cover bg-center bg-no-repeat" style={{
      backgroundImage: `url('https://i.postimg.cc/T1LwpM2N/banner-2.jpg')`
    }}>
      {/* Left-to-right Linear Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="text-center text-white max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Empower Your Learning with <span className="text-blue-400">StudyHub</span>
          </h1>
          <p className="text-lg md:text-xl mb-6 font-bold">
            Find expert tutors, join study sessions, and grow your skills anytime, anywhere.
          </p>
          <Link to="/tutors">
            {/* <button className="btn btn-primary text-white px-8 py-3 rounded-lg text-lg shadow-lg hover:bg-blue-600">
              Explore Tutors
            </button> */}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
