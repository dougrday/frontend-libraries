import { useEffect } from "react";
import { helloWorldService } from "shared/lib/public-api";
import { layoutService } from "../../services/LayoutService";
import { useObservable } from "../../utils/hooks";
import "./HelloWorld.css";
import HelloWorldForm from "./HelloWorldForm";
import HelloWorldGenerator from "./HelloWorldGenerator";
import HelloWorldList from "./HelloWorldList";

function HelloWorld() {
    layoutService.setTitle(<span>Hello, world!</span>);
    layoutService.setActionItems(
        <>
            <HelloWorldGenerator />
        </>,
    );

    const hasMessages = useObservable(helloWorldService.hasMessages$, false);
    const totalMessages = useObservable(helloWorldService.totalMessages$, 0);

    useEffect(() => {
        helloWorldService.searchHelloWorlds().subscribe();
    }, []);

    let whoSaidHello = null;
    if (hasMessages) {
        whoSaidHello = (
            <div>
                <h2>Who's Said Hello ({totalMessages})</h2>
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
