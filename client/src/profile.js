//client/src/profile.js

import ProfilePic from "./profilePic";
import Bio from "./bio";

export default function Profile(props) {
    return (
        <div className="profile-container">
            <h1>User profile</h1>

            <ProfilePic
                className="largerProfilePic"
                profile_pic={props.profile_pic}
                src={props.profile_pic}
                alt={props.first}
            />
            <h3>
                Hello my name is {props.first} {props.last}
            </h3>
            <Bio bio={props.bio} updateBio={props.updateBio} />
        </div>
    );
}
