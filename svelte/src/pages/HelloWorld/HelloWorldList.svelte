<script type="ts">
    import "@material/mwc-icon";
    import "@material/mwc-list/mwc-list.js";
    import "@material/mwc-list/mwc-list-item.js";
    import { helloWorldApi } from "../../api";
    import { messages, pagination } from "../../stores/hello-world";

    helloWorldApi.searchHelloWorlds({ page: 0, pageSize: 100 }).subscribe((response) => {
        messages.set(response.results);
        pagination.set(response.pagination);
    });

    function handleClickDelete(helloWorldId: string) {
        helloWorldApi.deleteHelloWorld({ helloWorldId }).subscribe((response) => {
            messages.update((m) => {
                const index = m.findIndex((m) => m.id === helloWorldId);
                m.splice(index, 1);
                return m;
            });
        });
    }
</script>

<mwc-list rootTabbable>
    {#each $messages as message, messageIndex}
        {#if messageIndex > 0}
            <li divider role="separator" />
        {/if}
        <mwc-list-item tabindex="0" hasMeta>
            <span>Hello, {message.name}!</span>
            <mwc-icon on:click|once={() => handleClickDelete(message.id)} slot="meta">delete</mwc-icon>
        </mwc-list-item>
    {/each}
</mwc-list>

<style>
    mwc-list-item mwc-icon {
        visibility: hidden;
    }
    mwc-list-item:hover mwc-icon {
        visibility: visible;
    }
    mwc-icon:hover {
        color: var(--mdc-theme-primary, #0055cc);
    }
</style>
