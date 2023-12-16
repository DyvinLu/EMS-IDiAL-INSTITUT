import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './ludyComponents/nav/nav.component';
import { AsideLeftComponent } from './ludyComponents/aside-left/aside-left.component';
import { DashboardComponent } from './ludyComponents/dashboard/dashboard.component';
import { FooterComponent } from './ludyComponents/footer/footer.component';
import { TableComponent } from './ludyComponents/table/table.component';
import { CalenderComponent } from './ludyComponents/calender/calender.component';
import { ChartComponent } from './ludyComponents/chart/chart.component';
import { LoginComponent } from './ludyComponents/login/login.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './ludyComponents/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AsideLeftComponent,
    DashboardComponent,
    FooterComponent,
    TableComponent,
    CalenderComponent,
    ChartComponent,
    LoginComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
