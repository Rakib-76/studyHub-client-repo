// import React from 'react';
// import { NavLink, Outlet } from 'react-router';

// const DashboardLayout = () => {
//   return (
//     <div className="drawer lg:drawer-open">
//       <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
//       <div className="drawer-content flex flex-col">
//         {/* Mobile Navbar */}
//         <div className="navbar bg-base-300 lg:hidden">
//           <div className="flex-none">
//             <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
//                 viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
//                   d="M4 6h16M4 12h16M4 18h16" />
//               </svg>
//             </label>
//           </div>
//           <div className="flex-1 px-2">Tutor Dashboard</div>
//         </div>

//         {/* Page Content */}
//         <div className="p-4">
//           <Outlet />
//         </div>
//       </div>

//       <div className="drawer-side">
//         <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
//         <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
//           <li><NavLink to="/">🏠 Home</NavLink></li>
//           <li><NavLink to="/dashboard/tutor/create">📝 Create Session</NavLink></li>
//           <li><NavLink to="/dashboard/tutor/view-sessions">📚 View Sessions</NavLink></li>
//           <li><NavLink to="/dashboard/tutor/upload">📤 Upload Materials</NavLink></li>
//           <li><NavLink to="/dashboard/tutor/view-materials">📁 View Materials</NavLink></li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;


// import React from 'react';
// import TutorDashboard from '../Pages/Dashboard/Tutor/TutorDashboard';

// const DashboardLayout = () => {
//     return (
//         <div>
//             <div>
//                 <TutorDashboard></TutorDashboard>
//             </div>
//         </div>
//     );
// };

// export default DashboardLayout;