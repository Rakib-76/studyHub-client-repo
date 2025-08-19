import React, { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';

const Home = () => {
    const [loopKey, setLoopKey] = useState(0);
  const beforeText = "Empower Your Learning with ";
  const highlightText = "StudyHub";

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08 }
    }
  };

  const letter = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  return (
    <div
      className="relative lg:min-h-screen bg-cover bg-center bg-no-repeat mb-10 "
      style={{ backgroundImage: `url('https://i.postimg.cc/T1LwpM2N/banner-2.jpg')` }}
    >
      <div className="absolute inset-0 bg-black/60 "></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="text-center text-white max-w-2xl">
          {/* Typewriter motion */}
          <motion.h1
          key={loopKey}
            className="text-4xl md:text-5xl font-bold mb-4 flex flex-wrap justify-center"
            variants={container}
            initial="hidden"
            animate="visible"
            onAnimationComplete={()=>setTimeout(()=>setLoopKey(prev =>prev+1),200)}
          >
            {/* Normal letters */}
            {beforeText.split("").map((char, i) => (
              <motion.span
                key={i}
                variants={letter}
                className={char === " " ? "inline-block w-3" : ""}
              >
                {char}
              </motion.span>
            ))}

            {/* Highlight letters */}
            {highlightText.split("").map((char, i) => (
              <motion.span
                key={i + beforeText.length}
                variants={letter}
                className="text-[#78C841]"
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>

          <p className="text-lg md:text-xl text-gray-200 mb-6 ">
            Find expert tutors, join study sessions, and grow your skills anytime, anywhere.
          </p>

          <Link to="/tutors">
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
