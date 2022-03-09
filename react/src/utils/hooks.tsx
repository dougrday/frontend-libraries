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

export const useForm = (submitCallback: any, fields: any) => {
    const [allowSubmit, setAllowSubmit] = useState(false);
    const [formData, setFormData] = useState(fields);

    function submitForm() {
        setAllowSubmit(true);
    }

    function setFormValues(event: any) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    }

    useEffect(() => {
        if (allowSubmit) {
            setAllowSubmit(false);
            submitCallback();
        }
    });

    return [submitForm, formData, setFormValues];
};
