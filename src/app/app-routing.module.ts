import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TableComponent } from './pages/table/table.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  }, // http://localhost:4200

  {
    path: 'app-table',
    component: TableComponent,
  }, // http://localhost:4200/app-table
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
