import React, { useEffect, useState } from 'react';
import UseAxiosSecure from '../../../hooks/UseAxiosSecure';
import UseAuth from '../../../Hook/UseAuth';

const ViewAllMyMaterial = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMaterials = async () => {
    try {
      const res = await axiosSecure.get(`/tutor/materials?email=${user.email}`);
      setMaterials(res.data);
    } catch (err) {
      console.error('Error fetching materials:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) fetchMaterials();
  }, [user]);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete?')) return;
    try {
      await axiosSecure.delete(`/tutor/materials/${id}`);
      fetchMaterials();
    } catch (err) {
      alert('Delete failed');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">My Uploaded Materials</h2>
      {loading ? (
        <p>Loading...</p>
      ) : materials.length === 0 ? (
        <p className="text-center text-red-500">No materials found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {materials.map((m) => (
            <div key={m._id} className="border p-4 rounded shadow bg-white">
              <h3 className="text-xl font-semibold">{m.title}</h3>
              <img src={m.imageURL} alt={m.title} className="h-28 my-2 rounded" />
              <p><strong>Drive Link:</strong> <a href={m.resourceLink} target="_blank" className="text-blue-600 underline">Open</a></p>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleDelete(m._id)}
                  className="btn btn-sm btn-error"
                >
                  Delete
                </button>
                {/* You can add edit modal or inline update here */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewAllMyMaterial;
