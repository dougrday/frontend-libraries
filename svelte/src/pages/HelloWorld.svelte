<script type="ts">
    import "@material/mwc-button";
    import type { Button } from "@material/mwc-button";
    import "@material/mwc-textfield";
    import type { TextField } from "@material/mwc-textfield";
    import { onDestroy,onMount } from "svelte";
    import Layout from "./Layout.svelte";

    let form: HTMLFormElement;
    let name: TextField;
    let submit: Button;

    function checkValidity(): boolean {
        return form.checkValidity() && name.checkValidity();
    }

    function clearForm(): void {
        // If successful, clear form
        form.querySelectorAll("mwc-textfield").forEach((field: TextField) => {
            field.value = "";
        });
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
        const isValid = checkValidity();
        if (isValid && submit.hasAttribute("disabled")) {
            submit.removeAttribute("disabled");
        } else if (!isValid && !submit.hasAttribute("disabled")) {
            submit.setAttribute("disabled", "");
        }
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

        const data = getFormData();
        console.log(data);

        // If succcessful, send data to server
        clearForm();
    }

    onMount(() => {
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
        submit.addEventListener("click", handleSubmit);
    });
    onDestroy(() => {
        form.removeEventListener("change", handleFormDataChanged);
        name.removeEventListener("keyup", handleKeyup);
        name.removeEventListener("invalid", handleNameInvalid);
        submit.removeEventListener("click", handleSubmit);
    });
</script>

<Layout>
    <div slot="title">Hello, world!</div>
    <div slot="actionItems">
        <mwc-icon-button icon="favorite" />
    </div>
    <form class="formgrid" bind:this={form} on:submit={handleSubmit}>
        <mwc-textfield bind:this={name} label="Hello, " minLength="2" name="name" placeholder="Name" required />
        <mwc-button disabled bind:this={submit} raised>Submit</mwc-button>
    </form>
</Layout>

<style>
    .formgrid {
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 16px;
        justify-items: center;
        margin: 16px;
    }
</style>
