<script type="ts">
    import HelloWorldForm from "./HelloWorldForm.svelte";
    import HelloWorldList from "./HelloWorldList.svelte";
    import Layout from "../Layout.svelte";
</script>

<Layout>
    <div slot="title">Hello, world!</div>
    <div slot="actionItems">
        <mwc-icon-button icon="favorite" />
    </div>
    <div class="container">
        <div class="mdc-card">
            <HelloWorldForm />
        </div>
        <div class="mdc-card">
            <HelloWorldList />
        </div>
    </div>
</Layout>

<style>
    .container {
        align-items: flex-start;
        display: grid;
        grid-template-columns: 250px 1fr;
        grid-gap: 16px;
        margin: 16px;
    }

    .mdc-card {
        padding: 16px;
    }
</style>
