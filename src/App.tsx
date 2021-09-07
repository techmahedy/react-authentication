import React, { lazy, Suspense, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch ,useHistory } from "react-router-dom";
import Preloader from "./components/Preloader/preloader.components";
import PrivateRoute from "./customRoutes/private.route";

const LoginCardComponent = lazy(() => import("./modules/auth/components/LoginCard.component"));
const RegisterCardComponent = lazy(() => import("./modules/auth/components/RegisterCard.component"));
const HomePage = lazy(() => import("./modules/auth/pages/HomePage"));
const ProductListPage = lazy(() => import("./modules/product/ProductListPage"));

const App = () => {
  
  const loginStateData = useSelector((state: any) => state.loginState);

  return (
    <Suspense fallback={<Preloader />}>
      <Router>
        <Switch>
          <Route exact={true} path="/login" component={LoginCardComponent} />
          <Route exact={true} path="/register" component={RegisterCardComponent} />
          <PrivateRoute exact={true} path="/" Component={HomePage}/>
          <PrivateRoute exact={true} path="/products" Component={ProductListPage}/>
        </Switch>
      </Router>
    </Suspense>
  );
};

export default App;

