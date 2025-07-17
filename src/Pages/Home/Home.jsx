import React from 'react';
import Banner from './Banner/Banner';
import Comment from './Comments/Comment';
import StudySessions from './StudySession/StudySessions ';
import Testimonials from './Testimonial/Testimonials';
import FAQSection from './FAQ/FAQSection';
import ApprovedSessions from './Approve-Session/ApprovedSessions';

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      {/* <StudySessions></StudySessions> */}
      <ApprovedSessions></ApprovedSessions>
      <Testimonials/>
      <FAQSection/>
      <Comment></Comment>
    </div>
  );
};

export default Home;