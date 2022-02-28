<script lang="ts">
  import "@material/mwc-drawer";
  import "@material/mwc-icon-button";
  import "@material/mwc-top-app-bar-fixed";
</script>

<main>
  <mwc-drawer id="main-drawer" hasHeader type="modal">
    <span slot="title">Hello World!</span>
    <div>
      <p>Drawer content!</p>
      <mwc-icon-button icon="gesture" />
      <mwc-icon-button icon="gavel" />
    </div>
    <div slot="appContent">
      <mwc-top-app-bar-fixed dense>
        <mwc-icon-button icon="menu" slot="navigationIcon" />
        <div slot="title">Messages</div>
        <mwc-icon-button icon="file_download" slot="actionItems" />
        <mwc-icon-button icon="print" slot="actionItems" />
        <mwc-icon-button icon="favorite" slot="actionItems" />
        <div>Foo</div>
      </mwc-top-app-bar-fixed>
    </div>
  </mwc-drawer>
  <script>
    const drawer = document.getElementById("main-drawer");
    if (drawer) {
      const container = drawer.parentNode;
      container.addEventListener("MDCTopAppBar:nav", () => {
        drawer.open = !drawer.open;
      });
    }
  </script>
</main>

<style>	
</style>
