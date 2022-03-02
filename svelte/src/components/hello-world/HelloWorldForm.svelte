<script type="ts">
    import "@material/mwc-button";
    import "@material/mwc-textfield";
    import type { TextField } from "@material/mwc-textfield";
    import { onDestroy, onMount, tick } from "svelte";
    import { helloWorldApi } from "../../api";

    let isValid = false;
    let form: HTMLFormElement;
    let name: TextField;

    function checkValidity(): boolean {
        return form.checkValidity() && name.checkValidity();
    }

    function clearForm(): void {
        name.value = "";
        name.focus();
    }

    function getFormData(): any {
        const formData = new FormData(form);
        const data = {};
        for (let [key, value] of formData) {
            data[key] = value;
        }
        return data;
    }

    function handleFormDataChanged(event: Event) {
        isValid = checkValidity();
    }

    function handleKeyup(event: KeyboardEvent) {
        if (event.code === "Enter") {
            event.preventDefault();
            handleSubmit(event);
        }
    }

    function handleNameInvalid(event: InputEvent) {
        name.validationMessage = "";
        if (name.validity.valueMissing) {
            name.validationMessage = "Name is required";
        } else if (name.validity.tooShort) {
            name.validationMessage = `Name must be at least ${name.getAttribute("minlength")} characters long`;
        } else if (name.validity.customError) {
            name.validationMessage = "Names starting with 'D' must be 'Doug'";
        }
    }

    function handleSubmit(event: Event) {
        event.preventDefault();
        (event.target as HTMLElement).blur();

        if (!checkValidity()) {
            return;
        }

        // If succcessful, send data to server
        const data = getFormData();
        helloWorldApi.createHelloWorld({ sayHelloCommandMessage: data }).subscribe(() => clearForm());
    }

    onMount(async () => {
        form.addEventListener("change", handleFormDataChanged);
        name.addEventListener("keyup", handleKeyup);
        name.addEventListener("invalid", handleNameInvalid);
        name.validityTransform = (newValue, nativeValidity) => {
            if (newValue.startsWith("D") && newValue !== "Doug") {
                return {
                    ...nativeValidity,
                    customError: true,
                    valid: false,
                };
            }
            return nativeValidity;
        };

        await tick();
        name.focus();
    });
    onDestroy(() => {
        form.removeEventListener("change", handleFormDataChanged);
        name.removeEventListener("keyup", handleKeyup);
        name.removeEventListener("invalid", handleNameInvalid);
    });
</script>

<form class="formgrid" bind:this={form} on:submit={handleSubmit}>
    <mwc-textfield bind:this={name} label="Hello, " minLength="2" name="name" placeholder="Name" required />
    <mwc-button disabled={!isValid} raised on:click={handleSubmit}>Submit</mwc-button>
</form>

<style>
    .formgrid {
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 16px;
        justify-items: center;
        margin: 16px;
    }
</style>
