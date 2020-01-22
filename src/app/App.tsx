import React from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";

import {Routes} from "../constants/routes";
import {LoginContainer} from "../containers/Login/LoginContainer";

const App: React.FC = () => {
    return (
        <Router>
            <Switch>
                <Route path={Routes.LOGIN_ROUTE} component={LoginContainer} />
                <Redirect from="/" to={Routes.LOGIN_ROUTE} />
            </Switch>
        </Router>
    );
};

export default App;
