import "@material/mwc-button";
import "@material/mwc-textfield";
import type { TextField } from "@material/mwc-textfield";
import { FormEvent, useEffect, useRef, useState } from "react";
import { helloWorldService } from "shared";
import "./HelloWorldForm.css";

function HelloWorldForm() {
    const [isValid, setIsValid] = useState(false);

    const formRef = useRef<HTMLFormElement>(null);
    const nameRef = useRef<TextField>(null);

    useEffect(() => {
        const nameField = nameRef.current;
        if (nameField) {
            nameField.addEventListener("invalid", handleNameInvalid);
            nameField.addEventListener("keydown", handleKeyDown);

            nameField.validityTransform = (newValue, nativeValidity) => {
                if (newValue.startsWith("D") && newValue !== "Doug") {
                    return {
                        ...nativeValidity,
                        customError: true,
                        valid: false,
                    };
                }
                return nativeValidity;
            };

            nameField.focus(); // Set initial focus on the name field
        }

        return () => {
            nameField?.removeEventListener("invalid", handleNameInvalid);
            nameField?.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const checkValidity = () => {
        return (formRef?.current?.checkValidity() && nameRef?.current?.checkValidity()) ?? false;
    };

    const clearForm = () => {
        if (nameRef.current) {
            nameRef.current.value = "";
            nameRef.current.focus();
        }
    };

    const getFormData = (): any => {
        if (formRef?.current) {
            const formData = new FormData(formRef.current);
            const data: any = {};
            for (let [key, value] of formData) {
                data[key] = value;
            }
            return data;
        }

        return {};
    };

    const handleFormDataChanged = (event: FormEvent) => {
        setIsValid(checkValidity());
    };

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.code === "Enter") {
            event.preventDefault();
            submit();
        }
    };

    const handleNameInvalid = (event: Event) => {
        setIsValid(false);

        const nameField = nameRef.current;
        if (nameField) {
            nameField.validationMessage = "";
            if (nameField.validity.valueMissing) {
                nameField.validationMessage = "Name is required";
            } else if (nameField.validity.tooShort) {
                nameField.validationMessage = `Name must be at least ${nameField.getAttribute(
                    "minlength",
                )} characters long`;
            } else if (nameField.validity.customError) {
                nameField.validationMessage = "Names starting with 'D' must be 'Doug'";
            }
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        submit();
    };

    const submit = () => {
        if (!checkValidity()) {
            return;
        }
        const data = getFormData();

        helloWorldService.createHelloWorld({ sayHelloCommandMessage: data }).subscribe(clearForm);
    };

    return (
        <form ref={formRef} onChange={handleFormDataChanged} onSubmit={handleSubmit}>
            <div className="spaced">
                <mwc-textfield
                    ref={nameRef}
                    autoValidate
                    label="Hello, "
                    minLength="2"
                    name="name"
                    placeholder="Name"
                    required
                />
            </div>
            <div className="right">
                <mwc-button onClick={handleSubmit} raised>
                    Submit
                </mwc-button>
            </div>
        </form>
    );
}

export default HelloWorldForm;
