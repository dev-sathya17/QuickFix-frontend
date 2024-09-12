import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register/Register";
import LoginPage from "./pages/login/LoginPage";
import ForgotPassword from "./pages/forgot password/ForgotPassword";
import ResetPassword from "./pages/forgot password/ResetPassword";
import UserDashboard from "./pages/UserDashboard/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import userLoader from "./loaders/user.loader";
import AuthenticatedRoute from "./routes/AuthenticatedRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import Profile from "./pages/Profile/Profile";
import Users from "./pages/Users/Users";
import adminLoader from "./loaders/admin.loader";

const router = createBrowserRouter([
  {
    path: "/",
    loader: userLoader.checkAuth,
    element: <AuthenticatedRoute />,
    children: [
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "",
        element: <LoginPage />,
      },
      {
        path: "forgot",
        element: <ForgotPassword />,
      },
      {
        path: "reset",
        element: <ResetPassword />,
      },
      {
        path: "profile",
        element: <ProtectedRoute />,
        loader: userLoader.checkAuth,
        children: [
          {
            path: "",
            element: <Profile />,
            loader: userLoader.fetchUser,
          },
        ],
      },
      {
        path: "user",
        element: <ProtectedRoute />,
        loader: userLoader.checkAuth,
        children: [
          {
            path: "dashboard",
            element: <UserDashboard />,
            loader: userLoader.checkAuth,
          },
        ],
      },
      {
        path: "admin",
        element: <ProtectedRoute />,
        loader: userLoader.checkAuth,
        children: [
          {
            path: "dashboard",
            element: <AdminDashboard />,
            loader: userLoader.checkAuth,
          },
          {
            path: "users",
            element: <Users />,
            loader: adminLoader.fetchAllUsers,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
