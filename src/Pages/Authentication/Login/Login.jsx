import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import UseAuth from '../../../Hook/UseAuth';
import { Link, useNavigate } from 'react-router'; 
import SocialLogin from '../SocialLogin/SocialLogin';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signIn } = UseAuth();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false); 

    const onSubmit = data => {
        setLoading(true); // Start loader
        signIn(data.email, data.password)
            .then(result => {
                console.log(result.user);
                alert("Sign in successfully");
                setLoading(false); 
                navigate("/"); 
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
                alert("please put email and pasword correctly ")
            });
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
