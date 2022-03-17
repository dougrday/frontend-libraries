import { Component, OnInit } from "@angular/core";
import "@material/mwc-icon";
import "@material/mwc-list/mwc-list";
import "@material/mwc-list/mwc-list-item";
import { interval } from "rxjs";
import { switchMap } from "rxjs/operators";
import { helloWorldService } from "shared";

@Component({
    selector: "app-hello-world-list",
    templateUrl: "./hello-world-list.component.html",
    styleUrls: ["./hello-world-list.component.css"],
})
export class HelloWorldListComponent implements OnInit {
    get messages() {
        return helloWorldService.messages;
    }

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

    // FIXME: remove
    // This demonstrates someone doing some bad
    // behavior, and the service caching values properly
    ngOnInit(): void {
        interval(1000)
            .pipe(switchMap(() => helloWorldService.searchHelloWorlds() as any))
            .subscribe();
    }
}
