import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Alert from "../../components/Alert/Alert";
import Spinner from "../../components/Spinner/Spinner";
import { ROUTE_PATHS } from "../../data/constants";
import { RootState } from "../../store";

export const HomeContainer = () => {
  const { user, loading } = useSelector((state: RootState) => state.auth);
  const { error } = useSelector((state: RootState) => state.common);

  if (loading) return <Spinner isFull={false} />;
  else if (error) return <Alert msg={error} type="error" />;
  else if (!user) return <Navigate to={ROUTE_PATHS.AUTH} />;
  return (
    <div>
      <Outlet />
    </div>
  );
};
