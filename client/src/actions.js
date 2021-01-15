// this will contain all of our action creators
// action creator is just a function that returns an object

export function fn() {
    // we could talk to the server here if we want to (axios)
    return {
        type: "UPDATE_STATE_SOMEHOW",
        data: 12,
    };
}
