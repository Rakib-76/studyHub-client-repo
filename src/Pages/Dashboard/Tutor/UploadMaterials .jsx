import React, { useState } from "react";
import { useForm } from "react-hook-form";
import UseAuth from "../../../Hook/UseAuth";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure";
import axios from "axios";

const UploadMaterials = ({ sessionId }) => {
    console.log(sessionId);
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const [imageURL, setImageURL] = useState("");
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const imgbbApiKey = import.meta.env.VITE_image_upload_key;

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    if (!image) return alert("Please select an image");

    setUploading(true);
    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
        formData
      );
      setImageURL(res.data.data.url);
    } catch (error) {
      alert("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data) => {
    const material = {
      title: data.title,
      sessionId,
      tutorEmail: user.email,
      imageURL,
      resourceLink: data.resourceLink || ""
    };

    try {
      const res = await axiosSecure.post("/tutor/materials", material);
      if (res.data.success) {
        alert("Material uploaded successfully!");
        reset();
        setImageURL("");
      } else {
        alert("Upload failed");
      }
    } catch (error) {
      alert("Upload error");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h3 className="text-xl font-bold mb-4 text-center">Upload Material</h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Session ID */}
        <div>
          <label>Study Session ID</label>
          <input
            type="text"
            value={sessionId}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        {/* Title */}
        <div>
          <label>Title</label>
          <input
            {...register("title", { required: "Title is required" })}
            type="text"
            className="input input-bordered w-full"
            placeholder="Material title"
          />
          {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        </div>

        {/* Tutor Email */}
        <div>
          <label>Tutor Email</label>
          <input
            type="email"
            value={user.email}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label>Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="file-input file-input-bordered w-full"
          />
          {uploading && <p className="text-blue-500 mt-1">Uploading...</p>}
          {imageURL && (
            <img src={imageURL} alt="Preview" className="h-20 mt-2 rounded" />
          )}
        </div>

        {/* Google Drive Link */}
        <div>
          <label>Google Drive Link</label>
          <input
            {...register("resourceLink")}
            type="url"
            placeholder="https://drive.google.com/..."
            className="input input-bordered w-full"
          />
        </div>

        <button type="submit" className="btn btn-primary w-full" disabled={uploading}>
          Upload Material
        </button>
      </form>
    </div>
  );
};

export default UploadMaterials;
