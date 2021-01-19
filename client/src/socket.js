//client/src/socket.js

import io from "socket.io-client";

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();
    }
    socket.on("someEvent", (payload) => {
        // do someting
    });

    socket.on("someEvent", (payload) => {
        // do someting
    });

    socket.on("someEvent", (payload) => {
        // do someting
    });
};
