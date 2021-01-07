// client/src/profilepic.js

export default function ProfilePic(props) {
    console.log("props in ProfilePic: ", props);
    // destructuring is also possible!!! { first, last } -> then in the <h1>ProfilePic {first} {last} </h1>
    return (
        <div>
            <h1>
                ProfilePic: {props.first} {props.last}
            </h1>
        </div>
    );
}
