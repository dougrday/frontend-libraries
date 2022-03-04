import HelloWorld from "./HelloWorld/index.svelte";
import Home from "./Home.svelte";

export const routes = {
    "/": Home,
    "/hello-world": HelloWorld,
    //   "*": NotFound,
};
