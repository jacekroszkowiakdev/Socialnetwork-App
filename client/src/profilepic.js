// client/src/profilepic.js

export default function ProfilePic(props) {
    // destructuring is also possible!!! { first, last } -> then in the <h1>ProfilePic {first} {last} </h1>
    return (
        <div className="profilePic-container">
            {props.profile_pic && (
                <img
                    className="profilePic"
                    onClick={() => props.toggleUploader()}
                    src={props.profile_pic}
                    alt={props.first}
                />
            )}
            {!props.profile_pic && (
                <img
                    className="profilePic"
                    onClick={() => props.toggleUploader()}
                    src="/default_pic.png"
                    alt={props.first}
                />
            )}
        </div>
    );
}
