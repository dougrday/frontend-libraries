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
    useEffect(() => {
        const subscription = observable.subscribe((value) => {
            setValue(value);
        });
        return () => subscription.unsubscribe();
    }, [observable]);

    return value;
};
