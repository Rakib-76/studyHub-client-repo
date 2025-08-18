import React from "react";
import { motion } from "framer-motion";

const FAQSection = () => {

  return (
    <section className="py-16 px-6 max-w-10/12 mx-auto mt-20">

      {/* main container */}
      <div className="lg:flex lg:gap-10 flex-cols items-center">
        {/* faq question container */}
        <div className=" flex-1 space-y-2">
          <h2 className="text-5xl font-bold text-black mb-5 ">Get every single answer here.</h2>
          <p className="text-xl">A business or organization established to provide a particular service, typically one that involves a organizing transactions.</p>
          <div className="p-[2px] rounded-lg bg-gradient-to-r from-green-400 via-yellow-400 to-pink-500">
            <div className="collapse collapse-arrow rounded-lg bg-[#eaeced]">
              <input type="radio" name="my-accordion-2" defaultChecked />
              <div className="collapse-title font-semibold">
                How do I book a session?
              </div>
              <div className="collapse-content text-sm">
                Login as a student, go to Booked Sessions, and click 'Book Now' on an active session.
              </div>
            </div>
          </div>

          <div className="p-[2px] rounded-lg bg-gradient-to-r from-green-400 via-yellow-400 to-pink-500">
            <div className="collapse collapse-arrow bg-[#eaeced]">
              <input type="radio" name="my-accordion-2" />
              <div className="collapse-title font-semibold">How do tutors upload materials?</div>
              <div className="collapse-content text-sm">Tutors can upload images and drive links under the 'Upload Materials' tab in their dashboard.</div>
            </div>
          </div>
          <div className="p-[2px] rounded-lg bg-gradient-to-r from-green-400 via-yellow-400 to-pink-500">
            <div className="collapse collapse-arrow  bg-[#eaeced]">
              <input type="radio" name="my-accordion-2" />
              <div className="collapse-title font-semibold">Who can approve sessions?</div>
              <div className="collapse-content text-sm">Only admins can approve or reject study sessions submitted by tutors.</div>
            </div>
          </div>
        </div>
        {/* image container */}
        <div className=" bg-[#78C841] rounded-2xl  shrink-0 shadow-2xl flex-1 lg:p-10 mt-5">
          <div className="card-body">
            <fieldset className="space-y-4">
              <h1 className="text-3xl font-bold" >Make An Contact</h1>
              <input type="text" className="input w-full rounded-lg" placeholder="First Name" />
              <input type="email" className="input w-full rounded-lg" placeholder="Email" />
              <input type="number" className="input w-full rounded-lg" placeholder="Phone No." />
              <textarea
                className="w-full h-32 p-3  bg-white rounded-lg resize-none"
                placeholder="Write your comment here..."
              ></textarea>
              <motion.button
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className="px-6 py-2 bg-[#FF9B2F] text-black  font-medium rounded hover: transition"
              >
                Submit Now </motion.button>
            </fieldset>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
