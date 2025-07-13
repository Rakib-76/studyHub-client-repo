import React from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure";

const AdminViewMaterials = () => {
  const axiosSecure = UseAxiosSecure();

  const { data: materials = [], refetch, isLoading } = useQuery({
    queryKey: ["admin-materials"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/materials");
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This material will be removed permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      await axiosSecure.delete(`/admin/materials/${id}`);
      Swal.fire("Deleted!", "Material deleted successfully.", "success");
      refetch();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
        All Uploaded Study Materials
      </h2>

      {isLoading ? (
        <p className="text-center">Loading materials...</p>
      ) : materials.length === 0 ? (
        <p className="text-center text-gray-500">No materials found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials.map((material) => (
            <div key={material._id} className="bg-white p-4 rounded shadow border">
              <h3 className="text-lg font-semibold mb-2">{material.title}</h3>
              <p className="text-sm text-gray-600 mb-2">
                Uploaded by: {material.uploaderName} ({material.uploaderEmail})
              </p>
              <p className="text-sm text-gray-700 mb-2">{material.description}</p>
              {material.fileUrl && (
                <a
                  href={material.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline text-sm mb-2 inline-block"
                >
                  View Material
                </a>
              )}
              <button
                onClick={() => handleDelete(material._id)}
                className="mt-3 bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 text-sm"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminViewMaterials;
