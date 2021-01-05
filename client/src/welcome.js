// client/src/welcome.js

import { HashRouter, Route } from "react-router-dom";
import React from "react";
import Registration from "./registration";
import Login from "./login";

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
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                </div>
            </HashRouter>
        </div>
    );
}
