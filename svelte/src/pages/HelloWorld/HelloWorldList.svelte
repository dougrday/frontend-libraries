<script type="ts">
    import { helloWorldApi } from "../../api";
    import { messages, pagination } from "../../stores/hello-world";

    helloWorldApi
        .searchHelloWorlds({ page: 0, pageSize: 100 })
        .subscribe(response => {
            messages.update(() => response.results);
            pagination.update(() => response.pagination);
        });
</script>

<main>    
    {#each $messages as message}
        <div>Hello, {message.name}!</div>
    {/each}
</main>

<style>
</style>
