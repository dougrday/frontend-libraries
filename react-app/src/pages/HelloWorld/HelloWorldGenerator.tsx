import type { Button } from "@material/mwc-button";
import "@material/mwc-icon-button";
import "@material/mwc-snackbar";
import type { Snackbar } from "@material/mwc-snackbar";
import { useEffect, useRef } from "react";
import { forkJoin } from "rxjs";
import { helloWorldService } from "shared";
import { Config, starWars, uniqueNamesGenerator } from "unique-names-generator";
import "./HelloWorldGenerator.css";

const config: Config = {
    dictionaries: [starWars],
};

function HelloWorldGenerator() {
    const buttonRef = useRef<Button>(null);
    const successRef = useRef<Snackbar>(null);
    const failureRef = useRef<Snackbar>(null);

    useEffect(() => {
        const button = buttonRef.current;

        function generateNames() {
            const observables = [];
            for (let i = 0; i < 10; i++) {
                const name: string = uniqueNamesGenerator(config);
                observables.push(helloWorldService.createHelloWorld({ sayHelloCommandMessage: { name } }));
            }

            // If all succeed, show a success snackbar.
            // If any fail, show a failure snackbar.
            forkJoin(observables).subscribe({
                next: () => successRef.current?.show(),
                error: () => failureRef.current?.show(),
            });
        }

        function handleClick() {
            generateNames();
        }

        button?.addEventListener("click", handleClick);

        return () => {
            button?.removeEventListener("click", handleClick);
        };
    });

    return (
        <span>
            <mwc-snackbar ref={successRef} labelText="10 names were generated!">
                <mwc-icon-button icon="close" slot="dismiss" />
            </mwc-snackbar>
            <mwc-snackbar ref={failureRef} labelText="Something went wrong!">
                <mwc-icon-button icon="close" slot="dismiss" />
            </mwc-snackbar>
            <mwc-icon-button ref={buttonRef} icon="add" aria-label="Generate Names" />
        </span>
    );
}

export default HelloWorldGenerator;
