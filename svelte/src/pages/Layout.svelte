<script lang="ts">
    import "@material/mwc-drawer";
    import "@material/mwc-list";
    import type { Drawer } from "@material/mwc-drawer";
    import "@material/mwc-icon";
    import "@material/mwc-icon-button";
    import "@material/mwc-top-app-bar-fixed";
    import { push } from "svelte-spa-router";

    import { onMount, onDestroy } from "svelte";

    let drawer: Drawer;
    const handleNavigationClick = () => {
        drawer.open = !drawer.open;
    };

    onMount(() => {
        addEventListener("MDCTopAppBar:nav", handleNavigationClick);
    });

    onDestroy(() => {
        removeEventListener("MDCTopAppBar:nav", handleNavigationClick);
    });
</script>

<mwc-drawer bind:this={drawer} hasHeader type="modal">
    <span slot="title">Hello World!</span>
    <mwc-list rootTabbable>
        <mwc-list-item tabindex="0" graphic="avatar" on:click={() => push("/")}>
            Home
            <mwc-icon slot="graphic">home</mwc-icon>
        </mwc-list-item>
        <li divider role="separator" />
        <mwc-list-item tabindex="0" graphic="avatar" on:click={() => push("/hello-world")}>
            Hello World!
            <mwc-icon slot="graphic">language</mwc-icon>
        </mwc-list-item>
    </mwc-list>

    <div slot="appContent">
        <mwc-top-app-bar-fixed dense>
            <slot name="title" slot="title" />
            <slot name="actionItems" slot="actionItems" />
            <mwc-icon-button icon="menu" slot="navigationIcon" />
            <slot />
        </mwc-top-app-bar-fixed>
    </div>
</mwc-drawer>

<style>
    mwc-drawer,
    div[slot="appContent"],
    mwc-top-app-bar-fixed {
        height: 100%;
        width: 100%;
    }
</style>
