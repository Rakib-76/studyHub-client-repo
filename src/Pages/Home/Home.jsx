import React from 'react';
import Banner from './Banner/Banner';
import Services from './Services/Services';
import ClientSlider from './ClientLogoMarque/ClientSlider';
import HowItWork from './HowitWork/HowItWork';
import ServiceFeature from '../ServiceFeature/ServiceFeature';
import PrioritySection from './PrioritySection/PrioritySection';
import Comment from './Comments/Comment';

const Home = () => {
    return (
        <div>
          <Banner></Banner>
          <HowItWork></HowItWork>
          <Services></Services>
          <ClientSlider></ClientSlider>
          <ServiceFeature></ServiceFeature>
          <PrioritySection></PrioritySection>
          <Comment></Comment>
        </div>
    );
};

export default Home;