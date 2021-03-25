//client/src/profile.js

import ProfilePic from "./profilepic";
import Bio from "./bio";

export default function Profile(props) {
    return (
        <div className="profile-container">
            {props.largerPic && (
                <ProfilePic
                    className="largerProfilePic"
                    profile_pic={props.profile_pic}
                    alt={props.first}
                />
            )}
            <Bio bio={props.bio} bioUpdater={props.bioUpdater} />
        </div>
    );
}
