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
import ViewSession from "../Pages/Dashboard/Tutor/ViewSession";
import UploadSession from "../Pages/Dashboard/Tutor/UploadSession";
import ViewALlMateial from "../Pages/Dashboard/Tutor/ViewALlMateial";
import AdminLayout from "../Layout/AdminLayout";
import TutorLayout from "../Layout/TutorLayout";
import StudentLayout from "../Layout/StudentLayout";
import CreateNote from "../Pages/Dashboard/Student/CreateNote";
import ViewBookedSessions from "../Pages/Dashboard/Student/ViewBookedSessions";
import ManageNotes from "../Pages/Dashboard/Student/ManageNotes";
import ViewAllMaterials from "../Pages/Dashboard/Student/ViewAllMaterials";
import StudySessions from "../Pages/Home/StudySession/StudySessions ";
import SessionDetails from "../Pages/Home/Details/SessionDetails ";
import TutorList from "../Pages/Home/TutorList/TutorList ";
import AdminViewUsers from "../Pages/Dashboard/Admin/AdminViewUsers ";
import AdminViewSessions from "../Pages/Dashboard/Admin/AdminViewSessions ";
import AdminViewMaterials from "../Pages/Dashboard/Admin/AdminViewMaterials";


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
        element:<AdminViewMaterials></AdminViewMaterials>
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
        path: "view-sessions",
        element: <ViewSession />
      },
      {
        path: "upload",
        element: <UploadSession />
      },
      {
        path: "materials",
        element: <ViewALlMateial />
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
        path: "manage-notes",
        element: <ManageNotes />
      },
      {
        path: "study-materials",
        element: <ViewAllMaterials />
      },
    ]
  }


]);


