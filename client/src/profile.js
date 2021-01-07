//client/src/profile.js

import ProfilePic from "./profilePic";

export default function Profile({ firstname, lastname }) {
    return (
        <div>
            <h1>User profile</h1>
            <h3>
                Hello my name is {firstname} {lastname}
            </h3>
            <ProfilePic />
        </div>
    );
}
