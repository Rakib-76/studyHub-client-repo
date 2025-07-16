import {
  createBrowserRouter,
} from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home/Home";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Pages/Authentication/Login/Login";
import Register from "../Pages/Authentication/Register/Register";
import PrivateRoute from "../PrivateRoutes/PrivateRoute";
import StudentDashboard from "../Pages/Dashboard/Student/StudentDashboard";
import TutorDashboard from "../Pages/Dashboard/Tutor/TutorDashboard";
import AdminRoute from "../PrivateRoutes/AdminRoute";
import AdminDashboard from "../Pages/Dashboard/Admin/AdminDashboard";
import StudentRoute from "../PrivateRoutes/StudentRoute";
import TutorRoute from "../PrivateRoutes/TutorRoute";
import CreateSession from "../Pages/Dashboard/Tutor/CreateSession";
import ViewSession from "../Pages/Dashboard/Tutor/TutorSessions";
import AdminLayout from "../Layout/AdminLayout";
import TutorLayout from "../Layout/TutorLayout";
import StudentLayout from "../Layout/StudentLayout";
import CreateNote from "../Pages/Dashboard/Student/CreateNote";
import ViewBookedSessions from "../Pages/Dashboard/Student/ViewBookedSessions";
import ManageNotes from "../Pages/Dashboard/Student/ManageNotes";
import StudySessions from "../Pages/Home/StudySession/StudySessions ";
import SessionDetails from "../Pages/Home/Details/SessionDetails ";
import TutorList from "../Pages/Home/TutorList/TutorList ";
import AdminViewUsers from "../Pages/Dashboard/Admin/AdminViewUsers ";
import AdminViewSessions from "../Pages/Dashboard/Admin/AdminViewSessions ";
import AdminViewMaterials from "../Pages/Dashboard/Admin/AdminViewMaterials";
import TutorSessions from "../Pages/Dashboard/Tutor/TutorSessions";;
import ApproveSessions from "../Pages/Dashboard/Tutor/ApproveSessions";
import ViewAllMyMaterial from "../Pages/Dashboard/Tutor/ViewALlMateial";
import BookingDetails from "../Pages/Dashboard/Student/BookingDetails";
import StudentStudyMaterials from "../Pages/Dashboard/Student/StudentStudyMaterials";
import RejectedSessions from "../Pages/Dashboard/Tutor/RejectedSession";
// import BookingDetails from "../Pages/Dashboard/Student/BookingDetails";
// import UploadMaterials from "../Pages/Dashboard/Tutor/UploadMaterials ";



export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home
      },



      {
        path: "/tutors",
        element: <TutorList />,
      },

      {
        path: "/sessions",
        element: <StudySessions></StudySessions>
      },
      {
        path: "/sessions/:id",
        element: <SessionDetails />,
      },



    ]
  },
  {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: "/login",
        Component: Login
      },
      {
        path: 'register',
        Component: Register
      }
    ]
  },

  {
    path: "/dashboard/admin",
    element: (
      <PrivateRoute>
        <AdminRoute>
          <AdminLayout />
        </AdminRoute>
      </PrivateRoute>
    ),
    children: [
      {
        path: "users",
        element: <AdminViewUsers />
      },
      {
        path: "sessions",
        element: <AdminViewSessions />
      },
      {
        path: "materials",
        element: <AdminViewMaterials></AdminViewMaterials>
      },
    ]
  },
  {
    path: "/dashboard/tutor",
    element: (
      <PrivateRoute>
        <TutorRoute>
          <TutorLayout />
        </TutorRoute>
      </PrivateRoute>
    ),
    children: [
      {
        path: "create",
        element: <CreateSession />
      },
      {
        path: "sessions",
        element: <TutorSessions></TutorSessions>
      },
      {
        path: "upload",
        element: <ApproveSessions></ApproveSessions>
      },

      // {
      //   path: "upload/:sessionId", // ✅ dynamic route
      //   element: <UploadMaterials />
      // },

      {
        path: "materials",
        element: <ViewAllMyMaterial></ViewAllMyMaterial>
      },

      {
        path: "rejected-sessions",
        element: <RejectedSessions />,
      }

    ]
  },
  {
    path: "/dashboard/student",
    element: (
      <PrivateRoute>
        <StudentRoute>
          <StudentLayout />
        </StudentRoute>
      </PrivateRoute>
    ),
    children: [

      {
        path: "create-note",
        element: <CreateNote />
      },
      {
        path: "booked-sessions",
        element: <ViewBookedSessions />
      },
      {
        path: "booked-sessions/:id", // ✅ view a booked session in detail
        element: <BookingDetails />,
      },
      {
        path: "manage-notes",
        element: <ManageNotes />
      },
      {
        path: "study-materials",
        element: <StudentStudyMaterials></StudentStudyMaterials>
      },
    ]
  }


]);


