// client/src/app.js
import { Component } from "react";
import ProfilePic from "./profilePic";
import Uploader from "./uploader";
import Profile from "./profile";
import Reset from "./reset";
import axios from "./axios";
import { BrowserRouter, Route } from "react-router-dom";

export default class App extends Component {
    constructor(props) {
        super(props);
        // hardcoded for demo purposes:
        this.state = {
            first: null,
            last: null,
            email: null,
            created_at: null,
            profilePic: null,
            uploaderIsVisible: false,
        };
    }

    componentDidMount() {
        console.log("App component mounted!");
        // use axios to make a request to the server to retrieve information about the user, then store that data in the state of App:
        axios
            .get("/user/profile")
            .then(({ data }) => {
                this.setState({
                    first: data[0].first,
                    last: data[0].last,
                    email: data[0].email,
                    created_at: data[0].created_at,
                    profilePic: data[0].profile_pic, // add to DB, check
                });
            })
            .catch((err) => {
                console.log(
                    "axios.get /user/profile - error getting user data: ",
                    err
                );
                this.setState({ error: true });
            });
    }

    logout() {
        axios
            .get("/logout")
            .then((res) => {
                console.log("user logged out");
                location.replace("/welcome");
            })
            .catch((err) => {
                console.log("GET /logout error", err);
            });
    }

    toggleUploader() {
        console.log("toggle uploader fired!");
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible,
        });
    }

    updateProfilePicture(newProfilePic) {
        // any child component of App can call this function and it will update the state of App, regardless what child is called from (pass it as a prop!):
        this.setState({
            ProfilePic: "whatever the new pic is",
        });
    }

    render() {
        console.log("props in Uploader: ", this.props);
        console.log("this.state.first: ", this.state.first);
        console.log("this.state.last: ", this.state.last);
        return (
            <div>
                <h1>App component</h1>
                <button className="logout" onClick={() => this.logout()}>
                    Logout
                </button>

                <ProfilePic first={this.state.first} last={this.state.last} />
                <h2 onClick={() => this.toggleUploader()}></h2>
                {this.state.uploaderIsVisible && (
                    <Uploader setImage={this.setImage} />
                )}
                <Profile />
            </div>
        );
    }
}
