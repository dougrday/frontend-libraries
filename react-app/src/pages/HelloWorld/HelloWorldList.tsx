import "@material/mwc-button";
import type { Button } from "@material/mwc-button";
import "@material/mwc-icon";
import "@material/mwc-list/mwc-list-item.js";
import "@material/mwc-list/mwc-list.js";
import { useEffect, useRef } from "react";
import { helloWorldService } from "shared";
import { useObservable } from "../../utils/hooks";
import "./HelloWorldList.css";

function HelloWorldList() {
    const messages = useObservable(helloWorldService.messages$, []);
    const loadMoreRef = useRef<Button>(null);

    const deleteMessage = (helloWorldId: string) => {
        return helloWorldService.deleteHelloWorld({ helloWorldId });
    };

    const handleLoadMoreClick = () => {
        helloWorldService.searchNext().subscribe();
    };

    const handleDeleteClick = (event: React.MouseEvent) => {
        const element = event.target as HTMLElement;
        if (element.localName === "mwc-icon") {
            const helloWorldId = element?.getAttribute("data-id");
            if (helloWorldId) {
                deleteMessage(helloWorldId).subscribe();
            }
        }
    };

    const handleKeyUp = (event: React.KeyboardEvent) => {
        const element = event.target as HTMLElement;
        if (element.localName === "mwc-list-item" && event.code === "Delete") {
            event.preventDefault();
            const helloWorldId = element?.getAttribute("data-id");
            if (helloWorldId) {
                const nextElement = element?.nextElementSibling as HTMLElement;
                deleteMessage(helloWorldId).subscribe(() => {
                    if (nextElement) {
                        nextElement.focus();
                    }
                });
            }
        }
    };

    useEffect(() => {
        const loadMoreButton = loadMoreRef.current;
        loadMoreButton?.addEventListener("click", handleLoadMoreClick);
        return () => {
            loadMoreButton?.removeEventListener("click", handleLoadMoreClick);
        };
    }, []);

    const messageListItems = messages.map((message) => (
        <mwc-list-item data-id={message?.id} key={message?.id} tabindex="0" hasMeta>
            <span>Hello, {message?.name}!</span>
            <mwc-icon data-id={message?.id} slot="meta">
                delete
            </mwc-icon>
        </mwc-list-item>
    ));

    return (
        <div className="items" onClick={handleDeleteClick} onKeyUp={handleKeyUp}>
            <mwc-list rootTabbable>{messageListItems}</mwc-list>
            <mwc-button fullwidth ref={loadMoreRef}>
                Load more
            </mwc-button>
        </div>
    );
}

export default HelloWorldList;
