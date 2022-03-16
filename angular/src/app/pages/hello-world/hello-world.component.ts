import { Component, OnInit } from "@angular/core";
import { helloWorldService } from "shared";

@Component({
    selector: "app-hello-world",
    templateUrl: "./hello-world.component.html",
    styleUrls: ["./hello-world.component.css"],
})
export class HelloWorldComponent implements OnInit {
    helloWorldService = helloWorldService;

    ngOnInit(): void {
        helloWorldService.searchHelloWorlds().subscribe();
    }
}
