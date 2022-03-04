import { useTitle } from "../../utils/hooks";
import "./HelloWorld.css";
import HelloWorldForm from "./HelloWorldForm";
import HelloWorldList from "./HelloWorldList";

function HelloWorld() {
    useTitle(<span>Hello, world!</span>);

    return (
        <div className="container">
            <div className="grid">
                <div>
                    <h2>Say Hello</h2>
                    <div className="mdc-card padded">
                        <HelloWorldForm />
                    </div>
                </div>
                <div>
                    <h2>Who's Said Hello</h2>
                    <div className="mdc-card list">
                        <HelloWorldList />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HelloWorld;
