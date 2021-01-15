import { Component } from "react";
import axios from "./axios";

export default class Bio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textareaVisible: false,
            bio: null,
            largerPic: null,
        };

        console.log("props in bio component: ", props);
    }

    toggleTextarea() {
        //console.log("toggleTextarea fired!");
        this.setState({
            bio: this.props.bio,
            textareaVisible: !this.state.textareaVisible,
            largerPic: true,
        });
    }

    updateBio() {
        console.log("updateBio fired!");
        axios
            .post("/profile/bio-update", this.state)
            .then(({ data }) => {
                console.log("data from updating bio: ", data[0].bio);
                this.props.bioUpdater(data[0].bio);
                this.toggleTextarea();
            })
            .catch((err) => {
                console.log("axios.post /profile/bio-update error, ", err);
            });
    }

    handleChange(evt) {
        this.setState({
            bio: evt.target.value,
        });
    }

    // If the user's current bio text doesn't exist (it is an empty string or undefined or null, the BioEditor component should show an "Add Bio" button.

    // If the user has a bio saved, the BioEditor component should show that text, along with an "Edit Bio" button.

    render() {
        console.log("props in bio: ", this.props);
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
                        onClick={() => this.toggleTextarea()}
                    >
                        {!this.state.bio ? "Add Bio" : "Edit Bio"}
                    </button>
                )}
            </>
        );
    }
}
