export default function reducer(state, action) {
    // we will deal with the actions here:
    return (state = {
        // ALWAYS MAKE COPY of the state with ...state (spread operator)
        // ...state,
        // chatMessages: action, chatMessages,
        // data: 12,
    });

    // const obj = {
    //     first: "Pete",
    // };

    // const newObj = {
    //     ...obj,
    //     last: "Anderson",
    // };

    // const arr = [1, 2, 3];
    // const newArr = [...arr];

    // there are some useful array methods that don't mutate the original:
    // FILTER
    // MAP
}
