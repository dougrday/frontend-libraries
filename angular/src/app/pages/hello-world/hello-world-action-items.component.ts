import { Component, HostBinding } from "@angular/core";

@Component({
    selector: "app-hello-world-title",
    template: `<app-hello-world-generator></app-hello-world-generator>`,
})
export class HelloWorldActionItemsComponent {
    @HostBinding("attr.slot") slot = "actionItems";
}
