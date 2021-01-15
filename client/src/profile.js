//client/src/profile.js

import ProfilePic from "./profilePic";
import Bio from "./bio";

export default function Profile(props) {
    return (
        <div className="profile-container">
            {props.largerPic && (
                <ProfilePic
                    className="largerProfilePic"
                    profile_pic={props.profile_pic}
                    // src={props.profile_pic}
                    alt={props.first}
                />
            )}

            <h4>
                {props.first} {props.last}
            </h4>
            <h1>User profile</h1>
            <Bio bio={props.bio} bioUpdater={props.bioUpdater} />
        </div>
    );
}
