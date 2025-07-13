// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { Link, useNavigate } from 'react-router'; // ✅ Corrected import
// import SocialLogin from '../SocialLogin/SocialLogin';
// import axios from 'axios';
// import useAxios from '../../../hooks/UseAxios';
// import { updateProfile } from 'firebase/auth';
// import UseAuth from '../../../Hook/UseAuth';

// const Register = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm();

//   const { createUser } = UseAuth();
//   const [uploading, setUploading] = useState(false);
//   const [photoURL, setPhotoURL] = useState("");
//   const navigate = useNavigate();

//   const axiosInstance = useAxios();
//   const imgbbApiKey = import.meta.env.VITE_image_upload_key;
//   console.log("🔑 Image Upload Key:", imgbbApiKey);

//   const handlePhotoUpload = async (e) => {
//     const image = e.target.files[0];
//     if (!image) return;

//     if (!imgbbApiKey) {
//       alert("Image upload key is missing!");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("image", image);
//     setUploading(true);

//     try {
//       const res = await axios.post(
//         `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
//         formData
//       );
//       setPhotoURL(res.data.data.url);
//       console.log("📸 Image uploaded:", res.data.data.url);
//     } catch (error) {
//       console.error("❌ Image upload failed:", error.message);
//       alert("Image upload failed. Please check your network or try a different browser.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const onSubmit = async (data) => {
//     setUploading(true);

//     try {
//       let finalPhoto = photoURL || data.photoLink || "";

//       if (!finalPhoto && data.photoFile && data.photoFile.length > 0) {
//         const file = data.photoFile[0];
//         const formData = new FormData();
//         formData.append("image", file);

//         const res = await axios.post(
//           `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
//           formData
//         );

//         if (res.data.success) {
//           finalPhoto = res.data.data.url;
//         } else {
//           alert("Image upload failed.");
//           setUploading(false);
//           return;
//         }
//       }

//       if (!finalPhoto) {
//         alert("Please upload a photo or provide a valid photo link.");
//         setUploading(false);
//         return;
//       }

//       const result = await createUser(data.email, data.password);
//       const user = result.user;

//       await updateProfile(user, {
//         displayName: data.name,
//         photoURL: finalPhoto,
//       });

//       const userInfo = {
//         name: data.name,
//         email: data.email,
//         photoURL: finalPhoto,
//         role: data.role,
//         created_at: new Date().toISOString(),
//         last_log_in: new Date().toISOString(),
//         uid: user.uid,
//       };

//       const response = await axiosInstance.post('/users', userInfo);
//       console.log('📦 MongoDB response:', response.data);

//       if (response.data.insertedCount === 1 || response.data.inserted === false) {
//         alert(response.data.inserted === false ? "User already exists" : "Registration successful!");
//       } else {
//         alert("Unexpected server response.");
//       }

//       reset();
//       setPhotoURL("");
//       navigate('/');
//     } catch (error) {
//       console.error("❌ Registration failed:", error.message);
//       alert("Registration failed: " + error.message);
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="card bg-base-100 w-full max-w-sm shadow-2xl mx-auto mt-8">
//       <div className="card-body">
//         <h1 className="text-4xl font-semibold text-center mb-4">Create an Account</h1>

//         <form onSubmit={handleSubmit(onSubmit)}>
//           <fieldset className="space-y-3">
//             {/* Name */}
//             <label className="label">Name</label>
//             <input
//               {...register("name", { required: true })}
//               type="text"
//               className="input input-bordered w-full"
//               placeholder="Enter your name"
//             />
//             {errors.name && <p className="text-red-500">Name is required</p>}

//             {/* Email */}
//             <label className="label">Email</label>
//             <input
//               type="email"
//               {...register("email", { required: true })}
//               className="input input-bordered w-full"
//               placeholder="Email"
//             />
//             {errors.email && <p className="text-red-500">Email is required</p>}

//             {/* Password */}
//             <label className="label">Password</label>
//             <input
//               type="password"
//               {...register("password", { required: true, minLength: 6 })}
//               className="input input-bordered w-full"
//               placeholder="Password"
//             />
//             {errors.password?.type === "required" && (
//               <p className="text-red-500">Password is required</p>
//             )}
//             {errors.password?.type === "minLength" && (
//               <p className="text-red-500">Password must be 6 characters or longer</p>
//             )}

//             {/* Profile Picture Upload */}
//             <label className="label">Upload Photo</label>
//             <input
//               type="file"
//               accept="image/*"
//               {...register("photoFile")}
//               onChange={handlePhotoUpload}
//               className="file-input file-input-bordered w-full"
//             />
//             {uploading && <p className="text-blue-500 text-sm">Uploading photo...</p>}

