import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ROUTE_PATHS } from "../data/constants";
import { RootState } from "../store";

type Props = {
  component: JSX.Element;
};

const ProtectedRoute = (props: Props) => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <React.Fragment>
      {user ? props.component : <Navigate to={ROUTE_PATHS.HOME} />}
    </React.Fragment>
  );
};
export default ProtectedRoute;
