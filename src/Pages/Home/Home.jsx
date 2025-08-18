import React from 'react';
import Banner from './Banner/Banner';
import Comment from './Comments/Comment';
import StudySessions from './StudySession/StudySessions ';
import FAQSection from './FAQ/FAQSection';
import ApprovedSessions from './Approve-Session/ApprovedSessions';
import About from './About/About';
import FeaturesSection from './Feature/FearuresSection';

const Home = () => {
  return (
    <div className=''>
      <Banner></Banner>
      {/* <StudySessions></StudySessions> */}
      <ApprovedSessions></ApprovedSessions>
      <About></About>
      <FeaturesSection></FeaturesSection>
      <FAQSection/>
      <Comment></Comment>
      
    </div>
  );
};

export default Home;