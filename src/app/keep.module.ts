/* //Module-Importe
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DateSelectorComponent } from './date-selector/date-selector.component';
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
    DateSelectorComponent,
  ],
  imports: [
    BrowserModule,
    AuthModule.forRoot({
      domain: 'http://sems.vms.idial.fh:8086/signin',
      clientId: '0bdb2da3dec5e000',
      authorizationParams: {
        redirect_uri: 'http://localhost:4200'
      }
    }),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
 */