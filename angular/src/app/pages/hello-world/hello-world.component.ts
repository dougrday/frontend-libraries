import { Component, OnInit } from "@angular/core";
import { from, Observable, Subject } from "rxjs";
import { helloWorldService } from "shared";

@Component({
    selector: "app-hello-world",
    templateUrl: "./hello-world.component.html",
    styleUrls: ["./hello-world.component.css"],
})
export class HelloWorldComponent implements OnInit {
    totalMessages$ = new Subject<number>();

    ngOnInit(): void {
        helloWorldService.searchHelloWorlds().subscribe();
        // NOTE: This is a hack to work despite the version difference (v6 vs v7)
        // of RxJS.
        helloWorldService.totalMessages$.subscribe(this.totalMessages$);
    }
}
