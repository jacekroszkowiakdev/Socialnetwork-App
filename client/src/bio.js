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
            .post("/api/profile/bio-update", this.state)
            .then(({ data }) => {
                this.props.bioUpdater(data);
                console.log("bio / updateBio: ", data);
                this.toggleTextarea();
            })
            .catch((err) => {
                console.log("axios.post /api/profile/bio-update error, ", err);
            });
    }

    handleChange(evt) {
        this.setState({
            bio: evt.target.value,
        });
    }

    render() {
        return (
            <div>
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
                        {!this.props.bio ? "Add Bio" : "Edit Bio"}
                    </button>
                )}
            </div>
        );
    }
}
