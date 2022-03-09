import { useEffect, useState } from "react";
import { Observable } from "rxjs";

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
