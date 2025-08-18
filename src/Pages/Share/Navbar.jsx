import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router'; // fixed router-dom
import UseAuth from '../../Hook/UseAuth';
import { FaUserCircle, FaTachometerAlt, FaSignOutAlt, FaUserPlus, FaSignInAlt } from 'react-icons/fa';
import StudyHubLogo from './StudyHubLogo/StudyHubLogo';
import UseUserRole from '../../hooks/UseUserRole';
import Swal from 'sweetalert2';

const Navbar = () => {
  const { user, logOut } = UseAuth();
  const navigate = useNavigate();
  const { role, loading } = UseUserRole();

  const navItems = (
    <>
      <li className='hover:text-[#FF9B2F] font-bold'>
        <NavLink to="/">Home</NavLink>
      </li>
      <li className='hover:text-[#FF9B2F] font-bold'>
        <NavLink to="/tutors">Tutors</NavLink>
      </li>
      <li className='hover:text-[#FF9B2F] font-bold'>
        <NavLink to="/sessions">Study Sessions</NavLink>
      </li>
      <li className='hover:text-[#FF9B2F] font-bold'>
        <NavLink to="/about">About</NavLink>
      </li>
    </>
  );

  const handleLogOut = () => {
    logOut()
      .then(() => {
        localStorage.removeItem('access-token');
        navigate('/login');
        Swal.fire({
          title: 'Logout Successful!',
          text: 'Welcome back!',
          icon: 'success',
          confirmButtonText: 'Continue',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const handleDashboardClick = () => {
    if (loading) {
      console.log("Role is still loading...");
      return;
    }

    if (role === 'admin') navigate('/dashboard/admin');
    else if (role === 'tutor') navigate('/dashboard/tutor');
    else if (role === 'student') navigate('/dashboard/student');
    else {
      console.warn("No valid role found, navigating to home.");
      navigate('/');
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-sm px-4 rounded-2xl fixed z-50 top-0">
      {/* Left: Logo */}
      <div className="navbar-start">
        <Link to="/" className="text-sm">
          <StudyHubLogo />
        </Link>
      </div>

      {/* Right: Large Screen Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="gap-x-10 menu-horizontal px-1">{navItems}</ul>
      </div>

      {/* Right: Large Screen Auth Buttons */}
      <div className="navbar-end hidden lg:flex items-center gap-3">
        {user ? (
          <>
            {/* Dashboard Button */}
            <button
              onClick={handleDashboardClick}
              disabled={loading}
              className="btn border border-[#154D71] hover:bg-gradient-to-r from-[#B4E50D] to-[#FF9B2F] btn-sm flex items-center gap-1"
              title={loading ? "Checking role..." : "Go to Dashboard"}
            >
              <FaTachometerAlt /> {loading ? 'Checking Role...' : 'Dashboard'}
            </button>

            {/* Logout Button */}
            <button
              onClick={handleLogOut}
              className="btn btn-outline btn-sm flex items-center gap-1 text-red-600 hover:bg-gradient-to-r from-[#B4E50D] to-[#FF9B2F] "
            >
              <FaSignOutAlt /> Logout
            </button>

            {/* User Profile Picture */}
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName || 'User'}
                className="w-10 h-10 rounded-full border"
              />
            ) : (
              <FaUserCircle className="text-3xl text-gray-500" />
            )}
          </>
        ) : (
          <>
            <Link to="/login" className=" btn-sm flex justify-center items-center gap-1 btn border border-[#154D71] hover:bg-gradient-to-r from-[#B4E50D] to-[#FF9B2F]"> <FaSignInAlt />Login</Link>
            <Link to="/register" className=" btn-sm flex justify-center items-center gap-1 btn border border-[#154D71] hover:bg-gradient-to-r from-[#B4E50D] to-[#FF9B2F]"> <FaUserPlus />Sign Up</Link>
          </>
        )}
      </div>

      {/* Mobile Dropdown */}
      <div className="navbar-end lg:hidden">
        <div className="dropdown dropdown-end">
          {/* Hamburger Button */}
          <label tabIndex={0} className="btn btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6"
              fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>

          {/* Dropdown Menu */}
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-2 shadow-lg bg-base-100 rounded-lg w-64 z-20 p-4 space-y-3 flex"
          >
            <div>
              <li className="border-b border-gray-200 hover:bg-gradient-to-r from-[#B4E50D] to-[#FF9B2F] ">
                <NavLink to="/" className="flex justify-between items-center py-2 uppercase font-bold">
                  Home
                </NavLink>
              </li>
              <li className="border-b border-gray-200 hover:bg-gradient-to-r from-[#B4E50D] to-[#FF9B2F] ">
                <NavLink to="/tutors" className="flex justify-between items-center py-2 uppercase font-bold">
                  Tutors
                </NavLink>
              </li>

              <li className="border-b border-gray-200 hover:bg-gradient-to-r from-[#B4E50D] to-[#FF9B2F] ">
                <NavLink to="/sessions" className="py-2 uppercase font-bold">Study Sessions</NavLink>
              </li>
              <li className="border-b border-gray-200 hover:bg-gradient-to-r from-[#B4E50D] to-[#FF9B2F] ">
                <NavLink to="/sessions" className="py-2 uppercase font-bold">About</NavLink>
              </li>

              {/* Dashboard */}
              {user && (
                <li>
                  <button
                    onClick={handleDashboardClick}
                    disabled={loading}
                    className=" font-bold hover:bg-gradient-to-r from-[#B4E50D] to-[#FF9B2F]  border-b border-base-300 py-2 flex items-center uppercase"
                  >
                    <FaTachometerAlt className='text-xl' /> {loading ? 'Checking Role...' : 'Dashboard'}
                  </button>
                </li>
              )}

              {/* Logout */}
              {user && (
                <li className="flex justify-center">
                  <button
                    onClick={handleLogOut}
                    className=" text-red-600 font-bold hover:bg-gradient-to-r from-[#B4E50D] to-[#FF9B2F] "
                  >
                    <FaSignOutAlt className="text-xl" /> LOGOUT
                  </button>
                </li>
              )}

              {/* Login / Signup */}
              {!user && (
                <>
                  <li>
                    <Link to="/login" className=" hover:bg-gradient-to-r from-[#B4E50D] to-[#FF9B2F] font-bold uppercase border-b py-2  border-gray-300 ">
                      <FaSignInAlt className="" />Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" className=" font-bold uppercase border-b  border-gray-300  hover:bg-gradient-to-r from-[#B4E50D] to-[#FF9B2F]  ">
                      <FaUserPlus /> Sign Up
                    </Link>
                  </li>
                  <li className="flex justify-end">
                    <button className="btn btn-ghost btn-sm">
                      <span className="text-xl">✕</span>
                    </button>
                  </li>
                </>
              )}
            </div>
          </ul>
        </div>
      </div>


    </div>
  );
};

export default Navbar;
