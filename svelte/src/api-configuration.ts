import type { AjaxRequest, AjaxResponse } from "rxjs/ajax";

interface Middleware {
    pre?(request: AjaxRequest): AjaxRequest;
    post?(response: AjaxResponse<any>): AjaxResponse<any>;
}

export default {
    basePath: "http://localhost:3000",
    middleware: [] as Middleware[],
    username: null,
    password: null,
    apiKey: null,
    accessToken: null,
} as any;
