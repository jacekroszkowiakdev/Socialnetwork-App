// client/stc/uploader.js
import { Component } from "react";

export default class Uploader extends Component {
    constructor() {
        super();
        this.state = {};
    }
    // uploaser has 3 purposes:
    // 1. store the image the user uploaded
    handleClick() {
        console.log("this.props in Uploader: ", this.props);
        //setImage is called in Uploader but runs in App!
        // this means it is updating the sate of App even through it's not called in App!
        this.props.setImage("HERE is argument passed in from App");
    }
    render() {
        return (
            <div>
                <h1>Uploader </h1>
            </div>
        );
    }
}
