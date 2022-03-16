import { BehaviorSubject, of, throwError } from "rxjs";
import { AjaxResponse } from "rxjs/ajax";
import { catchError, map, shareReplay, tap } from "rxjs/operators";
import { helloWorldApi } from "../api";
import { CreateHelloWorldRequest, DeleteHelloWorldRequest } from "../generated/hello-world";
import { HelloWorld } from "../generated/hello-world/models/HelloWorld";

class HelloWorldService {
    public get hasMessages$() {
        return this.totalMessages$.pipe(map((total) => total > 0));
    }

    private messagesSubject$ = new BehaviorSubject<HelloWorld[]>([]);
    public get messages() {
        return this.messagesSubject$.value;
    }
    public get messages$() {
        return this.messagesSubject$.asObservable();
    }
    public get totalMessages() {
        return this.totalMessagesSubject$.value;
    }
    public totalMessagesSubject$ = new BehaviorSubject(0);
    public get totalMessages$() {
        return this.totalMessagesSubject$.asObservable();
    }

    private page = 0;
    private readonly pageSize = 10;

    createHelloWorld(request: CreateHelloWorldRequest) {
        return helloWorldApi.createHelloWorld(request).pipe(
            shareReplay(1),
            tap(({ message }) => {
                this.messagesSubject$.next(this.messagesSubject$.value.concat(message));
                this.totalMessagesSubject$.next(this.totalMessagesSubject$.value + 1);
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
            tap(() => {
                // Ensure if new data is loaded, we start from
                // the beginning
                this.page = -1;

                const messages = this.messagesSubject$.value;
                const index = messages.findIndex((m) => m.id === request.helloWorldId);
                messages.splice(index, 1);
                this.messagesSubject$.next(messages);
                this.totalMessagesSubject$.next(this.totalMessagesSubject$.value - 1);
            }),
        );
    }

    searchHelloWorlds() {
        return helloWorldApi.searchHelloWorlds({ page: 0, pageSize: this.pageSize }).pipe(
            shareReplay(1),
            tap(({ pagination, results }) => {
                this.page = 0;
                this.messagesSubject$.next(results);
                this.totalMessagesSubject$.next(pagination.totalResults);
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
                tap(({ pagination, results }) => {
                    // Slice to ensure we cut off previosly-loaded data
                    const previous = this.messagesSubject$.value.slice(0, (this.page + 1) * this.pageSize);
                    this.messagesSubject$.next(previous.concat(results));

                    if (results.length > 0) {
                        // Only increment a page if you've got data
                        this.page = pagination.page;
                    }
                    this.totalMessagesSubject$.next(pagination.totalResults);
                }),
            );
    }
}

export const helloWorldService = new HelloWorldService();
