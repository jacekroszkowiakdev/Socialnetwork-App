// client/src/app.js
import { Component } from "react";
import OtherProfile from "./otherProfile";
import ProfilePic from "./profilepic";
import Uploader from "./uploader";
import Profile from "./profile";
import FindPeople from "./findPeople";
import axios from "./axios";
import { Link, BrowserRouter, Route, Switch } from "react-router-dom";

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            id: null,
            first: null,
            last: null,
            email: null,
            created_at: null,
            profile_pic: null,
            bio: null,
            uploaderIsVisible: false,
            largerPic: null,
            error: false,
        };
    }

    componentDidMount() {
        axios
            .get("/api/profile")
            .then(({ data }) => {
                this.setState({
                    ...data[0],
                });
            })
            .catch((err) => {
                console.log(
                    "axios.get /api/profile - error getting user data: ",
                    err
                );
                this.setState({ error: true });
            });
    }

    logout() {
        axios
            .get("/api/logout")
            .then(() => {
                console.log("user logged out");
                location.replace("/welcome");
            })
            .catch((err) => {
                console.log("GET /api/logout error", err);
            });
    }

    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value,
        });
    }

    toggleUploader() {
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible,
        });
    }

    updateProfilePicture(newProfilePic) {
        this.setState({
            profile_pic: newProfilePic,
        });
    }

    bioUpdater(draftBio) {
        console.log("APP draftBio in bioUpdater: ", draftBio);
        this.setState({
            bio: draftBio,
        });
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <div className="top_bar">
                        <img
                            className="top_bar_logo"
                            src="/komrades.png"
                            alt="social network logo"
                        />
                        <h4 className="appMessage">
                            Komrade you are logged in with #id{this.state.id}
                        </h4>
                        <button
                            className="logout"
                            onClick={() => this.logout()}
                        >
                            Logout
                        </button>
                    </div>
                    <Link className="find_button" to="/users">
                        Find Komrades
                    </Link>
                    <div className="app_profile_wrapper">
                        <div className="app_profile_container">
                            <ProfilePic
                                first={this.state.first}
                                last={this.state.last}
                                profile_pic={this.state.profile_pic}
                                toggleUploader={() => this.toggleUploader()}
                            />
                            <h4 className="userName">
                                {this.state.first} {this.state.last}
                            </h4>
                            <p className="userBio">{this.state.bio}</p>
                            {this.state.uploaderIsVisible && (
                                <Uploader
                                    profile_pic={this.state.profile_pic}
                                    toggleUploader={() => this.toggleUploader}
                                    updateProfilePicture={(newProfilePic) =>
                                        this.updateProfilePicture(newProfilePic)
                                    }
                                />
                            )}
                            <Switch>
                                <Route
                                    exact
                                    path="/"
                                    render={() => (
                                        <Profile
                                            first={this.state.first}
                                            last={this.state.last}
                                            profile_pic={this.state.profile_pic}
                                            bio={this.state.bio}
                                            toggleUploader={() =>
                                                this.toggleUploader
                                            }
                                            bioUpdater={(draftBio) =>
                                                this.bioUpdater(draftBio)
                                            }
                                        />
                                    )}
                                />
                                <Route
                                    path="/user/:id"
                                    render={(props) => (
                                        <OtherProfile
                                            match={props.match}
                                            history={props.history}
                                            key={props.match.url}
                                        />
                                    )}
                                />
                            </Switch>
                            <Route
                                exact
                                path="/users"
                                render={() => <FindPeople />}
                            />
                        </div>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}
