import "@material/mwc-button";
import type { Button } from "@material/mwc-button";
import "@material/mwc-icon";
import "@material/mwc-list/mwc-list.js";
import "@material/mwc-list/mwc-list-item.js";
import { useEffect, useRef, useState } from "react";
import { HelloWorld, helloWorldService } from "shared";
import "./HelloWorldList.css";

function HelloWorldList() {
    const [messages, setMessages] = useState<HelloWorld[]>([]);

    const loadMoreRef = useRef<Button>(null);

    const messages$ = helloWorldService.messages$;
    useEffect(() => {
        const loadMoreButton = loadMoreRef.current;
        if (loadMoreButton) {
            loadMoreButton.addEventListener("click", handleLoadMoreClick);
        }

        const subscription = messages$.subscribe((value) => setMessages(value));
        return () => {
            subscription.unsubscribe();
            loadMoreButton?.removeEventListener("click", handleLoadMoreClick);
        };
    }, []);

    const handleLoadMoreClick = () => {
        helloWorldService.searchNext().subscribe();
    };

    return (
        <div className="items">
            <mwc-list rootTabbable>
                {messages.map((message) => (
                    <mwc-list-item tabindex="0" hasMeta>
                        <span>Hello, {message.name}!</span>
                        <mwc-icon slot="meta">delete</mwc-icon>
                    </mwc-list-item>
                ))}
            </mwc-list>
            <mwc-button fullwidth ref={loadMoreRef}>
                Load more
            </mwc-button>
        </div>
    );
}

export default HelloWorldList;
