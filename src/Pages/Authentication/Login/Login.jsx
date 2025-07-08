import React from 'react';
import { useForm } from 'react-hook-form';
import UseAuth from '../../../Hook/UseAuth';
import { Link, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';

const Login = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    // Here the useAuth is custom hook .
    const { signIn } = UseAuth()
    const Navigate = useNavigate()

    const onSubmmit = data => {
        console.log(data);
        signIn(data.email, data.password)
            .then(result => {
                console.log(result.user);
                alert("Sign in successfully")
            })
               Navigate("/")
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className='card-body'>
                <form onSubmit={handleSubmit(onSubmmit)}>
                    <fieldset className="fieldset">
                        <h1 className='text-5xl font-semibold'>Login !</h1>
                        <label className="label">Email</label>
                        <input type="email" {...register('email')} className="input" placeholder="Email" />

                        <label className="label">Password</label>
                        <input type="password" {...register('password', {
                            required: true,
                            minLength: 6
                        })}

                            className="input" placeholder="Password" />

                        {errors.password?.type === "minLength" && (
                            <p role='alert' className='text-red-600'>Passowrd must be 6 charecters</p>
                        )}

                        {errors.password?.type === "required" && (
                            <p role='alert' className='text-red-600'>Passowrd is required</p>
                        )}

                        <div><a className="link link-hover">Forgot password?</a></div>

                        <button className="btn bg-[#caeb66] text-black font-bold w-full mt-4">Login</button>
                    </fieldset>
                        <p><small>Don't have any acoount? <Link to='/register' className=' btn-link text-blue-700'>Register</Link></small></p>
                </form>
                 <SocialLogin></SocialLogin>
            </div>
        </div>
    );
};

export default Login;