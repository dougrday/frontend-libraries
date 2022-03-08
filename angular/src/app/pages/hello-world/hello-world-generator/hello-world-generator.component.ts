import { AfterContentInit, Component, ElementRef } from "@angular/core";
import "@material/mwc-icon-button";
import "@material/mwc-snackbar";
import type { Snackbar } from "@material/mwc-snackbar";
import { forkJoin } from "rxjs";
import { helloWorldService } from "shared";
import { Config, starWars, uniqueNamesGenerator } from "unique-names-generator";

const config: Config = {
    dictionaries: [starWars],
};

@Component({
    selector: "app-hello-world-generator",
    templateUrl: "./hello-world-generator.component.html",
    styleUrls: ["./hello-world-generator.component.css"],
})
export class HelloWorldGeneratorComponent implements AfterContentInit {
    itemsGeneratedSnackbar: Snackbar | null;
    itemGenerationFailureSnackbar: Snackbar | null;

    constructor(private elementRef: ElementRef<HTMLElement>) {}

    generateNames() {
        const observables = [];
        for (let i = 0; i < 10; i++) {
            const name: string = uniqueNamesGenerator(config);
            observables.push(helloWorldService.createHelloWorld({ sayHelloCommandMessage: { name } }));
        }

        // If all succeed, show a success snackbar.
        // If any fail, show a failure snackbar.
        forkJoin(observables).subscribe({
            next: () => this.itemsGeneratedSnackbar?.show(),
            error: () => this.itemGenerationFailureSnackbar?.show(),
        });
    }

    handleClick() {
        this.generateNames();
    }

    ngAfterContentInit(): void {
        this.itemsGeneratedSnackbar = this.elementRef?.nativeElement?.querySelector(
            "mwc-snackbar[success]",
        ) as Snackbar | null;
        this.itemGenerationFailureSnackbar = this.elementRef?.nativeElement?.querySelector(
            "mwc-snackbar[failure]",
        ) as Snackbar | null;
    }
}
