import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Pages/Share/Navbar';
import Footer from '../Pages/Share/Footer/Footer';

const RootLayout = () => {
    return (
        <div className='space-y-6 p-4'>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;