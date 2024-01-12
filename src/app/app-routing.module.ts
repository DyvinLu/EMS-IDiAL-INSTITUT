import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './ludyComponents/dashboard/dashboard.component';
import { CalenderComponent } from './ludyComponents/calender/calender.component';
import { TableComponent } from './ludyComponents/table/table.component';
import { LoginComponent } from './ludyComponents/login/login.component';
import { AuthGuard } from './_guards/auth.guard';


const routes: Routes = [
  {path:'', component:DashboardComponent, canActivate: [AuthGuard]}, // http://localhost:4200
  {path:'app-table', component:TableComponent, canActivate: [AuthGuard]}, // http://localhost:4200/app-table
  {path:'calender',component:CalenderComponent, canActivate:[AuthGuard]}, // http://localhost:4200/calender
  {path:'login',component:LoginComponent}, // http:localhost:4200/login

  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
