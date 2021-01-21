//client/src/api/login.js
import { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "./axios";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null,
            error: false,
            redirect: undefined,
        };
    }
    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value,
        });
    }
    handleClick() {
        console.log("handle click fired", this.state);
        axios
            .post("/api/login", this.state)
            .then(() => {
                location.replace("/");
            })
            .catch((err) => {
                console.log(`axios.post("/api/login") error: `, err);
                this.setState({ error: true });
            });
    }
    render() {
        if (this.state.redirect) return <Redirect to={this.state.redirect} />;

        return (
            <div className="login-container">
                <h3>Login</h3>
                {this.state.error && (
                    <p>Something went wrong please try again</p>
                )}
                <input
                    onChange={(evt) => this.handleChange(evt)}
                    name="email"
                    placeholder="email address"
                    type="text"
                    required
                />
                <input
                    onChange={(evt) => this.handleChange(evt)}
                    name="password"
                    placeholder="password"
                    type="password"
                    required
                />
                <button className="login" onClick={() => this.handleClick()}>
                    Login
                </button>
                <p>Forgot your password?</p>
                <Link className="reset" to="/reset">
                    Reset password
                </Link>
                <p>Not a registered user? Create an account</p>
                <Link className="register" to="/">
                    Register!
                </Link>
            </div>
        );
    }
}
