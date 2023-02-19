import HomePage from "../pages/HomePage/HomePage";
import ChatPage from "../pages/ChatPage/ChatPage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import UsersPage from "../pages/UsersPage/UsersPage";
import { ROUTE_PATHS } from "../data/constants";

export const Routes = () => {
  const router = createBrowserRouter([
    {
      path: ROUTE_PATHS.HOME,
      element: <HomePage />,
      errorElement: <ErrorPage />,
    },
    {
      path: ROUTE_PATHS.USERS,
      element: <ProtectedRoute component={<UsersPage />} />,
    },
    {
      path: ROUTE_PATHS.CHAT,
      element: <ProtectedRoute component={<ChatPage />} />,
    },
  ]);

  return <RouterProvider router={router} />;
};
