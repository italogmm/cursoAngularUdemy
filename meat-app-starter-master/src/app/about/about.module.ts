import { NgModule } from "@angular/core";
import { AboutComponent } from "./about.component";
import { Routes, Router, RouterModule } from "@angular/router";

const ROUTES: Routes = [
    {path: '', component: AboutComponent}
]

@NgModule({
    declarations: [AboutComponent],
    imports: [
        RouterModule.forChild(ROUTES)
    ]
})
export class AboutModule {

}
