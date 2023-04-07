import { useSelector } from "react-redux";
import Alert from "../../components/Alert/Alert";
import Spinner from "../../components/Spinner/Spinner";
import { ROUTE_PATHS } from "../../data/constants";
import { RootState } from "../../store";
import { Redirect, Switch, Route } from "react-router-dom";
import ProtectedRoute from "../../routes/ProtectedRoute";
import UsersPage from "../UsersPage/UsersPage";
import ChatPage from "../ChatPage/ChatPage";

export const HomeContainer = () => {
  const { user, loading } = useSelector((state: RootState) => state.auth);
  const { error } = useSelector((state: RootState) => state.common);

  if (loading) return <Spinner isFull={false} />;
  else if (error) return <Alert msg={error} type="error" />;
  else if (!user) return <Redirect to={ROUTE_PATHS.AUTH} />;
  return (
    <div>
      <Switch>
        <Route exact path={ROUTE_PATHS.USERS}>
          <ProtectedRoute component={<UsersPage />} />
        </Route>
        <Route exact path={ROUTE_PATHS.CHAT}>
          <ProtectedRoute component={<ChatPage />} />
        </Route>
      </Switch>
    </div>
  );
};
