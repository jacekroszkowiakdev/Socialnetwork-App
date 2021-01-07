import { Component } from "react";

export default class bioEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textareaVisible: false,
        };
    }
    toggleTextArea() {
        this.setState({
            textareaVisible: !this.state.textareaVisible,
        });
    }
    // You will call a method within this component, making a post request to your server, updating the value of the bio
    // Once succesful, you will call method passed down from the App component, updating the value of "bio" in state in App
    render() {
        return (
            <>
                <h1>Bio Editor</h1>
                {this.state.textareaVisible && <textarea />}
                <button onClick={() => this.toggleTextArea}>Edit</button>
            </>
        );
    }
}

// use onChange event handler to get bio text from textarea
