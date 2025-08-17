import React from 'react';
import Banner from './Banner/Banner';
import Comment from './Comments/Comment';
import StudySessions from './StudySession/StudySessions ';
import Testimonials from './Testimonial/Testimonials';
import FAQSection from './FAQ/FAQSection';
import ApprovedSessions from './Approve-Session/ApprovedSessions';
import About from './About/About';

const Home = () => {
  return (
    <div className=''>
      <Banner></Banner>
      {/* <StudySessions></StudySessions> */}
      <ApprovedSessions></ApprovedSessions>
      <Testimonials/>
      <FAQSection/>
      <Comment></Comment>
      |<About></About>
    </div>
  );
};

export default Home;