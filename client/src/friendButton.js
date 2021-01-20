// client/src/friendButton.js

import { useState, useEffect } from "react";
import axios from "./axios";

export default function FriendButton({ otherUserId }) {
    const [buttonAction, setButtonAction] = useState("");
    const [error, setError] = useState(false);

    const BUTTON_TXT = {
        BEFRIEND: "Send Request",
        UNFRIEND: "Unfriend",
        ACCEPT: "Accept Request",
        CANCEL: "Cancel Request",
    };

    useEffect(() => {
        axios
            .get(`/api/friendship-status/${otherUserId}`)
            .then(({ data }) => {
                if (data.pendingRequest) {
                    if (data.otherUserRequest) {
                        console.log("request received from other user", data);
                        setButtonAction(BUTTON_TXT.ACCEPT);
                    } else {
                        console("request sent by the user", data);
                        setButtonAction(BUTTON_TXT.CANCEL);
                    }
                } else if (data.friends) {
                    console.log("users are friends!", data);
                    setButtonAction(BUTTON_TXT.UNFRIEND);
                } else {
                    console.log("no friendship, yet", data);
                    setButtonAction(BUTTON_TXT.BEFRIEND);
                }
            })
            .catch((err) => {
                console.error(
                    `axios.get(/friendship-status/${otherUserId}) error: `,
                    err
                );
                setError(true);
            });
    }, []);

    function handleClick() {
        axios
            .post("/api/friendship-action", {
                action: buttonAction,
                otherUserId: otherUserId,
            })
            .then(({ data }) => {
                setButtonAction(data.changeButtonAction);
                console.log("handle click fired with action: ", data);
            })
            .catch((err) => {
                console.log(`axios.get(/friendship-action error: `, err);
                setError(true);
            });
    }

    return (
        <div>
            {error && <p>Something went wrong, try again!</p>}
            <button className="friendButton" onClick={handleClick}>
                {buttonAction}
            </button>
        </div>
    );
}
