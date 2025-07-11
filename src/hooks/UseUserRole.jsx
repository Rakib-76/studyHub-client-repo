import React from 'react';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import UseAxiosSecure from './UseAxiosSecure';
import { auth } from '../Firebase/firebase.init';

const UseUserRole = () => {
  const [role, setRole] = useState(null);
  const axiosSecure = UseAxiosSecure();
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/users/${user.email}`)
        .then(res => setRole(res.data.role));
    }
  }, [user]);

  return role;
};

export default UseUserRole;
