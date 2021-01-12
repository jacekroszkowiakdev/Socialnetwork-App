// client/stc/uploader.js
import { Component } from "react";
import axios from "./axios";

export default class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile_pic: null,
            error: false,
        };
    }
    /*
    Uploader's jobs:
    1. store the image the user selected in its own state
    2. send the file to the server
    3. let App know that there's a new profile picture, and that App needs to update its own state
    */
    uploadProfilePic() {
        console.log("this.props in Uploader: ", this.props);
        //updateProfilePicture is called in Uploader but runs in App!
        // this means it is updating the sate of App even through it's not called in App!
        const formData = new FormData();
        formData.append("profile_pic", this.state.profile_pic);
        axios
            .post("/profile/pic-upload", formData)
            .then((res) => {
                this.props.updateProfilePicture(res.data.profilePic);
                this.props.toggleUploader();
            })
            .catch((err) => {
                console.log("axios.post profile-pic upload error: ", err);
            });
    }

    handleChange(evt) {
        this.setState({
            profile_pic: evt.target.files[0],
        });
    }

    render() {
        console.log("this.props in Uploader: ", this.props);
        return (
            <div className="upload_overlay">
                <div className="upload_box">
                    <h3>Change your profile picture</h3>
                    <form
                        name="upload"
                        method="POST"
                        action="/profile/pic-upload"
                        autoComplete="off"
                    >
                        <div className="uploaded-image">
                            <input
                                type="file"
                                name="image"
                                id="image"
                                accept="image/*"
                                className="profile_pic"
                                onChange={(evt) => this.handleChange(evt)}
                            />
                            <label htmlFor="image" id="upload">
                                {this.state.image}
                            </label>
                        </div>
                    </form>
                </div>
                <div className="upload_modal">
                    <button onClick={() => this.uploadProfilePic()}>
                        Upload
                    </button>
                </div>
            </div>
        );
    }
}
