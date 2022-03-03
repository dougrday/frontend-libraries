<script type="ts">
    import "@material/mwc-list/mwc-list.js";
    import "@material/mwc-list/mwc-list-item.js";
    import { helloWorldApi } from "../../api";
    import { messages, pagination } from "../../stores/hello-world";

    helloWorldApi.searchHelloWorlds({ page: 0, pageSize: 100 }).subscribe((response) => {
        messages.set(response.results);
        pagination.set(response.pagination);
    });
</script>

<mwc-list>
    {#each $messages as message, messageIndex}
        {#if messageIndex > 0}
            <li divider role="separator" />
        {/if}
        <mwc-list-item tabindex="0">
            Hello, {message.name}!
        </mwc-list-item>
    {/each}
</mwc-list>

<style>
</style>
