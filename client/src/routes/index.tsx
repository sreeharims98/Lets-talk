import AuthPage from "../pages/AuthPage/AuthPage";
import ChatPage from "../pages/ChatPage/ChatPage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import ProtectedRoute from "./ProtectedRoute";
import UsersPage from "../pages/UsersPage/UsersPage";
import { ROUTE_PATHS } from "../data/constants";
import { HomeContainer } from "../pages/HomeContainer/HomeContainer";
import { BrowserRouter, Routes as Routs, Route } from "react-router-dom";
export const Routes = () => {
  return (
    <BrowserRouter>
      <Routs>
        <Route path={ROUTE_PATHS.AUTH} element={<AuthPage />} />
        <Route path={ROUTE_PATHS.HOME} element={<ProtectedRoute component={<HomeContainer />} />}>
          <Route path={ROUTE_PATHS.USERS} element={<ProtectedRoute component={<UsersPage />} />} />
          <Route path={ROUTE_PATHS.CHAT} element={<ProtectedRoute component={<ChatPage />} />} />
        </Route>
      </Routs>
    </BrowserRouter>
  );
};
