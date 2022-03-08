import { AfterContentInit, Component, ElementRef, OnDestroy, ViewChild } from "@angular/core";
import "@material/mwc-drawer";
import { Drawer } from "@material/mwc-drawer";
import "@material/mwc-icon";
import "@material/mwc-icon-button";
import "@material/mwc-list";
import "@material/mwc-top-app-bar-fixed";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"],
})
export class AppComponent implements AfterContentInit, OnDestroy {
    private drawer: Drawer | null;

    constructor(private elementRef: ElementRef<HTMLElement>) {}

    handleNavigationClick() {
        if (this.drawer) {
            this.drawer.open = !this.drawer.open;
        }
    }

    ngAfterContentInit(): void {
        this.drawer = this.elementRef.nativeElement.querySelector<Drawer>("mwc-drawer");
        this.elementRef.nativeElement.addEventListener("MDCTopAppBar:nav", () => this.handleNavigationClick());
    }

    ngOnDestroy(): void {
        this.elementRef.nativeElement.removeEventListener("MDCTopAppBar:nav", () => this.handleNavigationClick());
    }
}
