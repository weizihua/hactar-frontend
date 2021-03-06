import React from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import {Routes} from "../constants/routes";
import {LoginContainer} from "../containers/Login/LoginContainer";
import {RegisterContainer} from "../containers/Register/RegisterContainer";
import {DashboardContainer} from "../containers/Dashboard/DashboardContainer";
import {AuthenticatedRoute} from "./AuthenticatedRoute";
import ReactGA from "react-ga";

if (process.env.NODE_ENV !== "development") {
    ReactGA.initialize("UA-111993876-2");
    ReactGA.pageview(window.location.pathname + window.location.search);
}

const App: React.FC = () => {
    return (
        <Router>
            <Switch>
                <Route path={Routes.LOGIN_ROUTE} component={LoginContainer} />
                <Route path={Routes.REGISTER_ROUTE} component={RegisterContainer} />
                <AuthenticatedRoute path={Routes.DASHBOARD_ROUTE} component={DashboardContainer} />
                <Redirect from="/" to={Routes.LOGIN_ROUTE} />
            </Switch>
        </Router>
    );
};

export default App;
