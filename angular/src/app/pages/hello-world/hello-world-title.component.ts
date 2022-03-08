import { Component, HostBinding } from "@angular/core";

@Component({
    selector: "app-hello-world-title",
    template: `Hello, world!`,
})
export class HelloWorldTitleComponent {
    @HostBinding("attr.slot") slot = "title";
}
