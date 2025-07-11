import {
  createBrowserRouter,
} from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home/Home";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Pages/Authentication/Login/Login";
import Register from "../Pages/Authentication/Register/Register";
import PrivateRoute from "../PrivateRoutes/PrivateRoute";
import DashboardLayout from "../Layout/DashboardLayout";
import StudentDashboard from "../Pages/Dashboard/Student/StudentDashboard";
import TutorDashboard from "../Pages/Dashboard/Tutor/TutorDashboard";
import AdminRoute from "../PrivateRoutes/AdminRoute";
import AdminDashboard from "../Pages/Dashboard/Admin/AdminDashboard";
import StudentRoute from "../PrivateRoutes/StudentRoute";
import TutorRoute from "../PrivateRoutes/TutorRoute";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home
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
    path: "/dashboard",
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
      {
        path: "admin",
        element: (
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        )
      },
      {
        path: "student",
        element: <StudentRoute>
          <StudentDashboard />
        </StudentRoute>

      },
      {
        path: "tutor",
        element: 
        <TutorRoute>
              <TutorDashboard />
        </TutorRoute>
      
      }
    ]
  }

]);