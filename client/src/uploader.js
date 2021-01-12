// client/stc/uploader.js
import { Component } from "react";
import axios from "./axios";

export default class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profilePic: {},
        };
    }
    /*
    Uploader's jobs:
    1. store the image the user selected in its own state
    2. send the file to the server
    3. let App know that there's a new profile picture, and that App needs to update its own state
    */
    handleClick() {
        console.log("this.props in Uploader.js: ", this.props);
        //setImage is called in Uploader but runs in App!
        // this means it is updating the sate of App even through it's not called in App!
        const formData = new FormData();
        axios
            .post("/profile/pic-upload", formData)
            .then((res) => {
                this.props.updateProfilePicture(res.data.profilePic);
            })
            .catch((err) => {
                console.log("axios.post profile-pic upload error: ", err);
            });
    }

    render() {
        console.log("this.props in Uploader: ", this.props);
        return (
            <div className="upload_overlay">
                <div className="upload_modal">
                    <h1 onClick={() => this.handleClick()}>Upload</h1>
                </div>
            </div>
        );
    }
}
