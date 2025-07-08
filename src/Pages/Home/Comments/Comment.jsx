import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import CommentCard from './CommentCard';

const comments = [
  { name: 'John Doe', profession: 'Software Engineer', profile: 'https://i.pravatar.cc/100?img=1', comment: 'A posture corrector works by providing support and gentle alignment...' },
  { name: 'Sarah Khan', profession: 'Physiotherapist', profile: 'https://i.pravatar.cc/100?img=2', comment: 'It gently pulls your shoulders back to prevent slouching...' },
  { name: 'Alice Brown', profession: 'Fitness Coach', profile: 'https://i.pravatar.cc/100?img=3', comment: 'Wearing a posture corrector daily can improve your overall health...' },
  { name: 'Michael Smith', profession: 'Chiropractor', profile: 'https://i.pravatar.cc/100?img=4', comment: 'It is important to pair a posture corrector with exercises.' },
  { name: 'Emma Wilson', profession: 'Yoga Instructor', profile: 'https://i.pravatar.cc/100?img=5', comment: 'Posture support helps to relieve neck and back pain.' },
];


const Comment = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % comments.length);
  };

  const prev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + comments.length) % comments.length);
  };

  const goTo = (i) => {
    if (i === index) return;
    setDirection(i > index ? 1 : -1);
    setIndex(i);
  };

  const getIndex = (offset) =>
    (index + offset + comments.length) % comments.length;

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-10">User Comments</h2>

      {/* Slider Area */}
      <div className="relative overflow-hidden h-[380px]">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={index}
            className="flex justify-center gap-6 absolute w-full"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'tween', duration: 0.5 }}
          >
            {[getIndex(-1), getIndex(0), getIndex(1)].map((i, pos) => (
              <div
                key={i}
                className="w-[280px] sm:w-[300px] shrink-0"
              >
                <CommentCard
                  data={comments[i]}
                  isActive={pos === 1}
                />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-6 space-x-2">
        {comments.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === index ? 'bg-blue-600 scale-125' : 'bg-gray-300'
            }`}
          ></button>
        ))}
      </div>

      {/* Navigation Arrows */}
      <div className="flex justify-center mt-6 gap-4">
        <button onClick={prev} className="btn btn-circle btn-outline">
          <FaArrowLeft />
        </button>
        <button onClick={next} className="btn btn-circle btn-outline">
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Comment;
