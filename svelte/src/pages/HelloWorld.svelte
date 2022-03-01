<script type="ts">
    import Layout from "./Layout.svelte";
    import "@material/mwc-button";
    import type { Button } from "@material/mwc-button";
    import "@material/mwc-textfield";
    import type { TextField } from "@material/mwc-textfield";
    import { onMount, onDestroy } from "svelte";

    let form: HTMLFormElement;
    let name: TextField;
    let submit: Button;

    function handleSubmit(event: Event) {
        event.preventDefault();

        const formData = new FormData(form);
        const data = {};
        for (let [key, value] of formData) {
            data[key] = value;
        }
        console.log(data);
    }

    function handleKeyup(event: KeyboardEvent) {
        if (event.code === "Enter") {
            event.preventDefault();
            handleSubmit(event);
        }
    }

    onMount(() => {
        form.addEventListener("submit", handleSubmit);
        name.addEventListener("keyup", handleKeyup);
        submit.addEventListener("click", handleSubmit);
    });
    onDestroy(() => {
        form.removeEventListener("submit", handleSubmit);
        name.removeEventListener("keyup", handleKeyup);
        submit.removeEventListener("click", handleSubmit);
    });
</script>

<Layout>
    <div slot="title">Hello, world!</div>
    <div slot="actionItems">
        <mwc-icon-button icon="favorite" />
    </div>
    <form bind:this={form}>
        <div class="formgrid">
            <mwc-textfield bind:this={name} name="name" label="Hello, " placeholder="Name" required />
            <mwc-button bind:this={submit} raised type="submit">Submit</mwc-button>
        </div>
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
