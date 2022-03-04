import { helloWorldApi } from "../api";
import { CreateHelloWorldRequest, DeleteHelloWorldRequest, SearchHelloWorldsRequest } from "../generated/hello-world";
import { writable } from "svelte/store";
import { HelloWorldSearchQueryResponseMessagePagination } from "../generated/hello-world";
import { HelloWorld } from "../generated/hello-world/models/HelloWorld";
import { shareReplay, tap } from "rxjs/operators";

class HelloWorldService {
    public messages = writable<HelloWorld[]>([]);
    private pagination: HelloWorldSearchQueryResponseMessagePagination = {
        page: 0,
        pageSize: 10,
        totalResults: 0,
    };

    deleteHelloWorld(request: DeleteHelloWorldRequest) {
        return helloWorldApi.deleteHelloWorld(request).pipe(
            shareReplay(1),
            tap(() => {
                this.messages.update((m) => {
                    const index = m.findIndex((m) => m.id === request.helloWorldId);
                    m.splice(index, 1);
                    return m;
                });
            }),
        );
    }

    createHelloWorld(request: CreateHelloWorldRequest) {
        return helloWorldApi.createHelloWorld(request).pipe(
            shareReplay(1),
            tap(({ message }) => {
                this.messages.update((m) => {
                    const loadedMessages = (this.pagination.page + 1) * this.pagination.pageSize;
                    if (m.length < loadedMessages) {
                        // Still within the current page
                        return m.concat(message);
                    }
                    return m;
                });
            }),
        );
    }

    searchHelloWorlds() {
        return helloWorldApi.searchHelloWorlds(this.pagination).pipe(
            shareReplay(1),
            tap(({ pagination, results }) => {
                this.messages.set(results);
                this.pagination = {
                    ...pagination,
                    // Page may or may not have been included in response
                    page: 0,
                };
            }),
        );
    }

    searchNext() {
        return helloWorldApi
            .searchHelloWorlds({
                page: this.pagination.page + 1,
                pageSize: this.pagination.pageSize,
            })
            .pipe(
                shareReplay(1),
                tap(({ pagination, results }) => {
                    this.messages.update((m) => {
                        // Slice to ensure we cut off previosly-loaded data
                        const previous = m.slice(0, (this.pagination.page + 1) * this.pagination.pageSize);
                        return previous.concat(results);
                    });
                    if (results.length > 0) {
                        // Only increment a page if you've got data
                        this.pagination.page = pagination.page;
                    }
                }),
            );
    }
}

export const helloWorldService = new HelloWorldService();
