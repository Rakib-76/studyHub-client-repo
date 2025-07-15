import React from "react";
import { NavLink } from "react-router"; // ✅ corrected here
import { Outlet } from "react-router";   // ✅ added Outlet
import {
  FaHome,
  FaBookOpen,
  FaPlusCircle,
  FaStickyNote,
  FaFolderOpen,
} from "react-icons/fa";

const StudentDashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <nav className="flex-1 p-4 space-y-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-700 ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
            <FaHome />
            Home
          </NavLink>

          <NavLink
            to="booked-sessions"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-700 ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
            <FaBookOpen />
            View Booked Sessions
          </NavLink>

          <NavLink
            to="create-note"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-700 ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
            <FaPlusCircle />
            Create Note
          </NavLink>

          <NavLink
            to="manage-notes"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-700 ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
            <FaStickyNote />
            Manage Personal Notes
          </NavLink>

          <NavLink
            to="study-materials"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-700 ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
            <FaFolderOpen />
            View Study Materials
          </NavLink>
        </nav>
      </aside>

      {/* ✅ Content area with Outlet */}
      <main className="flex-1 p-6 bg-gray-100 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default StudentDashboard;
