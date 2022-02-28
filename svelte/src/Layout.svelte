<script lang="ts">
  import "@material/mwc-drawer";
  import type { Drawer } from "@material/mwc-drawer";
  import "@material/mwc-icon";
  import "@material/mwc-icon-button";
  import "@material/mwc-top-app-bar-fixed";

  import { onMount, onDestroy } from "svelte";

  let drawer: Drawer = null;
  const handleNavigationClick = () => {
    drawer.open = !drawer.open;
  };

  onMount(async () => {
    drawer = document.getElementsByTagName("mwc-drawer")[0];
    drawer.parentNode.addEventListener(
      "MDCTopAppBar:nav",
      handleNavigationClick
    );
  });

  onDestroy(() => {
    drawer.parentNode.removeEventListener(
      "MDCTopAppBar:nav",
      handleNavigationClick
    );
  });
</script>

<main>
  <mwc-drawer hasHeader type="modal">
    <span slot="title">Hello World!</span>
    <div>
      <ul>
        <li>
          <a href="#/"><mwc-icon>home</mwc-icon> Home</a>
        </li>
        <li>
          <a href="#/hello-world"><mwc-icon>language</mwc-icon> Hello World!</a>
        </li>
      </ul>
    </div>
    <div slot="appContent">
      <mwc-top-app-bar-fixed dense>
        <slot name="title" slot="title" />
        <slot name="actionItems" slot="actionItems" />
        <mwc-icon-button icon="menu" slot="navigationIcon" />
        <slot />
      </mwc-top-app-bar-fixed>
    </div>
  </mwc-drawer>
</main>

<style>
</style>
