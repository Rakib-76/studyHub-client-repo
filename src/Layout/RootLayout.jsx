import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Pages/Share/Navbar';
import Footer from '../Pages/Share/Footer/Footer';

const RootLayout = () => {
    return (
        <div className='space-y-2 p-4'>
            <div className='mb-15'>
                <Navbar></Navbar>
            </div>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;