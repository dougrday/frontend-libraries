import { Component, ElementRef, OnInit } from "@angular/core";
import "@material/mwc-icon";
import "@material/mwc-list/mwc-list";
import "@material/mwc-list/mwc-list-item";
import { helloWorldService } from "shared";

@Component({
    selector: "app-hello-world-list",
    templateUrl: "./hello-world-list.component.html",
    styleUrls: ["./hello-world-list.component.css"],
})
export class HelloWorldListComponent {
    helloWorldService = helloWorldService;

    constructor(private elementRef: ElementRef) {}

    deleteMessage(helloWorldId: string) {
        return helloWorldService.deleteHelloWorld({ helloWorldId }).subscribe();
    }

    handleKeyUp(event: KeyboardEvent, helloWorldId: string) {
        if (event.code === "Delete") {
            event.preventDefault();
            this.deleteMessage(helloWorldId);
        }
    }

    handleLoadMoreClick() {
        helloWorldService.searchNext().subscribe();
    }
}
