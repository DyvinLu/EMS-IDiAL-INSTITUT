import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './ludyComponents/dashboard/dashboard.component';
import { CalenderComponent } from './ludyComponents/calender/calender.component';
import { TableComponent } from './ludyComponents/table/table.component';
import { LoginComponent } from './ludyComponents/login/login.component';
import { ChartComponent } from './ludyComponents/chart/chart.component';


const routes: Routes = [
  {path:'', component:DashboardComponent},
  {path:'app-table', component:TableComponent},
  {path:'calender',component:CalenderComponent},
  //{path:'chart',component:ChartComponent},
  {path:'login',component:LoginComponent},

  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
