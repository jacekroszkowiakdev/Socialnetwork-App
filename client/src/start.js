import ReactDOM from "react-dom";
import Welcome from "./welcome";

// this tells React to read the url, and based on what's there
// render the appropriate view
let element;
if (location.pathname === "/welcome") {
    element = <Welcome />;
} else {
    element = <p>home page!!</p>;
}

// ReactDOM is the function that does render the React
ReactDOM.render(element, document.querySelector("main"));

/*
Welcome (parent)
    - Registration (child)
*/
