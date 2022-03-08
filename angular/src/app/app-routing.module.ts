import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
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
    { path: "hello-world", component: HelloWorldComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
