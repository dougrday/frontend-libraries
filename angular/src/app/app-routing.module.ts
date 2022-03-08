import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HelloWorldActionItemsComponent } from "./pages/hello-world/hello-world-action-items.component";
import { HelloWorldTitleComponent } from "./pages/hello-world/hello-world-title.component";
import { HelloWorldComponent } from "./pages/hello-world/hello-world.component";
import { HomeActionItemsComponent } from "./pages/home/components/home-action-items.component";
import { HomeTitleComponent } from "./pages/home/components/home-title.component";
import { HomeComponent } from "./pages/home/home.component";

const routes: Routes = [
    {
        path: "",
        children: [
            {
                component: HomeComponent,
                path: "",
            },
            {
                component: HomeTitleComponent,
                outlet: "title",
                path: "",
            },
            {
                component: HomeActionItemsComponent,
                outlet: "actionItems",
                path: "",
            },
        ],
    },
    {
        path: "hello-world",
        children: [
            {
                component: HelloWorldComponent,
                path: "",
            },
            {
                component: HelloWorldTitleComponent,
                outlet: "title",
                path: "",
            },
            {
                component: HelloWorldActionItemsComponent,
                outlet: "actionItems",
                path: "",
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppRoutingModule {}
