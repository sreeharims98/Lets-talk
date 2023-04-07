import AuthPage from "../pages/AuthPage/AuthPage";
import { ROUTE_PATHS } from "../data/constants";
import { HomeContainer } from "../pages/HomeContainer/HomeContainer";
import { BrowserRouter, Switch, Route } from "react-router-dom";
export const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={ROUTE_PATHS.AUTH}>
          <AuthPage />
        </Route>
        <Route path={ROUTE_PATHS.HOME}>
          <HomeContainer />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
