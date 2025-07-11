import React from 'react';
import Navbar from '../Pages/Share/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Pages/Share/Footer/Footer';

const DashboardLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default DashboardLayout;