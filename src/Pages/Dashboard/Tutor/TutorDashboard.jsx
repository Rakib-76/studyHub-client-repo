import React from 'react';
import { NavLink, Outlet } from 'react-router'; // ✅ fixed from 'react-router' to 'react-router-dom'

const TutorDashboard = () => {
  return (
    <div className="drawer lg:drawer-open min-h-screen">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      
      {/* Content Area */}
      <div className="drawer-content flex flex-col">
        {/* Mobile Navbar */}
        <div className="navbar bg-base-200 lg:hidden">
          <div className="flex-none">
            <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>
          </div>
          <div className="flex-1 px-2 text-lg font-semibold">Tutor Dashboard</div>
        </div>

        {/* Page Content */}
        <div className="p-4 bg-gray-50 min-h-[calc(100vh-4rem)]">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-72 min-h-full bg-base-200 text-base-content space-y-1">
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? 'bg-base-300 font-bold' : ''}>
              🏠 Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/tutor/create" className={({ isActive }) => isActive ? 'bg-base-300 font-bold' : ''}>
              📝 Create Session
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/tutor/sessions" className={({ isActive }) => isActive ? 'bg-base-300 font-bold' : ''}>
              📚 View Sessions
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/tutor/upload" className={({ isActive }) => isActive ? 'bg-base-300 font-bold' : ''}>
              📤 Upload Materials
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/tutor/materials" className={({ isActive }) => isActive ? 'bg-base-300 font-bold' : ''}>
              📁 View Materials
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/tutor/rejected-sessions" className={({ isActive }) => isActive ? 'bg-base-300 font-bold' : ''}>
              ❌ Rejected Sessions
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TutorDashboard;
