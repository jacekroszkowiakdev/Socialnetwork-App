// client/src/profilepic.js

export default function ProfilePic(props) {
    console.log("ProfilePic props: ", props);
    // destructuring is also possible!!! { first, last } -> then in the <h1>ProfilePic {first} {last} </h1>
    return (
        <div>
            {props.profilePic && (
                <img
                    className="profilePic"
                    onClick={() => props.toggleUploader()}
                    src={props.profilePic}
                    alt={props.first}
                />
            )}
            {!props.profilePic && (
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
