import { useEffect, useState } from "react";
import { helloWorldService } from "shared/lib/public-api";
import { useObservable, useTitle } from "../../utils/hooks";
import "./HelloWorld.css";
import HelloWorldForm from "./HelloWorldForm";
import HelloWorldList from "./HelloWorldList";

function HelloWorld() {
    useTitle(<span>Hello, world!</span>);

    // Declare a new state variable, which we'll call "hasMessages"
    const hasMessages = useObservable(helloWorldService.hasMessages$, false);
    useEffect(() => {
        helloWorldService.searchHelloWorlds().subscribe();
    }, []);

    let whoSaidHello = null;
    if (hasMessages) {
        whoSaidHello = (
            <div>
                <h2>Who's Said Hello</h2>
                <div className="mdc-card list">
                    <HelloWorldList />
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="grid">
                <div>
                    <h2>Say Hello</h2>
                    <div className="mdc-card padded">
                        <HelloWorldForm />
                    </div>
                </div>
                {whoSaidHello}
            </div>
        </div>
    );
}

export default HelloWorld;
