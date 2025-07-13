import React from 'react';
import Banner from './Banner/Banner';
import Comment from './Comments/Comment';
import StudySessions from './StudySession/StudySessions ';

const Home = () => {
    return (
        <div>
          <Banner></Banner>
          <StudySessions></StudySessions>
          <Comment></Comment>
        </div>
    );
};

export default Home;