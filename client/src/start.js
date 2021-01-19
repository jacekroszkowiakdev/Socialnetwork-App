import ReactDOM from "react-dom";
import Welcome from "./welcome";
import App from "./app";
import { init } from "./socket";
// import Redux stuff:
// import { createStore, applyMiddleware } from "redux";
// import { Provider } from "react-redux";
// import reduxPromise from "redux-promise";
// import { reducer } from "./reducer";
// import { composeWithDevTools } from "redux-devtools-extension";

// const store = createStore(
//     reducer,
//     composeWithDevTools(applyMiddleware(reduxPromise))
// );

// this tells React to read the url, and based on what's there
// render the appropriate view
let element;

// if (location.pathname === "/welcome") {
//     element = <Welcome />;
// } else {
//     element = (
//         <Provider store={store}>
//             <App />
//         </Provider>
//     );
// }

if (location.pathname === "/welcome") {
    element = <Welcome />;
} else {
    // init(store); // connecting socket with Redux
    element = <App />;
}

// ReactDOM is the function that does render the React
ReactDOM.render(element, document.querySelector("main"));

/*
Welcome (parent)
    - Registration (child)
*/
