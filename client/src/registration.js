import { Component } from "react";
import { axios } from "axios";

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
        this.state = {};
    }

    handleChange(evt) {
        console.log("handle change is running!");
        console.log("event object: ", evt);
        console.log("evt.target.value: ", evt.target.value);
        console.log("evt.target.name: ", evt.target.name);
        //take the user input and store it in state
        // it has to be a Object with four coresponding properties:
        // first, last, email, password
        // two things are needed: 1.what is the user typing (evt.target.value) and 2.which input field is user typing in (evt.target.name)
        this.setState({
            // evt.target.name needs to be the property
            // square brackets syntax is needed to inform that the property is a js. value!
            [evt.target.name]: evt.target.value,
        });
        () => console.log;
    }

    handleClick() {
        // 1. send off user input to server using axios! POST /registration
        // 2. in react axios needs to be imported
        // 3. process the response:
        // - error: render an error message:
        // (1) put something in state that indicates that there is an error. like error: true;
        // (2) render the error message only if there is an error - we are going to use the conditional rendering option here
        // - success: redirect user to / using /: location.replace('/');
    }

    render() {
        return (
            <div>
                {this.state.error && <p>Error :( </p>}
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
                    type="text"
                    required
                />
                <button onClick={() => this.handleClick()}>Submit</button>
            </div>
        );
    }
}
