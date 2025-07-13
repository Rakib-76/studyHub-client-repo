import React from "react";
import { NavLink, Outlet } from "react-router";
import { FaUsers, FaChalkboardTeacher, FaFolderOpen, FaHome } from "react-icons/fa";

const AdminDashboard = () => {
    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-blue-900 text-white flex flex-col">
                <nav className="flex-1 p-4 space-y-4">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""
                            }`
                        }
                    >
                        <FaHome />
                        Home
                    </NavLink>

                    <NavLink
                        to="/dashboard/admin/users"
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-2 rounded hover:bg-blue-700 ${isActive ? "bg-blue-700" : ""
                            }`
                        }
                    >
                        <FaUsers />
                        View All Users
                    </NavLink>

                    <NavLink
                        to="sessions"
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-2 rounded hover:bg-blue-700 ${isActive ? "bg-blue-700" : ""
                            }`
                        }
                    >
                        <FaChalkboardTeacher />
                        View All Study Sessions
                    </NavLink>

                    <NavLink
                        to="materials"
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-2 rounded hover:bg-blue-700 ${isActive ? "bg-blue-700" : ""
                            }`
                        }
                    >
                        <FaFolderOpen />
                        View All Materials
                    </NavLink>
                </nav>
            </aside>

            {/* Main content */}
            <main className="flex-1 p-6 bg-gray-100 overflow-auto">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminDashboard;
