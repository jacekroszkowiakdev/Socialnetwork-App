// client/src/welcome.js

import { HashRouter, Route, Switch } from "react-router-dom";
import React from "react";
import Registration from "./registration";
import Login from "./login";
import Reset from "./reset";

export default function Welcome() {
    return (
        <div id="welcome">
            <h1>Welcome!</h1>
            <img
                src="/client/src/so_social.JPG"
                alt="social network logo"
                className="logo"
            />
            <HashRouter>
                <Switch>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                    <Route path="/reset" component={Reset} />
                </Switch>
            </HashRouter>
        </div>
    );
}
