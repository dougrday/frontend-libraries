import { ReactNode, useEffect, useReducer, useState } from "react";
import ReactDOM from "react-dom";
import { Observable } from "rxjs";

// FIXME: ReactNode type so we don't need <span> below
export const useTitle = (title: ReactNode) =>
    useEffect(() => {
        const layoutTitleNode = document.getElementById("layout-title");
        if (layoutTitleNode) {
            ReactDOM.render(<span>{title}</span>, layoutTitleNode);
        }
        return () => {
            if (layoutTitleNode) {
                ReactDOM.unmountComponentAtNode(layoutTitleNode);
            }
        };
    });

export const useObservable = function <T>(observable: Observable<T>, initialState: T | (() => T)): T {
    const [value, setValue] = useState(initialState);
    // FIXME: This shouldn't have to be done to ensure the observable
    // is properly causing a DOM update. However, without it, the DOM
    // updates aren't properly happening.
    const [_, forceUpdate] = useReducer((x) => x + 1, 0);

    useEffect(() => {
        const subscription = observable.subscribe((value) => {
            setValue(value);
            forceUpdate();
        });
        return () => subscription.unsubscribe();
    }, [observable]);

    return value;
};
