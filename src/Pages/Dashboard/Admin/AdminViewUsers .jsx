import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaUserEdit } from "react-icons/fa";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure";

const AdminViewUsers = () => {
  const axiosSecure = UseAxiosSecure();
  const [search, setSearch] = useState("");

  const { data: users = [], refetch, isLoading } = useQuery({
    queryKey: ["users", search],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?search=${search}`);
      return res.data;
    },
  });

  const handleRoleChange = async (userId, newRole) => {
    try {
      await axiosSecure.patch(`/users/role/${userId}`, { role: newRole });
      refetch();
    } catch (error) {
      console.error("Failed to update role:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-700 mb-6">
        All Users
      </h2>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name or email"
          className="w-full max-w-lg mx-auto block border px-4 py-2 rounded-md shadow-sm focus:outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {isLoading ? (
        <p className="text-center">Loading users...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 text-sm md:text-base">
            <thead className="bg-gray-100">
              <tr className="text-left">
                <th className="p-2 border">#</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Role</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="p-2 border">{idx + 1}</td>
                  <td className="p-2 border whitespace-nowrap">{user.name}</td>
                  <td className="p-2 border">{user.email}</td>
                  <td className="p-2 border capitalize">{user.role}</td>
                  <td className="p-2 border">
                    <select
                      value={user.role}
                      onChange={(e) =>
                        handleRoleChange(user._id, e.target.value)
                      }
                      className="border px-2 py-1 rounded bg-white text-gray-700"
                    >
                      <option value="student">Student</option>
                      <option value="tutor">Tutor</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {users.length === 0 && (
            <p className="text-center mt-4 text-gray-500">No users found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminViewUsers;
