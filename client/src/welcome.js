// client/src/welcome.js

import { HashRouter, Route } from "react-router-dom";
import Registration from "./registration";
import Login from "./login";
import Reset from "./reset";

export default function Welcome() {
    return (
        <div id="welcome">
            <h1 className="intro">привет!</h1>
            <div className="logo">
                <img
                    src="/komrades.png"
                    alt="social network logo"
                    className="logo"
                />
            </div>
            <h4 className="agitation">
                Komrade! Join us in the collective effort to build real social
                distancing! The future of the people is online.
            </h4>
            <HashRouter>
                <Route exact path="/" component={Registration} />
                <Route path="/api/login" component={Login} />
                <Route path="/reset" component={Reset} />
            </HashRouter>
        </div>
    );
}
