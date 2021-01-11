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
        console.log("this.props in Uploader: ", this.props);
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
            <div>
                <h1 onClick={() => this.handleClick()}>Upload</h1>
            </div>
        );
    }
}

var formData = new FormData();
formData.append("userId", this.title);
formData.append("profile-pic", this.profilePic);
console.log("formData", FormData); // to loop through this special object use for each loop

//    // 2. Post the formData to the "/uploads" route with axios
//    axios.post("/upload", formData).then(function (res) {
//        console.log(`POST "/upload" completed: `, res);
//        self.images.unshift(res.data);
//    });
