// client/src/otherProfile.js

import { Component } from "react";
import axios from "./axios";
import ProfilePic from "./profilePic";

// export default class OtherProfile from

// When OtherProfile mounts, it needs to make a request to retrieve the relevant profile information. This means it must know the id of the user whose profile it is to display. This id will come from the url. If you set the path of the Route that renders OtherProfile to a value such as '/user/:id', your component will automatically receive a prop named match that contains information about how React Router interpreted the url. The match object will have a property named params, an object that has properties for each segment of the path you marked with a colon. Thus you will be able to access the id you need to put into your ajax request as this.props.match.params.id.

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
        console.log("other profile component did mount!");
        console.log("props in other profile!!!", this.props.id);
        axios
            .get(`/api/other-user/${this.props.match.params.id}`)
            .then(({ data }) => {
                if (data.loggedIn) {
                    this.props.history.push("/");
                } else {
                    console.log("Other profile data: ", data);
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
        console.log("OP props: ", this.props);
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
            </div>
        );
    }
}
