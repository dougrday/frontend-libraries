import { Subject } from "rxjs";

class LayoutService {
    private _actionItems$ = new Subject<JSX.Element>();
    public get actionItems$() {
        return this._actionItems$.asObservable();
    }

    private _title$ = new Subject<JSX.Element>();
    public get title$() {
        return this._title$.asObservable();
    }

    public setActionItems(actionItems: JSX.Element) {
        setTimeout(() => this._actionItems$.next(actionItems), 0);
    }

    public setTitle(title: JSX.Element) {
        setTimeout(() => this._title$.next(title), 0);
    }
}

export const layoutService = new LayoutService();
