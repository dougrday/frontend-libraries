import "@material/mwc-button";
import "@material/mwc-textfield";
import type { TextField } from "@material/mwc-textfield";
import { FormEvent, useEffect, useRef, useState } from "react";
import { helloWorldService } from "shared";
import "./HelloWorldForm.css";

declare global {
    namespace JSX {
        interface IntrinsicElements {
            "mwc-button": any;
            "mwc-textfield": any;
        }
    }
}

function HelloWorldForm() {
    const [name, setName] = useState("");
    const nameRef = useRef<TextField>(null);

    useEffect(() => {
        const nameField = nameRef.current;
        nameField?.addEventListener("change", handleChange);
        nameRef.current?.focus(); // Set initial focus on the name field

        return () => {
            nameField?.removeEventListener("change", handleChange);
        };
    }, []);

    const clearForm = () => {
        setName("");
        nameRef.current?.focus();
    };

    const handleChange = (event: Event) => {
        setName((event.target as TextField).value);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        helloWorldService.createHelloWorld({ sayHelloCommandMessage: { name } }).subscribe(clearForm);
    };

    return (
        <form onSubmit={handleSubmit}>
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
