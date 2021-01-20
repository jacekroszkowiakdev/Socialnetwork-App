// client/src/welcome.js

import { HashRouter, Route } from "react-router-dom";
import Registration from "./registration";
import Login from "./login";
import Reset from "./reset";

export default function Welcome() {
    return (
        <div id="welcome">
            <h1>Welcome!</h1>
            <img
                src="/so_social.JPG"
                alt="social network logo"
                className="logo"
            />
            <HashRouter>
                <Route exact path="/" component={Registration} />
                <Route path="/api/login" component={Login} />
                <Route path="/reset" component={Reset} />
            </HashRouter>
        </div>
    );
}
