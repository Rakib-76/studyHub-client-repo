import React from "react";
import { FaStar } from "react-icons/fa";

const Testimonials = () => {
  const reviews = [
    {
      name: "Ayesha Rahman",
      rating: 5,
      comment: "This platform helped me prepare better for my exams. The sessions are very interactive!",
    },
    {
      name: "Rafiq Ahmed",
      rating: 4,
      comment: "Great tutors and clean interface. Loved the study materials section!",
    },
    {
      name: "Sadia Islam",
      rating: 5,
      comment: "Super helpful for online learning. I can even leave reviews for tutors!",
    },
  ];

  return (
    <section className=" py-16 px-6 max-w-8xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-10 text-blue-700">What Students Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((r, idx) => (
          <div key={idx} className="bg-white p-6 rounded shadow">
            <h4 className="font-semibold text-lg mb-2">{r.name}</h4>
            <div className="flex mb-2">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={i < r.rating ? "text-yellow-400" : "text-gray-300"} />
              ))}
            </div>
            <p className="text-sm text-gray-600">{r.comment}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
