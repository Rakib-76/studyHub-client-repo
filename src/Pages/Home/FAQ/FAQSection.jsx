import React from "react";

const FAQSection = () => {
  const faqs = [
    {
      question: "How do I book a session?",
      answer: "Login as a student, go to Booked Sessions, and click 'Book Now' on an active session.",
    },
    {
      question: "How do tutors upload materials?",
      answer: "Tutors can upload images and drive links under the 'Upload Materials' tab in their dashboard.",
    },
    {
      question: "Who can approve sessions?",
      answer: "Only admins can approve or reject study sessions submitted by tutors.",
    },
  ];

  return (
    <section className="py-16 px-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-10">Frequently Asked Questions</h2>
      <div className="space-y-6">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-white shadow p-5 rounded">
            <h4 className="font-semibold text-lg mb-2 text-gray-800">{faq.question}</h4>
            <p className="text-gray-600 text-sm">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
