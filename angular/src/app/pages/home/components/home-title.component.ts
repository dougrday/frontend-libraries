import { Attribute, Component, HostBinding } from "@angular/core";

@Component({
    selector: "app-home-title",
    template: `<div>Home(r)</div>`,
})
export class HomeTitleComponent {
    @HostBinding("attr.slot") slot = "title";
}
