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
import { LoginComponent } from './ludyComponents/login/login.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './ludyComponents/home/home.component';


// Import the module from the SDK
import { AuthModule } from '@auth0/auth0-angular';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AsideLeftComponent,
    DashboardComponent,
    FooterComponent,
    TableComponent,
    CalenderComponent,
    LoginComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    // Import the module into the application, with configuration
    AuthModule.forRoot({
      domain: 'http://sems.vms.idial.fh:8086/signin', //{yourDomain}',
      clientId: '0bdb2da3dec5e000', //'{yourClientId}',
      authorizationParams: {
        redirect_uri: 'http://localhost:4200' // window.location.origin
      }
    }),
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
