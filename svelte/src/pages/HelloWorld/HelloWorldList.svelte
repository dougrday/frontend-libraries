<script type="ts">
    import "@material/mwc-icon";
    import "@material/mwc-list/mwc-list.js";
    import "@material/mwc-list/mwc-list-item.js";
    import { helloWorldService } from "../../services/hello-world.service";

    function handleClickDelete(helloWorldId: string) {
        helloWorldService.deleteHelloWorld({ helloWorldId }).subscribe();
    }

    let messages = helloWorldService.messages;
</script>

<div class="items">
    <mwc-list rootTabbable>
        {#each $messages as message, messageIndex}
            {#if messageIndex > 0}
                <li divider role="separator" />
            {/if}
            <mwc-list-item tabindex="0" hasMeta>
                <span>Hello, {message.name}!</span>
                <mwc-icon on:click={() => handleClickDelete(message.id)} slot="meta">delete</mwc-icon>
            </mwc-list-item>
        {/each}
    </mwc-list>
    <mwc-button fullwidth on:click={() => helloWorldService.searchNext().subscribe()}>Load more</mwc-button>
</div>

<style>
    .items {
        align-items: stretch;
        display: flex;
        flex-direction: column;
    }

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
