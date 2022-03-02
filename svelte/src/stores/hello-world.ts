import { writable } from "svelte/store";
import { HelloWorldSearchQueryResponseMessagePagination } from "../generated/hello-world";
import { HelloWorld } from "../generated/hello-world/models/HelloWorld";

export const messages = writable<HelloWorld[]>([]);
export const pagination = writable<HelloWorldSearchQueryResponseMessagePagination>(null);
