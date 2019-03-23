import { Routes } from '@angular/router';
import { CreatePlayItemComponent } from 'src/app/components/createplayitem/createplayitem.component';
import { MainComponent } from 'src/app/components/main/main.component';
import { AboutpageComponent } from './components/aboutpage/aboutpage.component';

export const appRoutes: Routes = [
    {path : 'create', component : CreatePlayItemComponent},
    {path : 'main', component : MainComponent},
    {path : 'about', component : AboutpageComponent},
    {path : '', redirectTo : 'main', pathMatch: 'full'},
];
