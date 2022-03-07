import "@material/mwc-button";
import type { Button } from "@material/mwc-button";
import "@material/mwc-icon";
import "@material/mwc-list/mwc-list-item.js";
import type { ListItem } from "@material/mwc-list/mwc-list-item.js";
import "@material/mwc-list/mwc-list.js";
import { useEffect, useRef } from "react";
import { helloWorldService } from "shared";
import { useObservable } from "../../utils/hooks";
import "./HelloWorldList.css";

function HelloWorldList() {
    const messages = useObservable(helloWorldService.messages$, []);
    const loadMoreRef = useRef<Button>(null);
    const itemRefs = useRef(new Map<string, ListItem>());

    const deleteMessage = (helloWorldId: string) => {
        return helloWorldService.deleteHelloWorld({ helloWorldId });
    };

    const handleLoadMoreClick = () => {
        helloWorldService.searchNext().subscribe();
    };

    useEffect(() => {
        const loadMoreButton = loadMoreRef.current;
        loadMoreButton?.addEventListener("click", handleLoadMoreClick);
        return () => {
            loadMoreButton?.removeEventListener("click", handleLoadMoreClick);
        };
    }, []);

    useEffect(() => {
        const handleDeleteClick = (helloWorldId: string) => (event: Event) => {
            deleteMessage(helloWorldId).subscribe();
        };

        const handleKeyUp = (helloWorldId: string) => (event: KeyboardEvent) => {
            if (event.code === "Delete") {
                event.preventDefault();
                deleteMessage(helloWorldId).subscribe();
            }
        };

        const listItemMap = itemRefs.current;
        listItemMap.forEach((listItem, messageId) => {
            listItem.addEventListener("keyup", handleKeyUp(messageId));
            listItem.querySelector("mwc-icon")?.addEventListener("click", handleDeleteClick(messageId));
        });
        return () => {
            listItemMap.forEach((listItem, messageId) => {
                listItem.removeEventListener("keyup", handleKeyUp(messageId));
                listItem.querySelector("mwc-icon")?.removeEventListener("click", handleDeleteClick(messageId));
            });
        };
    }, [messages]);

    return (
        <div className="items">
            <mwc-list rootTabbable>
                {messages.map((message) => (
                    <mwc-list-item
                        key={message.id}
                        ref={(element: ListItem) => itemRefs.current.set(message.id, element)}
                        tabindex="0"
                        hasMeta
                    >
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
