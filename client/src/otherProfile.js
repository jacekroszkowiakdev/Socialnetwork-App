// client/src/otherProfile.js

import { Component } from "react";
import axios from "./axios";

// export default class OtherProfile from

// When OtherProfile mounts, it needs to make a request to retrieve the relevant profile information. This means it must know the id of the user whose profile it is to display. This id will come from the url. If you set the path of the Route that renders OtherProfile to a value such as '/user/:id', your component will automatically receive a prop named match that contains information about how React Router interpreted the url. The match object will have a property named params, an object that has properties for each segment of the path you marked with a colon. Thus you will be able to access the id you need to put into your ajax request as this.props.match.params.id.

export default class OtherProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    // With react-router-dom, we designate a dynamic portion of the URL to be matched by putting a colon (:) before it. Let's explore this by adding a modal that will display a user's information when we click on it:

    componentDidMount() {
        axios
            .get(`other-user/:${this.props.match.params.id}`, {
                params: { id: this.props.match.params.id },
            })
            .then(({ data }) => {
                console.log("OP component did mount data: ", data);
                this.setState({
                    ...data[0]
                });
            })
            .catch((err) => {
            console.log(`error in axios.get "other-user/": `, err)
    }

    render(){
return(
{/* <div>
<img src="{this.sate.profile_pic}"></img>
<p>{this.state.first}</p>
<p className="otherBio">{this.state.bio}</p>
</div> */}

)}

} // other profile end here
