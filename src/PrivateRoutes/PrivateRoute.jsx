import React from 'react';
import UseAuth from '../Hook/UseAuth';
import { Navigate } from 'react-router';

const PrivateRoute = ({Children}) => {
    const {loading, user} = UseAuth();

    
if(loading){
    return <span className="loading loading-spinner loading-xl"></span>
}

// Here if user not exist then it will be shift login page and exist return children 
if(!user) {
    <Navigate to='/login'></Navigate>
}
    return Children;
};

export default PrivateRoute;