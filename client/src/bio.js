import { Component } from "react";

export default class Bio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textareaVisible: false,
            bio: null,
        };
        this.toggleTextarea = this.toggleTextarea.bind(this);
    }

    toggleTextarea() {
        this.setState({
            bio: this.state.bio,
            textareaVisible: !this.state.textareaVisible,
        });
    }

    updateBio() {
        this.props.bioUpdater(this.state.bio);
        this.toggleTextarea();
    }

    handleChange(evt) {
        this.setState({
            bio: evt.target.value,
        });
    }

    // add states and conditional rendering:

    render() {
        return (
            <>
                <h1>BIO EDITOR</h1>
                {this.state.textareaVisible && <textarea />}
                <button onClick={this.toggleTextarea}>Click Me!</button>
            </>
        );
    }
}
