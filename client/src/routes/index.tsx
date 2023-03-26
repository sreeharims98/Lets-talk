import AuthPage from "../pages/AuthPage/AuthPage";
import ChatPage from "../pages/ChatPage/ChatPage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import UsersPage from "../pages/UsersPage/UsersPage";
import { ROUTE_PATHS } from "../data/constants";
import { HomeContainer } from "../pages/HomeContainer/HomeContainer";

export const Routes = () => {
  const router = createBrowserRouter([
    {
      path: ROUTE_PATHS.AUTH,
      element: <AuthPage />,
      errorElement: <ErrorPage />,
    },
    {
      path: ROUTE_PATHS.HOME,
      element: <ProtectedRoute component={<HomeContainer />} />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: ROUTE_PATHS.USERS,
          element: <ProtectedRoute component={<UsersPage />} />,
        },
        {
          path: ROUTE_PATHS.CHAT,
          element: <ProtectedRoute component={<ChatPage />} />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
