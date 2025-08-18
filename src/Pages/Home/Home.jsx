import React from 'react';
import Banner from './Banner/Banner';
import Comment from './Comments/Comment';
import StudySessions from './StudySession/StudySessions ';
import FAQSection from './FAQ/FAQSection';
import ApprovedSessions from './Approve-Session/ApprovedSessions';
import About from './About/About';
import FeaturesSection from './Feature/FearuresSection';
import HeroSection from './About/Hero/HeroSection';
import InfoSection from './Info/InfoSection';
import ScrollToTop from './ScrollTop/ScrollTop';

const Home = () => {
  return (
    <div className=''>
      <Banner></Banner>
      <ApprovedSessions></ApprovedSessions>
      <section id='about'>
        <About></About>
      </section>
      <section id='contact'>
        <FeaturesSection></FeaturesSection>
      </section>
      <section id='projects'>
        <HeroSection></HeroSection>
      </section>
      <InfoSection></InfoSection>
      <FAQSection/>
      <Comment></Comment>
      <ScrollToTop></ScrollToTop>
      
    </div>
  );
};

export default Home;