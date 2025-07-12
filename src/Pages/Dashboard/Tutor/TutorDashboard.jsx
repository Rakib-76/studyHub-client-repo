// import React, { useEffect, useState } from 'react';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import axios from 'axios';
// // import { auth } from '../../Firebase/firebase.init';
// // import useAxiosSecure from '../../hooks/UseAxiosSecure';
// import { auth } from '../../../Firebase/firebase.init';
// import UseAxiosSecure from '../../../hooks/UseAxiosSecure';

// const TutorDashboard = () => {
//   const [user] = useAuthState(auth);
//   const axiosSecure = UseAxiosSecure();

//   const [tab, setTab] = useState('create-session');
//   const [sessions, setSessions] = useState([]);
//   const [materials, setMaterials] = useState([]);

//   // Fetch tutor's study sessions
//   useEffect(() => {
//     if (user?.email && tab === 'view-sessions') {
//       axiosSecure.get(`/tutor-sessions?email=${user.email}`)
//         .then(res => setSessions(res.data))
//         .catch(err => console.error(err));
//     }
//   }, [tab, user]);

//   // Fetch uploaded materials
//   useEffect(() => {
//     if (user?.email && tab === 'view-materials') {
//       axiosSecure.get(`/tutor-materials?email=${user.email}`)
//         .then(res => setMaterials(res.data))
//         .catch(err => console.error(err));
//     }
//   }, [tab, user]);

//   // Create study session
//   const handleCreateSession = async (e) => {
//     e.preventDefault();
//     const form = e.target;
//     const session = {
//       title: form.title.value,
//       description: form.description.value,
//       date: form.date.value,
//       tutorEmail: user.email
//     };

//     try {
//       await axiosSecure.post('/tutor-sessions', session);
//       alert('Session created successfully');
//       form.reset();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Upload material
//   const handleUploadMaterial = async (e) => {
//     e.preventDefault();
//     const form = e.target;
//     const material = {
//       title: form.title.value,
//       link: form.link.value,
//       tutorEmail: user.email
//     };

//     try {
//       await axiosSecure.post('/tutor-materials', material);
//       alert('Material uploaded');
//       form.reset();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="p-6 max-w-5xl mx-auto">
//       {/* Tabs */}
//       <div className="flex gap-4 mb-6">
//         <button onClick={() => setTab('create-session')} className="btn btn-outline">Create Session</button>
//         <button onClick={() => setTab('view-sessions')} className="btn btn-outline">View Sessions</button>
//         <button onClick={() => setTab('upload-material')} className="btn btn-outline">Upload Material</button>
//         <button onClick={() => setTab('view-materials')} className="btn btn-outline">View Materials</button>
//       </div>

//       {/* Tab Contents */}
//       {tab === 'create-session' && (
//         <form onSubmit={handleCreateSession} className="space-y-4">
//           <input name="title" type="text" placeholder="Session Title" className="input input-bordered w-full" required />
//           <textarea name="description" placeholder="Description" className="textarea textarea-bordered w-full" required />
//           <input name="date" type="date" className="input input-bordered w-full" required />
//           <button type="submit" className="btn btn-primary">Create</button>
//         </form>
//       )}

//       {tab === 'view-sessions' && (
//         <div>
//           <h2 className="text-xl font-semibold mb-4">Your Sessions</h2>
//           {sessions.length === 0 ? <p>No sessions found.</p> : (
//             <ul className="space-y-2">
//               {sessions.map(session => (
//                 <li key={session._id} className="p-4 border rounded">
//                   <h3 className="font-bold">{session.title}</h3>
//                   <p>{session.description}</p>
//                   <span className="text-sm text-gray-600">Date: {session.date}</span>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       )}

//       {tab === 'upload-material' && (
//         <form onSubmit={handleUploadMaterial} className="space-y-4">
//           <input name="title" type="text" placeholder="Material Title" className="input input-bordered w-full" required />
//           <input name="link" type="url" placeholder="Material Link" className="input input-bordered w-full" required />
//           <button type="submit" className="btn btn-primary">Upload</button>
//         </form>
//       )}

//       {tab === 'view-materials' && (
//         <div>
//           <h2 className="text-xl font-semibold mb-4">Your Materials</h2>
//           {materials.length === 0 ? <p>No materials uploaded.</p> : (
//             <ul className="space-y-2">
//               {materials.map(mat => (
//                 <li key={mat._id} className="p-4 border rounded">
//                   <h3 className="font-bold">{mat.title}</h3>
//                   <a href={mat.link} target="_blank" rel="noreferrer" className="text-blue-500 underline">View</a>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default TutorDashboard;


import React from 'react';
import { NavLink, Outlet } from 'react-router';

const TutorDashboard = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Mobile Navbar */}
        <div className="navbar bg-base-300 lg:hidden">
          <div className="flex-none">
            <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>
          </div>
          <div className="flex-1 px-2">Tutor Dashboard</div>
        </div>

        {/* Page Content */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>

      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          <li><NavLink to="/">🏠 Home</NavLink></li>
          <li><NavLink to="/dashboard/tutor/create">📝 Create Session</NavLink></li>
          <li><NavLink to="/dashboard/tutor/view-sessions">📚 View Sessions</NavLink></li>
          <li><NavLink to="/dashboard/tutor/upload">📤 Upload Materials</NavLink></li>
          <li><NavLink to="/dashboard/tutor/view-materials">📁 View Materials</NavLink></li>
        </ul>
      </div>
    </div>
  );
};

export default TutorDashboard;
