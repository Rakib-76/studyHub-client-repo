import React, { useEffect, useState } from 'react';
import UseAxiosSecure from '../../../hooks/UseAxiosSecure';
import UseAuth from '../../../Hook/UseAuth';
import Swal from 'sweetalert2';

const ViewMyMaterials = () => {
    const { user } = UseAuth();
    const axiosSecure = UseAxiosSecure();
    const [materials, setMaterials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({ title: '', resourceLink: '' });

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
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                await axiosSecure.delete(`/tutor/materials/${id}`);
                fetchMaterials();
                Swal.fire('Deleted!', 'Your material has been deleted.', 'success');
            } catch (err) {
                Swal.fire('Error!', 'Delete failed.', 'error');
            }
        }
    };


    const handleEditClick = (material) => {
        setEditingId(material._id);
        setEditData({ title: material.title, resourceLink: material.resourceLink });
    };

    const handleUpdate = async (id) => {
        try {
            const res = await axiosSecure.patch(`/tutor/materials/${id}`, editData);
            if (res.data.modifiedCount > 0) {
                Swal.fire('Updated!', 'Material updated successfully.', 'success');
                setEditingId(null);
                fetchMaterials();
            } else {
                Swal.fire('No changes!', 'Nothing was updated.', 'info');
            }
        } catch (err) {
            console.error('Update error:', err);
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
                            {editingId === m._id ? (
                                <>
                                    <input
                                        type="text"
                                        className="input input-bordered w-full mb-2"
                                        value={editData.title}
                                        onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                                        placeholder="Title"
                                    />
                                    <input
                                        type="url"
                                        className="input input-bordered w-full mb-2"
                                        value={editData.resourceLink}
                                        onChange={(e) =>
                                            setEditData({ ...editData, resourceLink: e.target.value })
                                        }
                                        placeholder="Google Drive Link"
                                    />
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleUpdate(m._id)}
                                            className="btn btn-sm btn-success"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={() => setEditingId(null)}
                                            className="btn btn-sm btn-ghost"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <h3 className="text-xl font-semibold">{m.title}</h3>
                                    <img src={m.imageURL} alt={m.title} className="h-28 my-2 rounded" />
                                    <p>
                                        <strong>Drive Link:</strong>{' '}
                                        <a href={m.resourceLink} target="_blank" className="text-blue-600 underline">
                                            Open
                                        </a>
                                    </p>
                                    <div className="mt-4 flex gap-2">
                                        <button onClick={() => handleEditClick(m)} className="btn btn-sm btn-info">
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(m._id)}
                                            className="btn btn-sm btn-error"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ViewMyMaterials;
