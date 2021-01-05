//client/src/login.js
import { Link } from "react-router-dom";
import { Component } from "react";
import axios from "./axios";

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: null,
            password: null,
            error: false,
        };
    }
    handleClick() {
        console.log("handle click fired", this.state);
        axios
            .post("/login", this.state)
            .then((res) => {
                if (!res.data.success) {
                    this.setState({ error: true });
                } else {
                    location.replace("/");
                }
            })
            .catch((err) => {
                console.log(`axios.post("/login") error: `, err);
                this.setState({ error: true });
            });
    }
    render() {
        return (
            <div>
                <h1>Login</h1>
                {this.state.error && (
                    <p>Something went wrong :( please try again</p>
                )}
                <input
                    onChange={(evt) => this.handleChange(evt)}
                    type="text"
                    name="email"
                    placeholder="Email"
                />
                <input
                    onChange={(evt) => this.handleChange(evt)}
                    type="password"
                    name="pw"
                    placeholder="Password"
                />
                <button onClick={() => this.handleClick()}>Login</button>
                <p>Not a registered user? Create an account</p>
                <Link to="/">Register!</Link>
                <p>Forgot your password?</p>
                <Link to="/reset-password">Reset password</Link>
            </div>
        );
    }
}
