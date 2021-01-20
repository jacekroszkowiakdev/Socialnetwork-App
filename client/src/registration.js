import { Component } from "react";
import { Link } from "react-router-dom";
import axios from "./axios";

//1. render 4 input fields, button, and the error message if there is one
//2. change handler the store user's input in state as they type
//3. click handler to send user input to server
//4. handle response from server:
// - error: if we receive an error from server, render error message for the user
// - success: redirect the user to "/" route

// optional: the error message you render can be as specific or generic as you like
// generic is better for security reasons but for coding excercise - specific is the way to go!
// specific error messages are often coding challenges on job interviews!!! It is called "form validation"

export default class Registration extends Component {
    constructor() {
        super();
        this.state = {
            first: null,
            last: null,
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
            .post("/api/register", this.state)
            .then(() => {
                location.replace("/");
            })
            .catch((err) => {
                console.log("POST /api/register error", err);
                this.setState({ error: true });
            });
    }
    render() {
        return (
            <div>
                {this.state.error && (
                    <p>`Something went wrong :( please try again `</p>
                )}
                <div className="registration-container">
                    <h1>Registration</h1>
                    <input
                        onChange={(evt) => this.handleChange(evt)}
                        name="first"
                        placeholder="first name"
                        type="text"
                        required
                    />
                    <input
                        onChange={(evt) => this.handleChange(evt)}
                        name="last"
                        placeholder="last name"
                        type="text"
                        required
                    />
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
                    <button onClick={() => this.handleClick()}>Submit</button>
                    <p>I have an account</p>
                    <Link to="/api/login">Click here to Log in!</Link>
                </div>
            </div>
        );
    }
}
