// client/src/app.js
import { Component } from "react";
import OtherProfile from "./otherProfile";
import ProfilePic from "./profilePic";
import Uploader from "./uploader";
import Profile from "./profile";
import FindPeople from "./findPeople";
import axios from "./axios";
import { BrowserRouter, Route, Switch } from "react-router-dom";

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
        //  this makes sure that the context is kept when passing the toggleUploader method down the another component:
        // this.toggleUploader = this.toggleUploader.bind(this);
        // this.updateProfilePicture = this.updateProfilePicture.bind(this);
        // this.bioUpdater = this.bioUpdater.bind(this);
    }

    componentDidMount() {
        // use axios to make a request to the server to retrieve information about the user, then store that data in the state of App:
        axios
            .get("/api/profile")
            .then(({ data }) => {
                this.setState({
                    // first: data[0].first,
                    // last: data[0].last,
                    // email: data[0].email,
                    // created_at: data[0].created_at,
                    // profile_pic: data[0].profile_pic,
                    // bio: data[0].bio,
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

    bioUpdater(draftBio) {
        console.log("APP bio in bioUpdater: ", draftBio);
        this.setState({
            bio: draftBio,
        });
    }

    render() {
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
                    <p className="userName">{this.state.first}</p>
                    <p>{this.state.bio}</p>
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
                                    toggleUploader={() => this.toggleUploader}
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
                    <Route exact path="/users" render={() => <FindPeople />} />
                </div>
            </BrowserRouter>
        );
    }
}
