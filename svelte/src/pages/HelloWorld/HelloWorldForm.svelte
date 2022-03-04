<script type="ts">
    import "@material/mwc-button";
    import "@material/mwc-textfield";
    import type { TextField } from "@material/mwc-textfield";
    import { onDestroy, onMount, tick } from "svelte";
    import { helloWorldService } from "shared";

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
        isValid = false;

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

        if (!checkValidity()) {
            return;
        }

        // If succcessful, send data to server
        const data = getFormData();
        helloWorldService.createHelloWorld({ sayHelloCommandMessage: data }).subscribe(() => {
            clearForm();
        });
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

<form bind:this={form} on:submit={handleSubmit}>
    <div class="spaced">
        <mwc-textfield
            bind:this={name}
            label="Hello, "
            minLength="2"
            name="name"
            placeholder="Name"
            required
            autoValidate
        />
    </div>
    <div class="right"><mwc-button disabled={!isValid} raised on:click={handleSubmit}>Submit</mwc-button></div>
</form>

<style>
    .spaced {
        margin-bottom: 16px;
    }

    .right {
        text-align: right;
    }
</style>
