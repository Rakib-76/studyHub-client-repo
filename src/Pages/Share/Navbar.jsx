// import React from 'react';
// import { Link, NavLink, useNavigate } from 'react-router';
// import ProFastLogo from './StudyHubLogo/StudyHubLogo';;
// import UseAuth from '../../Hook/UseAuth';
// import { FaUserCircle } from "react-icons/fa";
// import StudyHubLogo from './StudyHubLogo/StudyHubLogo';

// const Navbar = () => {
//     const navItems = <>
//         <li><NavLink to='/'>Home</NavLink></li>
//         <li><NavLink to='/sendpercel'>Send a Percel</NavLink></li>
//         <li><NavLink to='/coverage'>Coverage</NavLink></li>
//         <li><NavLink to='/about'>About Us</NavLink></li>
//     </>
//     const { user, logOut } = UseAuth();

//     const Navigate = useNavigate()


//     const handleLogOut = () => {

//         logOut()
//             .then(() => {
//                 console.log("logout successfully");
//                 alert("Logout Successfully")
//             })
//         Navigate("/login")
//             .catch((error) => {
//                 const errorMessage = error.code;
//                 console.log(errorMessage);

//             })
//     }


//     return (
//         <div className="navbar bg-base-100 shadow-sm">
//             <div className="navbar-start">
//                 <div className="dropdown">
//                     <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
//                     </div>
//                     <ul
//                         tabIndex={0}
//                         className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
//                         {navItems}
//                     </ul>
//                 </div>
//                 <a className="btn btn-ghost text-xl"><StudyHubLogo></StudyHubLogo></a>
//             </div>
//             <div className="navbar-center hidden lg:flex">
//                 <ul className="menu menu-horizontal px-1">
//                     {navItems}
//                 </ul>
//             </div>
//             <div className='navbar-end flex items-center gap-2'>
//                 <div>
//                     {user && user.photoURL ? (
//                         <img
//                             src={user.photoURL}
//                             alt={user.displayName || "User"}
//                             title={user.displayName}
//                             className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
//                         />
//                     ) : (
//                         <FaUserCircle title="Guest" className="w-full h-full text-4xl text-gray-500" />
//                     )}

//                 </div>


//                 <div>
//                     {
//                         user ? <button
//                             //   onClick={handleLogout}
//                             className='btn btn-primary px-10' onClick={handleLogOut}>LogOut</button> : <span className='flex items-center  gap-1'>
//                             <Link to='/login'> <button className='btn btn-primary'>Login</button> </Link>

//                         </span>
//                     }
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Navbar;


// import React from 'react';
// import { Link, NavLink, useNavigate } from 'react-router';
// import UseAuth from '../../Hook/UseAuth';
// import { FaUserCircle } from "react-icons/fa";
// import StudyHubLogo from './StudyHubLogo/StudyHubLogo';
// import UseUserRole from '../../hooks/UseUserRole';

// const Navbar = () => {
//   const { user, logOut } = UseAuth();
//   const navigate = useNavigate();
//   const role = UseUserRole();

//   const navItems = (
//     <>
//       <li><NavLink to='/tutors'>Tutors</NavLink></li>
//       <li><NavLink to='/sessions'>Study Sessions</NavLink></li>
//     </>
//   );

//   const handleLogOut = () => {
//     logOut()
//       .then(() => {
//         localStorage.removeItem('access-token');
//         navigate('/login');
//         alert('Logout Successfully');
//       })
//       .catch((error) => {
//         console.error(error.message);
//       });
//   };

//   const handleDashboardClick = () => {
//     if (role === 'admin') navigate('/dashboard/admin');
//     else if (role === 'tutor') navigate('/dashboard/tutor');
//     else navigate('/dashboard/student');
//   };

//   return (
//     <div className="navbar bg-base-100 shadow-sm">
//       <div className="navbar-start">
//         <div className="dropdown">
//           <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
//               viewBox="0 0 24 24" stroke="currentColor"> 
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
//                 d="M4 6h16M4 12h8m-8 6h16" /> 
//             </svg>
//           </div>
//           <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
//             {navItems}
//           </ul>
//         </div>
//         <Link to="/" className="btn btn-ghost text-xl">
//           <StudyHubLogo />
//         </Link>
//       </div>

//       <div className="navbar-center hidden lg:flex">
//         <ul className="menu menu-horizontal px-1">
//           {navItems}
//         </ul>
//       </div>

//       <div className="navbar-end flex items-center gap-3">
//         {user ? (
//           <>
//             <button onClick={handleDashboardClick} className="btn btn-info btn-sm">Dashboard</button>
//             <div className="dropdown dropdown-end">
//               <div tabIndex={0} role="button" className="btn btn-circle avatar btn-ghost">
//                 {user?.photoURL ? (
//                   <img src={user.photoURL} className="w-10 rounded-full" alt="User" />
//                 ) : (
//                   <FaUserCircle className="text-2xl text-gray-500" />
//                 )}
//               </div>
//               <ul className="menu dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
//                 <li><button onClick={handleLogOut}>Logout</button></li>
//               </ul>
//             </div>
//           </>
//         ) : (
//           <>
//             <Link to="/login" className="btn btn-outline btn-sm">Login</Link>
//             <Link to="/register" className="btn btn-primary btn-sm">Sign Up</Link>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;


import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import UseAuth from '../../Hook/UseAuth';
import { FaUserCircle, FaTachometerAlt, FaSignOutAlt } from 'react-icons/fa';
import StudyHubLogo from './StudyHubLogo/StudyHubLogo';
import UseUserRole from '../../hooks/UseUserRole';

const Navbar = () => {
  const { user, logOut } = UseAuth();
  const navigate = useNavigate();
  const role = UseUserRole();

  const navItems = (
    <>
      <li><NavLink to="/tutors">Tutors</NavLink></li>
      <li><NavLink to="/sessions">Study Sessions</NavLink></li>
    </>
  );

  const handleLogOut = () => {
    logOut()
      .then(() => {
        localStorage.removeItem('access-token');
        navigate('/login');
        alert('Logout Successfully');
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const handleDashboardClick = () => {
    if (role === 'admin') navigate('/dashboard/admin');
    else if (role === 'tutor') navigate('/dashboard/tutor');
    else navigate('/dashboard/student');
  };

  return (
    <div className="navbar bg-base-100 shadow-sm px-4">
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost text-xl">
          <StudyHubLogo />
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>

      <div className="navbar-end flex items-center gap-3">
        {user ? (
          <>
            {/* Dashboard Button with Icon */}
            <button
              onClick={handleDashboardClick}
              className="btn btn-outline btn-sm flex items-center gap-1"
            >
              <FaTachometerAlt /> Dashboard
            </button>

            {/* Logout Button with Icon */}
            <button
              onClick={handleLogOut}
              className="btn btn-outline btn-sm flex items-center gap-1 text-red-600"
            >
              <FaSignOutAlt /> Logout
            </button>

            {/* User Profile Pic */}
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName}
                className="w-10 h-10 rounded-full border"
              />
            ) : (
              <FaUserCircle className="text-3xl text-gray-500" />
            )}
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-outline btn-sm">Login</Link>
            <Link to="/register" className="btn btn-primary btn-sm">Sign Up</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