//             {/* Or direct photo link */}
//             <label className="label">Or Photo Link</label>
//             <input
//               type="text"
//               {...register("photoLink")}
//               className="input input-bordered w-full"
//               placeholder="https://your-image-link.com"
//             />

//             {/* Role */}
//             <label className="label">Select Role</label>
//             <select
//               className="select select-bordered w-full"
//               {...register("role", { required: true })}
//             >
//               <option value="">-- Choose Role --</option>
//               <option value="student">Student</option>
//               <option value="tutor">Tutor</option>
//             </select>
//             {errors.role && <p className="text-red-500">Role is required</p>}

//             {/* Submit */}
//             <button
//               type="submit"
//               className="btn btn-primary text-black w-full mt-4"
//               disabled={uploading}
//             >
//               {uploading ? "Processing..." : "Register"}
//             </button>

//             <p className="mt-2 text-sm text-center">
//               Already have an account?{" "}
//               <Link to="/login" className="text-blue-600 btn-link">
//                 Login
//               </Link>
//             </p>
//           </fieldset>
//         </form>

//         <div className="divider">OR</div>
//         <SocialLogin />
//       </div>
//     </div>
//   );
// };

// // export default Register;



import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import axios from 'axios';
import useAxios from '../../../hooks/UseAxios';
import SocialLogin from '../SocialLogin/SocialLogin';
import UseAuth from '../../../Hook/UseAuth';


const Register = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { createUser, updateUserProfile } = UseAuth();
  const [profilePic, setProfilePic] = useState('');
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const onSubmit = data => {

    console.log(data);

    createUser(data.email, data.password)
      .then(async (result) => {
        console.log(result.user);

        // update userinfo in the database
        const userInfo = {
          email: data.email,
           role: data.role, // default role
          created_at: new Date().toISOString(),
          last_log_in: new Date().toISOString()
        }

        const userRes = await axiosInstance.post('/users', userInfo);
        console.log(userRes.data);

        // update user profile in firebase
        const userProfile = {
          displayName: data.name,
          photoURL: profilePic
        }
        updateUserProfile(userProfile)
          .then(() => {
            console.log('profile name pic updated')
            reset();
            navigate('/');
          })
          .catch(error => {
            console.log(error)
          })

      })
      .catch(error => {
        console.error(error);
      })
  }

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    console.log(image)

    const formData = new FormData();
    formData.append('image', image);


    const imagUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`
    const res = await axios.post(imagUploadUrl, formData)

    setProfilePic(res.data.data.url);

  }

  return (

    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h1 className="text-5xl font-bold">Create Account</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset">
            {/* name field */}
            <label className="label">Your Name</label>
            <input type="text"
              {...register('name', { required: true })}
              className="input" placeholder="Your Name" />
            {
              errors.email?.type === 'required' && <p className='text-red-500'>Name is required</p>
            }
            {/* name field */}
            <label className="label">Your Name</label>
            <input type="file"
              onChange={handleImageUpload}
              className="input" placeholder="Your Profile picture" />

            {/* email field */}
            <label className="label">Email</label>
            <input type="email"
              {...register('email', { required: true })}
              className="input" placeholder="Email" />
            {
              errors.email?.type === 'required' && <p className='text-red-500'>Email is required</p>
            }
            {/* password field*/}
            <label className="label">Password</label>
            <input type="password" {...register('password', { required: true, minLength: 6 })} className="input" placeholder="Password" />
            {
              errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>
            }
            {
              errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be 6 characters or longer</p>
            }

            {/* Role */}
            <label className="label">Select Role</label>
            <select
              className="select select-bordered w-full"
              {...register("role", { required: true })}
            >
              <option value="">-- Choose Role --</option>
              <option value="student">Student</option>
              <option value="tutor">Tutor</option>
            </select>
            {errors.role && <p className="text-red-500">Role is required</p>}

            <div><a className="link link-hover">Forgot password?</a></div>
            <button className="btn btn-primary text-black mt-4">Register</button>
          </fieldset>
          <p><small>Already have an account? <Link className="btn btn-link" to="/login">Login</Link></small></p>
        </form>
        <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default Register;




//     {/* Role */}
// //             <label className="label">Select Role</label>
// //             <select
// //               className="select select-bordered w-full"
// //               {...register("role", { required: true })}
// //             >
// //               <option value="">-- Choose Role --</option>
// //               <option value="student">Student</option>
// //               <option value="tutor">Tutor</option>
// //             </select>
// //             {errors.role && <p className="text-red-500">Role is required</p>}