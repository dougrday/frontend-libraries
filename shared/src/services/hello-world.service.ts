import { BehaviorSubject, of, throwError } from "rxjs";
import { AjaxResponse } from "rxjs/ajax";
import { shareReplay, tap, map, withLatestFrom, catchError } from "rxjs/operators";
import { helloWorldApi } from "../api";
import { CreateHelloWorldRequest, DeleteHelloWorldRequest } from "../generated/hello-world";
import { HelloWorld } from "../generated/hello-world/models/HelloWorld";

class HelloWorldService {
    public hasMessages$ = new BehaviorSubject(false);
    public messages$ = new BehaviorSubject<HelloWorld[]>([]);
    public totalMessages$ = new BehaviorSubject(0);

    private page = 0;
    private readonly pageSize = 10;

    constructor() {
        // Keep "hasMessages" up-to-date
        this.totalMessages$.pipe(map((total) => total > 0)).subscribe(this.hasMessages$);
    }

    createHelloWorld(request: CreateHelloWorldRequest) {
        return helloWorldApi.createHelloWorld(request).pipe(
            shareReplay(1),
            withLatestFrom(this.messages$, this.totalMessages$),
            tap(([{ message }, messages, totalMessages]) => {
                this.messages$.next(messages.concat(message));
                this.totalMessages$.next((totalMessages ?? 0) + 1);
            }),
        );
    }

    deleteHelloWorld(request: DeleteHelloWorldRequest) {
        return helloWorldApi.deleteHelloWorld(request).pipe(
            shareReplay(1),
            catchError((response: AjaxResponse) => {
                if (response.status === 404) {
                    // The message was already deleted
                    // so we need to remove it from the list
                    return of({ id: request.helloWorldId } as HelloWorld);
                }
                return throwError(response);
            }),
            withLatestFrom(this.messages$, this.totalMessages$),
            tap(([_, messages, totalMessages]) => {
                // Ensure if new data is loaded, we start from
                // the beginning
                this.page = -1;

                const index = messages.findIndex((m) => m.id === request.helloWorldId);
                messages.splice(index, 1);
                this.messages$.next(messages);
                this.totalMessages$.next(totalMessages - 1);
            }),
        );
    }

    searchHelloWorlds() {
        return helloWorldApi.searchHelloWorlds({ page: 0, pageSize: this.pageSize }).pipe(
            shareReplay(1),
            tap(({ pagination, results }) => {
                this.page = 0;
                this.messages$.next(results);
                this.totalMessages$.next(pagination.totalResults);
            }),
        );
    }

    searchNext() {
        if (this.page === -1) {
            return this.searchHelloWorlds();
        }
        return helloWorldApi
            .searchHelloWorlds({
                page: this.page + 1,
                pageSize: this.pageSize,
            })
            .pipe(
                shareReplay(1),
                withLatestFrom(this.messages$),
                tap(([{ pagination, results }, messages]) => {
                    // Slice to ensure we cut off previosly-loaded data
                    const previous = messages.slice(0, (this.page + 1) * this.pageSize);
                    this.messages$.next(previous.concat(results));

                    if (results.length > 0) {
                        // Only increment a page if you've got data
                        this.page = pagination.page;
                    }
                    this.totalMessages$.next(pagination.totalResults);
                }),
            );
    }
}

export const helloWorldService = new HelloWorldService();
