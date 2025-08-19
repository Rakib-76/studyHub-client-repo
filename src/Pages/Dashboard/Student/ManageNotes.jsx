import React, { useEffect, useState } from "react";
import UseAuth from "../../../Hook/UseAuth";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure";
import Swal from "sweetalert2";

const ManageNotes = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  

  useEffect(() => {
    axiosSecure.get(`/notes?email=${user.email}`).then((res) => {
      setNotes(res.data);
    });
  }, [user.email, axiosSecure]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This note will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/notes/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire("Deleted!", "Note has been deleted.", "success");
          setNotes(notes.filter((note) => note._id !== id));
        }
      }
    });
  };

  const handleUpdate = async () => {
    const res = await axiosSecure.patch(`/notes/${editingNote._id}`, {
      title: editingNote.title,
      description: editingNote.description,
    });

    if (res.data.modifiedCount > 0) {
      Swal.fire("Updated!", "Note updated successfully.", "success");
      setEditingNote(null);
      // Reload notes
      const res = await axiosSecure.get(`/notes?email=${user.email}`);
      setNotes(res.data);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center dark:text-black">Manage My Notes</h2>

      {notes.length === 0 ? (
        <p className="text-center text-gray-500">No notes found.</p>
      ) : (
        <div className="space-y-4">
          {notes.map((note) => (
            <div
              key={note._id}
              className="p-4 border rounded shadow-md bg-white space-y-2"
            >
              <h3 className="font-semibold text-lg dark:text-black">{note.title}</h3>
              <p className="dark:text-black">{note.description}</p>

              <div className="flex gap-3">
                <button
                  onClick={() => setEditingNote(note)}
                  className="btn btn-sm btn-warning"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(note._id)}
                  className="btn btn-sm btn-error"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Update Form Modal */}
      {editingNote && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 space-y-3">
            <h3 className="text-lg font-bold mb-2">Update Note</h3>
            <input
              type="text"
              value={editingNote.title}
              onChange={(e) =>
                setEditingNote({ ...editingNote, title: e.target.value })
              }
              className="input input-bordered w-full"
            />
            <textarea
              rows={4}
              value={editingNote.description}
              onChange={(e) =>
                setEditingNote({ ...editingNote, description: e.target.value })
              }
              className="textarea textarea-bordered w-full"
            ></textarea>

            <div className="flex justify-end gap-3 mt-2">
              <button
                onClick={() => setEditingNote(null)}
                className="btn btn-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="btn btn-sm btn-success"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageNotes;
