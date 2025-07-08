import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import UseAuth from '../../../Hook/UseAuth';
import { Link } from 'react-router'; // ✅ Fix router import
import SocialLogin from '../SocialLogin/SocialLogin';
import axios from 'axios';
import { updateProfile } from 'firebase/auth';

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { createUser } = UseAuth();
  const [uploading, setUploading] = useState(false);
  const [photoURL, setPhotoURL] = useState("");

  const imgbbApiKey = "084cb56f318d588f7d164743ed1c751f"; 

  const handlePhotoUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
        formData
      );
      setPhotoURL(res.data.data.url);
    } catch (error) {
      console.error("Image upload error:", error);
      alert("Photo upload failed.");
    } finally {
      setUploading(false);
    }
  };

const onSubmit = async (data) => {
  setUploading(true);
  try {
    let finalPhoto = data.photoLink; // Default to direct link

    // If user selected a file, upload it to imgbb first
    if (data.photoFile && data.photoFile.length > 0) {
      const file = data.photoFile[0];
      const formData = new FormData();
      formData.append("image", file);

      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
        formData
      );

      if (res.data.success) {
        finalPhoto = res.data.data.url;
        console.log("Image uploaded to imgbb:", finalPhoto);
      } else {
        alert("Image upload failed.");
        return;
      }
    }

    if (!finalPhoto) {
      alert("Please upload a photo or provide a valid photo link.");
      return;
    }

    const result = await createUser(data.email, data.password);
    const user = result.user;

    await updateProfile(user, {
      displayName: data.name,
      photoURL: finalPhoto,
    });

    console.log("Registered user:", {
      name: data.name,
      email: data.email,
      photo: finalPhoto,
      role: data.role,
    });

    alert("User registered successfully!");
    reset();
    setPhotoURL("");
  } catch (error) {
    console.error("Registration error:", error.message);
    alert("Registration failed: " + error.message);
  } finally {
    setUploading(false);
  }
};


  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h1 className="text-4xl font-semibold text-center mb-4">Create an account</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="space-y-3">
            {/* Name */}
            <label className="label">Name</label>
            <input
              {...register("name", { required: true, minLength: 5 })}
              type="text"
              className="input input-bordered w-full"
              placeholder="Enter your name"
            />
            {errors.name && <p className="text-red-500">Name is required (min 5 characters)</p>}

            {/* Email */}
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input input-bordered w-full"
              placeholder="Email"
            />
            {errors.email && <p className="text-red-500">Email is required</p>}

            {/* Password */}
            <label className="label">Password</label>
            <input
              type="password"
              {...register("password", { required: true, minLength: 8 })}
              className="input input-bordered w-full"
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-red-500">Password must be at least 8 characters</p>
            )}

            {/* Photo Upload */}
            <label className="label">Upload Photo</label>
            <input
              type="file"
              accept="image/*"
              {...register("photoFile")}
              className="file-input file-input-bordered w-full"
            />
            {uploading && <p className="text-blue-600 text-sm">Uploading image...</p>}

            {/* Or Photo Link */}
            <label className="label">Or Paste Photo URL</label>
            <input
              type="text"
              placeholder="https://..."
              {...register("photoLink")}
              className="input input-bordered w-full"
            />

            {/* Role */}
            <label className="label">Select Role</label>
            <select
              className="select select-bordered w-full"
              {...register("role", { required: true })}
            >
              <option value="">-- Choose Role --</option>
              <option value="student">Student</option>
              <option value="tutor">Tutor</option>
              <option value="admin">Admin</option>
            </select>
            {errors.role && <p className="text-red-500">Role is required</p>}

            {/* Submit */}
            <button type="submit" className="btn bg-[#caeb66] text-black w-full mt-4">
              Register
            </button>

            <p className="mt-2 text-xs text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 btn-link">
                Login
              </Link>
            </p>
          </fieldset>
        </form>

        <div className="divider">OR</div>
        <SocialLogin />
      </div>
    </div>
  );
};

export default Register;
