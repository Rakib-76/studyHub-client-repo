import React from 'react';
import logo from '../../../../src/assets/logo.png'
import { Link } from 'react-router';

const StudyHubLogo = () => {
    return (
        <Link to='/'>
            <div className='flex items-end'>
                <img className='mb-1' src={logo} alt="" />
                <p className='text-3xl -ml-2.5 font-extrabold'>StudyHub</p>
            </div>
        </Link>
    );
};

export default StudyHubLogo;