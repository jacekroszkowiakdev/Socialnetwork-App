// client/src/profilepic.js

/*
    ProfilePic's jobs:
    1. render the profile pic
    2. if there is no profile pic, render a default image
    3. when the user clicks on the profile pic, toggle the Uploader component
*/

/*
    ProfilePic's props:
    1. profilePic
    2. toggleUploader
    3. (optional) the user's name, which can be set as the alt attribute of the img
*/

export default function ProfilePic({ props }) {
    console.log("props in ProfilePic: ", props);
    // destructuring is also possible!!! { first, last } -> then in the <h1>ProfilePic {first} {last} </h1>
    return (
        <div>
            {this.state.profilePic && (
                <img
                    className="profilePic"
                    onClick={() => this.props.toggleUploader()}
                    src={props.profilePic}
                    alt={props.first}
                />
            )}
            {!this.state.profilePic && (
                <img
                    className="profilePic"
                    onClick={() => this.props.toggleUploader()}
                    src={"./default_pic.png"}
                    alt={props.first}
                />
            )}
        </div>
    );
}
