// client/src/friendButton.js

import { useState, useEffect } from "react";
import axios from "./axios";

export default function FriendButton({ otherUserId }) {
    const [button, setButton] = useState();

    useEffect(() => {
        axios.get(`api/friendship-status/${otherUserId}`).then(({ data }) => {
            console.log("/friendship-status/${otherUserId} json data: ", data);
            setButton(data);
        });
    }, [otherUserId]);
}
