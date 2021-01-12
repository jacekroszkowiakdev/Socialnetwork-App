// client/src/profilepic.js

export default function ProfilePic(props) {
    console.log("ProfilePic props: ", props);
    // console.log("ProfilePic this.state: ", this.state);
    // destructuring is also possible!!! { first, last } -> then in the <h1>ProfilePic {first} {last} </h1>
    return (
        <div>
            {this.state.profilePic && (
                <img
                    className="profilePic"
                    onClick={() => props.toggleUploader()}
                    src={props.profilePic}
                    alt={props.first}
                />
            )}
            {!this.state.profilePic && (
                <img
                    className="profilePic"
                    onClick={() => props.toggleUploader()}
                    src="./default_pic.png"
                    alt={props.first}
                />
            )}
        </div>
    );
}
