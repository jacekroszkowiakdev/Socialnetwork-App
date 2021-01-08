// client/src/reset.js
import { Component } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Reset extends Component {
    constructor() {
        super();
        this.state = {
            first: null,
            last: null,
            email: null,
            password: null,
            error: false,
            step: 1,
        };
    }

    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value,
        });
    }

    resetPassword() {
        console.log("resetPassword fired", this.state);
        axios
            .post("/password/reset/start", this.state)
            .then((res) => {
                this.setState({
                    error: false,
                    step: 2,
                });
            })
            .catch((err) => {
                console.log("POST /password/reset/start error: ", err);
                this.setState({ error: true });
            });
    }

    updatePassword() {
        console.log("resetPassword fired", this.state);
        axios
            .post("/password/reset/verify", this.state)
            .then((res) => {
                this.setState({
                    error: false,
                    step: 3,
                });
            })
            .catch((err) => {
                console.log("POST //password/reset/verify error: ", err);
                this.setState({ error: true });
            });
    }
    render() {
        return (
            <div>
                <h1>Reset Password</h1>
                {this.state.error && (
                    <p>`Something went wrong :( please try again `</p>
                )}

                {this.state.step === 1 && (
                    <div>
                        <input
                            onChange={(evt) => this.handleChange(evt)}
                            type="text"
                            name="email"
                            placeholder="Email"
                        />
                        <button onClick={() => this.resetPassword()}>
                            Reset
                        </button>
                        <p>Not a registered user? Create an account</p>
                        <Link to="/">Register!</Link>
                    </div>
                )}

                {this.state.step === 2 && (
                    <div>
                        <input
                            onChange={(evt) => this.handleChange(evt)}
                            type="text"
                            name="email"
                            placeholder="Email"
                        />
                        <input
                            onChange={(evt) => this.handleChange(evt)}
                            type="password"
                            name="password"
                            placeholder="New password"
                        />
                        <button onClick={() => this.updatePassword()}>
                            Update Password
                        </button>
                    </div>
                )}

                {this.state.step == 3 && (
                    <div>
                        <h4>
                            Password changed, you can now log in with your new
                            password:
                        </h4>
                        <Link to="/login">Click here to Log in!</Link>
                    </div>
                )}
            </div>
        );
    }
}
