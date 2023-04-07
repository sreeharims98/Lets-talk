import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { ROUTE_PATHS } from "../data/constants";
import { RootState } from "../store";

type Props = {
  component: JSX.Element;
};

const ProtectedRoute = (props: Props) => {
  const { user } = useSelector((state: RootState) => state.auth);

  return <React.Fragment>{user ? props.component : <Redirect to={ROUTE_PATHS.AUTH} />}</React.Fragment>;
};
export default ProtectedRoute;
