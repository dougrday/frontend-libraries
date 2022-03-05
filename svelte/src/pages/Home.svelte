<script type="ts">
    import Layout from "./Layout.svelte";
</script>

<Layout>
    <div slot="title">Home(r)</div>
    <div slot="actionItems">
        <mwc-icon-button icon="file_download" />
        <mwc-icon-button icon="print" />
        <mwc-icon-button icon="favorite" />
    </div>

    <div class="centered">
        <img alt="Homer" src="/images/homer.jpg" />
        <a href="#/hello-world">Hello, World!</a>
    </div>
</Layout>

<style>
    .centered {
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-items: center;
    }
    img {
        width: 400px;
    }
</style>
