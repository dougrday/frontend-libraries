<script type="ts">
    import HelloWorldForm from "./HelloWorldForm.svelte";
    import HelloWorldGeneratorButton from "./HelloWorldGeneratorButton.svelte";
    import HelloWorldList from "./HelloWorldList.svelte";
    import Layout from "../Layout.svelte";
    import { helloWorldService } from "shared";

    helloWorldService.searchHelloWorlds().subscribe();
    let totalMessages$ = helloWorldService.totalMessages$;
</script>

<Layout>
    <div slot="title">Hello, world!</div>
    <div slot="actionItems">
        <HelloWorldGeneratorButton />
    </div>
    <div class="container">
        <div class="grid">
            <div>
                <h2>Say Hello</h2>
                <div class="mdc-card padded">
                    <HelloWorldForm />
                </div>
            </div>
            {#if $totalMessages$ > 0}
                <div>
                    <h2>Who's Said Hello ({$totalMessages$})</h2>
                    <div class="mdc-card list">
                        <HelloWorldList />
                    </div>
                </div>
            {/if}
        </div>
    </div>
</Layout>

<style>
    .container {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .grid {
        align-items: flex-start;
        display: grid;
        grid-template-columns: 250px 1fr;
        grid-gap: 16px;
        margin: 16px;
    }

    .mdc-card.list {
        max-width: 400px;
        min-width: 250px;
        width: max-content;
    }

    .padded {
        padding: 16px;
    }

    @media (max-width: 600px) {
        .grid {
            grid-template-columns: 1fr;
        }
    }
</style>
