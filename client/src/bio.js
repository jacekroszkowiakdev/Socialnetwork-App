import { Component } from "react";

export default class Bio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textareaVisible: false,
            bio: null,
            largerPic: null,
        };
    }

    toggleTextarea() {
        console.log("toggleTextarea fired!");
        this.setState({
            bio: this.state.bio,
            textareaVisible: !this.state.textareaVisible,
            largerPic: true,
        });
    }

    updateBio() {
        console.log("updateBio fired!");
        this.props.bioUpdater(this.state.bio);
        this.toggleTextarea();
    }

    handleChange(evt) {
        this.setState({
            bio: evt.target.value,
        });
    }

    // If the user's current bio text doesn't exist (it is an empty string or undefined or null, the BioEditor component should show an "Add Bio" button.

    // If the user has a bio saved, the BioEditor component should show that text, along with an "Edit Bio" button.

    render() {
        return (
            <>
                {this.state.textareaVisible && (
                    <div className="textareaBio">
                        <label>
                            Add few words about yourself...
                            <textarea
                                id="bio"
                                name="bio"
                                rows="10"
                                cols="50"
                                defaultValue={this.props.bio}
                                onChange={(evt) => this.handleChange(evt)}
                            ></textarea>
                        </label>
                        <button
                            id="button-bio"
                            className="button-bio"
                            onClick={() => this.updateBio()}
                        >
                            Save
                        </button>
                    </div>
                )}
                {!this.state.textareaVisible && (
                    <button
                        id="button-bio"
                        className="button-bio"
                        onClick={() => this.toggleTextarea}
                    >
                        {!this.state.bio ? "Add Bio" : "Edit Bio"}
                    </button>
                )}
            </>
        );
    }
}
