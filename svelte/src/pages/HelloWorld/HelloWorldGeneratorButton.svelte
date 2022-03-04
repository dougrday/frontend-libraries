<script type="ts">
    import "@material/mwc-icon-button";
    import "@material/mwc-snackbar";
    import type { Snackbar } from "@material/mwc-snackbar";
    import { uniqueNamesGenerator, Config, starWars } from "unique-names-generator";
    import { helloWorldService } from "shared";
    import { forkJoin } from "rxjs";

    const config: Config = {
        dictionaries: [starWars],
    };

    let itemsGeneratedSnackbar: Snackbar;
    let itemGenerationFailureSnackbar: Snackbar;

    function generateNames() {
        const observables = [];
        for (let i = 0; i < 10; i++) {
            const name: string = uniqueNamesGenerator(config);
            observables.push(helloWorldService.createHelloWorld({ sayHelloCommandMessage: { name } }));
        }

        // If all succeed, show a success snackbar.
        // If any fail, show a failure snackbar.
        forkJoin(observables).subscribe({
            next: () => itemsGeneratedSnackbar.show(),
            error: () => itemGenerationFailureSnackbar.show(),
        });
    }

    function handleClick() {
        generateNames();
    }
</script>

<span>
    <mwc-snackbar bind:this={itemsGeneratedSnackbar} labelText="10 names were generated!">
        <mwc-icon-button icon="close" slot="dismiss" />
    </mwc-snackbar>
    <mwc-snackbar bind:this={itemGenerationFailureSnackbar} labelText="Something went wrong!">
        <mwc-icon-button icon="close" slot="dismiss" />
    </mwc-snackbar>
    <mwc-icon-button icon="add" on:click={handleClick} aria-label="Generate Names" />
</span>

<style>
    mwc-icon-button:hover {
        cursor: pointer;
    }
</style>
