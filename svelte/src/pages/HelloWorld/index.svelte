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
        <HelloWorldForm />
        <HelloWorldList />
    </div>
</Layout>
<style>
    .container {
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 16px;
        justify-items: center;
        margin: 16px;
    }
</style>
