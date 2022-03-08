import { AfterContentInit, Component, ElementRef, ViewChild } from "@angular/core";
import "@material/mwc-button";
import "@material/mwc-textfield";
import type { TextField } from "@material/mwc-textfield";
import { helloWorldService } from "shared";

@Component({
    selector: "app-hello-world-form",
    templateUrl: "./hello-world-form.component.html",
    styleUrls: ["./hello-world-form.component.css"],
})
export class HelloWorldFormComponent implements AfterContentInit {
    isValid = false;
    @ViewChild("form")
    form: ElementRef<HTMLFormElement>;
    name: TextField & HTMLElement;

    constructor(private elementRef: ElementRef) {
        this.handleNameInvalid.bind(this);
        this.handleKeyUp.bind(this);
        this.handleSubmit.bind(this);
    }

    checkValidity(): boolean {
        return this.form.nativeElement.checkValidity() && this.name.checkValidity();
    }

    clearForm(): void {
        this.name.value = "";
        this.name.focus();
    }

    getFormData(): any {
        const formData = new FormData(this.form.nativeElement);
        const data: any = {};
        formData.forEach((value, key) => (data[key] = value));
        return data;
    }

    handleFormDataChanged(event: Event) {
        this.isValid = this.checkValidity();
    }

    handleKeyUp(event: KeyboardEvent) {
        if (event.code === "Enter") {
            event.preventDefault();
            this.handleSubmit(event);
        }
    }

    handleNameInvalid(event: Event) {
        this.isValid = false;

        this.name.validationMessage = "";
        if (this.name.validity.valueMissing) {
            this.name.validationMessage = "Name is required";
        } else if (this.name.validity.tooShort) {
            this.name.validationMessage = `Name must be at least ${this.name.getAttribute(
                "minlength",
            )} characters long`;
        } else if (this.name.validity.customError) {
            this.name.validationMessage = "Names starting with 'D' must be 'Doug'";
        }
    }

    handleSubmit(event: Event) {
        event.preventDefault();

        if (!this.checkValidity()) {
            return;
        }

        // If succcessful, send data to server
        const data = this.getFormData();
        helloWorldService.createHelloWorld({ sayHelloCommandMessage: data }).subscribe(() => {
            this.clearForm();
        });
    }

    ngAfterContentInit(): void {
        this.name = this.elementRef.nativeElement.querySelector("mwc-textfield");

        this.name.validityTransform = (newValue, nativeValidity) => {
            if (newValue.startsWith("D") && newValue !== "Doug") {
                return {
                    ...nativeValidity,
                    customError: true,
                    valid: false,
                };
            }
            return nativeValidity;
        };

        this.name.focus();
    }
}
