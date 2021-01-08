//client/src/login.js
import { Component } from "react";
import { Link } from "react-router-dom";
import axios from "./axios";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null,
            error: false,
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
            .post("/login", this.state)
            .then((res) => {
                if (!res.data.success) {
                    console.log("error in axios");
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
                <button onClick={() => this.handleClick()}>Login</button>
                <p>Not a registered user? Create an account</p>
                <Link to="/">Register!</Link>
                <p>Forgot your password?</p>
                {/* <Link to="/reset">Reset password</Link> */}
            </div>
        );
    }
}
