import "@material/mwc-button";
import "@material/mwc-textfield";
import type { TextField } from "@material/mwc-textfield";
import { FormEvent, useEffect, useRef, useState } from "react";
import { helloWorldService } from "shared";
import "./HelloWorldForm.css";

function HelloWorldForm() {
    const [isValid, setIsValid] = useState(false);
    const [name, setName] = useState("");

    const formRef = useRef<HTMLFormElement>(null);
    const nameRef = useRef<TextField>(null);

    useEffect(() => {
        const nameField = nameRef.current;
        if (nameField) {
            nameField.addEventListener("change", handleChange);
            nameField.addEventListener("invalid", handleNameInvalid);

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
            nameField?.removeEventListener("change", handleChange);
            nameField?.removeEventListener("invalid", handleNameInvalid);
        };
    }, []);

    const checkValidity = () => {
        return (formRef?.current?.checkValidity() && nameRef?.current?.checkValidity()) ?? false;
    };

    const clearForm = () => {
        setName("");
        nameRef.current?.focus();
    };

    const handleChange = (event: Event) => {
        setName((event.target as TextField).value);
    };

    const handleFormDataChanged = (event: FormEvent) => {
        setIsValid(checkValidity());
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

        if (!checkValidity()) {
            return;
        }

        helloWorldService.createHelloWorld({ sayHelloCommandMessage: { name } }).subscribe(clearForm);
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
                    value={name}
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
