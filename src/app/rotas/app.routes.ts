import { Routes } from "@angular/router";
import { AppComponent } from "../app.component";
import { ContatoListComponent } from "../contato-list/contato-list.component";
import { ErrorComponent } from "../error/error.component";

export const appRoutes: Routes = [
    { path: "", component: AppComponent},
    { path: "contatos", component: ContatoListComponent },
    { path: "**", component: ErrorComponent }
]