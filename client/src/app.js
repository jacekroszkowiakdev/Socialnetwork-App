// client/src/app.js
import { Component } from "react";
import ProfilePic from "./profilePic";
import Uploader from "./uploader";
import Profile from "./profile";
import axios from "./axios";
// import { BrowserRouter }

export default class App extends Component {
    constructor(props) {
        super(props);
        // hardcoded for demo purposes:
        this.state = {
            first: "Jacek",
            last: "Roszko",
            uploaderIsVisible: false,
        };
    }
    componentDidMount() {
        //componentDidMount = Vue's "mounted" function
        console.log("App component mounted!");
        // use axios to make a request to the server
        // the server will have to retrieve information about the user
        // the info we nee is basically everything except the password)
        // once we get a response from axios, store that data in the state of App
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
        // if (!this.state.uploaderIsVisible) {
        //     this.setState({
        //         uploaderIsVisible: true,
        //     });
        // } else {
        //     this.setState({
        //         uploaderIsVisible: false,
        //     });
        // }
        // NEW CONCISE WAY :
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible,
        });
    }

    setImage() {
        // any child component of App can call this function and it will update the state of App, regadles what child is called from (pass it as a prop!)
        this.setState({
            ProfilePic: "whatever the new pic is",
        });
    }

    render() {
        console.log("props in Uploader: ", this.props);
        console.log("this.state.first: ", this.state.first);
        console.log("this.state.last: ", this.state.last);
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
                    />
                    <h2 onClick={() => this.toggleUploader()}></h2>
                    {this.state.uploaderIsVisible && (
                        <Uploader setImage={this.setImage} />
                    )}

                    <Profile />
                </div>
            </BrowserRouter>
        );
    }
}
