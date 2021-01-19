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
