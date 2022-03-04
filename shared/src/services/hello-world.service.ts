import { BehaviorSubject } from "rxjs";
import { shareReplay, tap, map, withLatestFrom } from "rxjs/operators";
import { helloWorldApi } from "../api";
import {
    CreateHelloWorldRequest,
    DeleteHelloWorldRequest,
    HelloWorldSearchQueryResponseMessagePagination,
} from "../generated/hello-world";
import { HelloWorld } from "../generated/hello-world/models/HelloWorld";

class HelloWorldService {
    public hasMessages$ = new BehaviorSubject(false);
    public messages$ = new BehaviorSubject<HelloWorld[]>([]);
    private pagination: HelloWorldSearchQueryResponseMessagePagination = {
        page: 0,
        pageSize: 10,
        totalResults: 0,
    };

    constructor() {
        // Keep "hasMessages" up-to-date
        this.messages$.pipe(map((m) => m.length > 0)).subscribe(this.hasMessages$);
    }

    createHelloWorld(request: CreateHelloWorldRequest) {
        return helloWorldApi.createHelloWorld(request).pipe(
            shareReplay(1),
            withLatestFrom(this.messages$),
            tap(([{ message }, messages]) => this.messages$.next(messages.concat(message))),
        );
    }

    deleteHelloWorld(request: DeleteHelloWorldRequest) {
        return helloWorldApi.deleteHelloWorld(request).pipe(
            shareReplay(1),
            withLatestFrom(this.messages$),
            tap(([_, messages]) => {
                // Ensure if new data is loaded, we start from
                // the beginning
                this.pagination.page = -1;

                const index = messages.findIndex((m) => m.id === request.helloWorldId);
                messages.splice(index, 1);
                this.messages$.next(messages);
            }),
        );
    }

    searchHelloWorlds() {
        return helloWorldApi.searchHelloWorlds({ page: 0, pageSize: 10 }).pipe(
            shareReplay(1),
            tap(({ pagination, results }) => {
                this.pagination = {
                    ...pagination,
                    // Page may or may not have been included in response
                    page: 0,
                };
                this.messages$.next(results);
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
                withLatestFrom(this.messages$),
                tap(([{ pagination, results }, messages]) => {
                    // Slice to ensure we cut off previosly-loaded data
                    const previous = messages.slice(0, (this.pagination.page + 1) * this.pagination.pageSize);
                    this.messages$.next(previous.concat(results));

                    if (results.length > 0) {
                        // Only increment a page if you've got data
                        this.pagination.page = pagination.page;
                    }
                    this.pagination.totalResults = pagination.totalResults;
                }),
            );
    }
}

export const helloWorldService = new HelloWorldService();
