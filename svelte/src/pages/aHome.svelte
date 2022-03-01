<script type="ts">
    import Layout from "./1Layout.svelte";
</script>

<Layout>
    <div slot="title">Home</div>
    <div slot="actionItems">
        <mwc-icon-button icon="file_download" />
        <mwc-icon-button icon="print" />
        <mwc-icon-button icon="favorite" />
    </div>
    Foo
</Layout>
