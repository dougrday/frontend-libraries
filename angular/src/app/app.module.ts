import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HelloWorldActionItemsComponent } from "./pages/hello-world/components/hello-world-action-items.component";
import { HelloWorldFormComponent } from "./pages/hello-world/components/hello-world-form.component";
import { HelloWorldTitleComponent } from "./pages/hello-world/components/hello-world-title.component";
import { HelloWorldComponent } from "./pages/hello-world/hello-world.component";
import { HomeActionItemsComponent } from "./pages/home/components/home-action-items.component";
import { HomeTitleComponent } from "./pages/home/components/home-title.component";
import { HomeComponent } from "./pages/home/home.component";

@NgModule({
    declarations: [
        AppComponent,
        HelloWorldActionItemsComponent,
        HelloWorldComponent,
        HelloWorldFormComponent,
        HelloWorldTitleComponent,
        HomeActionItemsComponent,
        HomeComponent,
        HomeTitleComponent,
    ],
    imports: [BrowserModule, AppRoutingModule],
    providers: [],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
