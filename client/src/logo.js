import ReactDOM from "react-dom";
import Logo from "./welcome";

// this tells React to read the url, and based on what's there
// render the appropriate view
let elem;
if (location.pathname === "/welcome") {
    elem = <Welcome />;
} else {
    elem = <p>home page!!</p>;
}

// ReactDOM is the function that does render the React
ReactDOM.render(<Welcome />, document.querySelector("main"));
