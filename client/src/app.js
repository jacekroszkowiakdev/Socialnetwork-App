// client/src/app.js
import { Component } from "react";
import ProfilePic from "./profilepic";
import Uploader from "./uploader";
import Profile from "./profile";
import Reset from "./reset";
import axios from "./axios";
import { BrowserRouter, Route } from "react-router-dom";

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            first: null,
            last: null,
            email: null,
            created_at: null,
            profile_pic: null,
            uploaderIsVisible: false,
        };
    }

    componentDidMount() {
        console.log("App component mounted!");
        // use axios to make a request to the server to retrieve information about the user, then store that data in the state of App:
        axios
            .get("/profile")
            .then(({ data }) => {
                this.setState({
                    // first: data[0].first,
                    // last: data[0].last,
                    // email: data[0].email,
                    // created_at: data[0].created_at,
                    // profile_pic: data[0].profile_pic, // add to DB, check
                    ...data,
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
        /* if (!this.state.uploaderIsVisible) {
            this.setState({
                uploaderIsVisible: true,
            });
        } else {
            this.setState({
                uploaderIsVisible: false,
            });
        } */
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible,
        });
    }

    updateProfilePicture(newProfilePic) {
        // any child component of App can call this function and it will update the state of App, regardless what child is called from (pass it as a prop!):
        this.setState({
            profile_pic: newProfilePic,
        });
    }

    render() {
        console.log("props in App/Uploader: ", this.props);
        console.log("app get/profile data: ", this.data);
        console.log("app get/profile state: ", this.state);
        // console.log("this.state.first: ", this.state.first);
        // console.log("this.state.last: ", this.state.last);
        return (
            <BrowserRouter>
                <div>
                    <h1>App component</h1>
                    <button className="logout" onClick={() => this.logout()}>
                        Logout
                    </button>
                    <ProfilePic
                        first={this.state.first}
                        last={this.state.last}
                        profile_pic={this.state.profile_pic}
                        toggleUploader={() => this.toggleUploader()}
                    />
                    <h2 onClick={() => this.toggleUploader()}></h2>
                    {this.state.uploaderIsVisible && (
                        <Uploader
                            updateProfilePicture={(newProfilePic) =>
                                this.updateProfilePicture(newProfilePic)
                            }
                        />
                    )}
                </div>
            </BrowserRouter>
        );
    }
}
