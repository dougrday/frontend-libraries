import { useTitle } from "../utils/hooks";
import "./HelloWorld.css";
import HelloWorldForm from "./HelloWorldForm";
import HelloWorldList from "./HelloWorldList";

function HelloWorld() {
    useTitle(<span>Hello, world!</span>);

    return (
        <div className="container">
            <div className="mdc-card">
                <HelloWorldForm />
            </div>
            <div className="mdc-card">
                <HelloWorldList />
            </div>
        </div>
    );
}

export default HelloWorld;
