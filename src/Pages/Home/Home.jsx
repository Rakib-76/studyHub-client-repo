import React from 'react';
import Banner from './Banner/Banner';
import Comment from './Comments/Comment';
import StudySessions from './StudySession/StudySessions ';
import Testimonials from './Testimonial/Testimonials';
import FAQSection from './FAQ/FAQSection';

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <StudySessions></StudySessions>
      <Testimonials/>
      <FAQSection/>
      <Comment></Comment>
    </div>
  );
};

export default Home;