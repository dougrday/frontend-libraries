import { Component, HostBinding } from "@angular/core";

@Component({
    selector: "app-home-title",
    template: `
        <mwc-icon-button icon="file_download"></mwc-icon-button>
        <mwc-icon-button icon="print"></mwc-icon-button>
        <mwc-icon-button icon="favorite"></mwc-icon-button>
    `,
})
export class HomeActionItemsComponent {
    @HostBinding("attr.slot") slot = "actionItems";
}
