import "@material/mwc-button";
import "@material/mwc-textfield";
import type { TextField } from "@material/mwc-textfield";
import { FormEvent, useEffect, useRef, useState } from "react";
import { helloWorldService } from "shared";
import { useForm } from "../../utils/hooks";
import "./HelloWorldForm.css";

function HelloWorldForm() {
    const [isValid, setIsValid] = useState(false);

    const formRef = useRef<HTMLFormElement>(null);
    const nameRef = useRef<TextField>(null);

    const [submitForm, formData, setFormValues] = useForm(submitCallback, {
        name: "",
    });

    useEffect(() => {
        const nameField = nameRef.current;
        if (nameField) {
            nameField.addEventListener("invalid", handleNameInvalid);
            nameField.addEventListener("keydown", handleKeyDown);
            nameField.addEventListener("input", handleInput);

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
            nameField?.removeEventListener("input", handleInput);
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

    const handleFormDataChanged = (event: FormEvent) => {
        setIsValid(checkValidity());
    };

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.code === "Enter") {
            event.preventDefault();
            submitForm();
        }
    };

    const handleInput = (event: Event) => {
        setFormValues(event);
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

    function submitCallback() {
        if (!checkValidity()) {
            return;
        }

        helloWorldService.createHelloWorld({ sayHelloCommandMessage: { name: formData.name } }).subscribe(clearForm);
    }

    return (
        <form ref={formRef} onChange={handleFormDataChanged} onSubmit={submitForm}>
            <div className="spaced">
                <mwc-textfield
                    ref={nameRef}
                    autoValidate
                    label="Hello, "
                    minLength="2"
                    name="name"
                    placeholder="Name"
                    required
                    value={formData.name}
                />
            </div>
            <div className="right">
                <mwc-button onClick={submitForm} raised>
                    Submit
                </mwc-button>
            </div>
        </form>
    );
}

export default HelloWorldForm;
