import React from 'react';
import { Outlet } from 'react-router';
import authImg from '../assets/authImage.png'
import ProFastLogo from '../Pages/Share/StudyHubLogo/StudyHubLogo';

const AuthLayout = () => {
    return (
        <div className=" lg:p-20 max-w-9/12 mx-auto">
            <ProFastLogo></ProFastLogo>
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className='flex-1'>
                    <img
                        src={authImg}
                        className="rounded-lg shadow-2xl"
                    />
                </div>

                <div className='flex-1'>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;