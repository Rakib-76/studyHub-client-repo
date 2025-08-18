// ScrollToTop.jsx
import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  // scroll listener
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // smooth scroll
    });
  };

  return (
    <>
      {visible && (
        <div
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 p-3 bg-[#78C841] text-black rounded-full cursor-pointer hover:bg-green-700 transition-all"
        >
          <FaArrowUp />
        </div>
      )}
    </>
  );
};

export default ScrollToTop;
