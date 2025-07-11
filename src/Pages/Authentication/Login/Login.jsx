import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import UseAuth from '../../../Hook/UseAuth';
import { Link, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import axios from 'axios';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signIn } = UseAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const result = await signIn(data.email, data.password);
      const user = result.user;
      console.log(" Logged in:", user);


      const res = await axios.post('http://localhost:3000/jwt', {
        email: user.email
      });

      const token = res.data.token;
      localStorage.setItem('access-token', token);
      console.log(" JWT token saved");

      alert("Sign in successfully");
      navigate("/"); 
    } catch (error) {
      console.error(" Login error:", error);
      alert("Please check email and password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className='card-body'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset">
            <h1 className='text-5xl font-semibold'>Login !</h1>

            <label className="label">Email</label>
            <input
              type="email"
              {...register('email')}
              className="input"
              placeholder="Email"
            />

            <label className="label">Password</label>
            <input
              type="password"
              {...register('password', {
                required: true,
                minLength: 6
              })}
              className="input"
              placeholder="Password"
            />

            {errors.password?.type === "minLength" && (
              <p role='alert' className='text-red-600'>
                Password must be at least 6 characters
              </p>
            )}

            {errors.password?.type === "required" && (
              <p role='alert' className='text-red-600'>
                Password is required
              </p>
            )}

            <div><a className="link link-hover">Forgot password?</a></div>

            <button className="btn bg-[#caeb66] text-black font-bold w-full mt-4" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </fieldset>

          <p>
            <small>
              Don't have an account?
              <Link to='/register' className='btn-link text-blue-700'> Register</Link>
            </small>
          </p>
        </form>

        <SocialLogin />
      </div>
    </div>
  );
};

export default Login;

// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import UseAuth from '../../../Hook/UseAuth';
// import { Link, useNavigate } from 'react-router';
// import SocialLogin from '../SocialLogin/SocialLogin';
// import useAxiosSecure from '../../../hooks/UseAxiosSecure';

// const Login = () => {
//     const { register, handleSubmit, formState: { errors } } = useForm();
//     const { signIn } = UseAuth();
//     const navigate = useNavigate();
//     const axiosSecure = useAxiosSecure();

//     const [loading, setLoading] = useState(false);

//     const getJWTToken = async (email) => {
//         const res = await axiosSecure.post('/jwt', { email });
//         const token = res.data.token;
//         localStorage.setItem('access-token', token);
//         console.log(" JWT token saved");
//     };

//     const onSubmit = async (data) => {
//         setLoading(true);
//         try {
//             const result = await signIn(data.email, data.password);
//             const user = result.user;
//             console.log("🔓 Logged in:", user);

//             await getJWTToken(user.email); // Save token

//             //  Get role from DB
//             const res = await axiosSecure.get(`/users/${user.email}`);
//             const role = res.data.role;

//             //  Redirect based on role
//             if (role === 'admin') navigate('/dashboard/admin');
//             else if (role === 'tutor') navigate('/dashboard/tutor');
//             else navigate('/dashboard/student');
//             alert("sign in successfully ")
//         } catch (error) {
//             console.error("Login error:", error);
//             alert("Please check email and password");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
//             <div className='card-body'>
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     <fieldset className="fieldset">
//                         <h1 className='text-5xl font-semibold'>Login !</h1>

//                         <label className="label">Email</label>
//                         <input
//                             type="email"
//                             {...register('email')}
//                             className="input"
//                             placeholder="Email"
//                         />

//                         <label className="label">Password</label>
//                         <input
//                             type="password"
//                             {...register('password', {
//                                 required: true,
//                                 minLength: 6
//                             })}
//                             className="input"
//                             placeholder="Password"
//                         />

//                         {errors.password?.type === "minLength" && (
//                             <p role='alert' className='text-red-600'>
//                                 Password must be at least 6 characters
//                             </p>
//                         )}

//                         {errors.password?.type === "required" && (
//                             <p role='alert' className='text-red-600'>
//                                 Password is required
//                             </p>
//                         )}

//                         <div><a className="link link-hover">Forgot password?</a></div>

//                         <button className="btn bg-[#caeb66] text-black font-bold w-full mt-4" disabled={loading}>
//                             {loading ? "Logging in..." : "Login"}
//                         </button>
//                     </fieldset>

//                     <p>
//                         <small>
//                             Don't have an account?
//                             <Link to='/register' className='btn-link text-blue-700'> Register</Link>
//                         </small>
//                     </p>
//                 </form>

//                 <SocialLogin />
//             </div>
//         </div>
//     );
// };

// export default Login;


