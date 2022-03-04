import { BehaviorSubject } from "rxjs";
import { shareReplay, tap } from "rxjs/operators";
import { writable } from "svelte/store";
import { helloWorldApi } from "../api";
import {
    CreateHelloWorldRequest,
    DeleteHelloWorldRequest,
    HelloWorldSearchQueryResponseMessagePagination,
} from "../generated/hello-world";
import { HelloWorld } from "../generated/hello-world/models/HelloWorld";

class HelloWorldService {
    public hasMessages = new BehaviorSubject(false);
    public messages = writable<HelloWorld[]>([]);
    private pagination: HelloWorldSearchQueryResponseMessagePagination = {
        page: 0,
        pageSize: 10,
        totalResults: 0,
    };

    constructor() {
        // Keep "hasMessages" up-to-date
        this.messages.subscribe((m) => this.hasMessages.next(m.length > 0));
    }

    createHelloWorld(request: CreateHelloWorldRequest) {
        return helloWorldApi.createHelloWorld(request).pipe(
            shareReplay(1),
            tap(({ message }) => {
                this.messages.update((m) => {
                    const loadedMessages = (this.pagination.page + 1) * this.pagination.pageSize;
                    if (this.pagination.page === -1 || m.length < loadedMessages) {
                        // Still within the current page
                        return m.concat(message);
                    }
                    return m;
                });
            }),
        );
    }

    deleteHelloWorld(request: DeleteHelloWorldRequest) {
        return helloWorldApi.deleteHelloWorld(request).pipe(
            shareReplay(1),
            tap(() => {
                // Ensure if new data is loaded, we start from
                // the beginning
                this.pagination.page = -1;
                this.messages.update((m) => {
                    const index = m.findIndex((m) => m.id === request.helloWorldId);
                    m.splice(index, 1);
                    return m;
                });
            }),
        );
    }

    searchHelloWorlds() {
        return helloWorldApi.searchHelloWorlds({ page: 0, pageSize: 10 }).pipe(
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
        if (this.pagination.page === -1) {
            return this.searchHelloWorlds();
        }
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
