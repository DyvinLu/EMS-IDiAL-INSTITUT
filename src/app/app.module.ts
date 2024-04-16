import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './pages/_helper/nav/nav.component';
import { AsideLeftComponent } from './pages/_helper/aside-left/aside-left.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FooterComponent } from './pages/_helper/footer/footer.component';
import { TableComponent } from './pages/table/table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AuthModule } from '@auth0/auth0-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent, 
    NavComponent,
    AsideLeftComponent,
    DashboardComponent,
    FooterComponent,
    TableComponent,
  ],
  imports: [
    BrowserModule,
    AuthModule.forRoot({
      domain: 'http://sems.vms.idial.fh:8086/signin',
      clientId: '0bdb2da3dec5e000', 
      authorizationParams: {
        redirect_uri: 'http://localhost:4200',
      },
    }),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
