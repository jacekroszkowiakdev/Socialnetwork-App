// client/src/otherProfile.js

import { Component } from "react";
import axios from "./axios";
import ProfilePic from "./profilePic";
import FriendButton from "./friendButton";

export default class OtherProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            first: null,
            last: null,
            bio: null,
            profilePic: null,
            loggedIn: null,
        };
    }

    componentDidMount() {
        axios
            .get(`/api/other-user/${this.props.match.params.id}`)
            .then(({ data }) => {
                if (data.loggedIn) {
                    this.props.history.push("/");
                } else {
                    this.setState({ ...data[0] });
                }
            })
            .catch((err) => {
                console.log(
                    "axios.get /api/other-user - error getting user id form params: ",
                    err
                );
                this.setState({ error: true });
            });
    }

    render() {
        console.log("FriendButton props: ", this.props.match.params.id);
        return (
            <div className="other-profile-container">
                <ProfilePic
                    first={this.state.first}
                    last={this.state.last}
                    profile_pic={this.state.profile_pic}
                />
                <h3 className="otherName">
                    {this.state.first} {this.state.last}
                </h3>
                <p className="otherBio">{this.state.bio}</p>
                <FriendButton otherUserId={this.props.match.params.id} />
            </div>
        );
    }
}
