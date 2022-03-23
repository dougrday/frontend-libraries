import { BehaviorSubject, Observable, of, throwError } from "rxjs";
import { AjaxResponse } from "rxjs/ajax";
import { catchError, map, shareReplay, tap } from "rxjs/operators";
import { helloWorldApi } from "../api";
import { Cached } from "../cached";
import {
    CreateHelloWorldRequest,
    DeleteHelloWorldRequest,
    HelloWorldDeletedEventMessage,
    HelloWorldSearchQueryResponseMessage,
} from "../generated/hello-world";
import { HelloWorld } from "../generated/hello-world/models/HelloWorld";

class HelloWorldService {
    private messagesSubject$ = new BehaviorSubject<HelloWorld[]>([]);
    private page = 0;
    private readonly pageSize = 10;
    private searchHelloWorldsCache$ = new Cached<Observable<HelloWorldSearchQueryResponseMessage>>();
    private totalMessagesSubject$ = new BehaviorSubject(0);

    /**
     * Returns true if there are messages (either loaded or not)
     */
    public get hasMessages() {
        return this.totalMessagesSubject$.value > 0;
    }

    /**
     * Returns an observable that emits true if there are messages, false otherwise.
     */
    public get hasMessages$() {
        return this.totalMessagesSubject$.pipe(map((totalMessages) => totalMessages > 0));
    }

    /**
     * Gets the current messages that have been loaded.
     */
    public get messages() {
        return this.messagesSubject$.value;
    }

    /**
     * Gets an observable stream of messages that have been loaded.
     */
    public get messages$() {
        return this.messagesSubject$.asObservable();
    }

    /**
     * Gets the number of total messages.
     */
    public get totalMessages() {
        return this.totalMessagesSubject$.value;
    }

    /**
     * Gets an observable stream of the number of total messages.
     */
    public get totalMessages$() {
        return this.totalMessagesSubject$.asObservable();
    }

    /**
     * Creates a new hello world message.
     * @param request The request to create the message.
     * @returns An observable stream of HelloWorldSaidEventMessage.
     */
    createHelloWorld(request: CreateHelloWorldRequest) {
        return helloWorldApi.createHelloWorld(request).pipe(
            tap(({ message }) => {
                this.messagesSubject$.next(this.messagesSubject$.value.concat(message));
                this.totalMessagesSubject$.next(this.totalMessagesSubject$.value + 1);
            }),
            shareReplay(1),
        );
    }

    /**
     * Deletes a hello world message.
     * @param request The request to delete the message.
     * @returns An observable stream of HelloWorldDeletedEventMessage.
     */
    deleteHelloWorld(request: DeleteHelloWorldRequest) {
        return helloWorldApi.deleteHelloWorld(request).pipe(
            catchError((response: AjaxResponse) => {
                if (response.status === 404) {
                    // The message was already deleted
                    // so we need to remove it from the list
                    return of({ message: { id: request.helloWorldId } } as HelloWorldDeletedEventMessage);
                }
                return throwError(response);
            }),
            tap(() => {
                // Ensure if new data is loaded, we start from
                // the beginning
                this.page = -1;
                this.searchHelloWorldsCache$.clear();

                const messages = this.messagesSubject$.value;
                const index = messages.findIndex((m) => m.id === request.helloWorldId);
                messages.splice(index, 1);
                this.messagesSubject$.next(messages);
                this.totalMessagesSubject$.next(this.totalMessagesSubject$.value - 1);
            }),
            shareReplay(1),
        );
    }

    /**
     * Searches for hello world messages.
     * @returns An observable stream of HelloWorldSearchQueryResponseMessage.
     */
    searchHelloWorlds() {
        // Get the current response from cache, if available
        let result$ = this.searchHelloWorldsCache$.get();
        if (!result$) {
            result$ = helloWorldApi.searchHelloWorlds({ page: 0, pageSize: this.pageSize }).pipe(
                tap(({ pagination, results }) => {
                    this.page = 0;
                    this.messagesSubject$.next(results);
                    this.totalMessagesSubject$.next(pagination.totalResults);
                }),
                shareReplay(1),
            );
            // Expire in 10 seconds
            const expires = new Date();
            expires.setSeconds(expires.getSeconds() + 10);
            this.searchHelloWorldsCache$.set(result$, expires);
        }
        return result$;
    }

    /**
     * Searches the next page of hello world messages.
     * @returns An observable stream of HelloWorldSearchQueryResponseMessage.
     */
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
                //
                shareReplay(1),
            );
    }
}

export const helloWorldService = new HelloWorldService();
