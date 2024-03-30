//Module-Importe
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'; //Importiert das Hauptmodul für die Ausführung von Angular-Anwendungen im Browser
import {HttpClientModule} from '@angular/common/http'; //Ermöglicht den HTTP-Zugriff für die Anwendung.

import { AppRoutingModule } from './app-routing.module'; // Enthält Routing-Konfigurationen für die Navigation innerhalb der Anwendung.
import { AppComponent } from './app.component';
import { NavComponent } from './ludyComponents/nav/nav.component';
import { AsideLeftComponent } from './ludyComponents/aside-left/aside-left.component';
import { DashboardComponent } from './ludyComponents/dashboard/dashboard.component';
import { FooterComponent } from './ludyComponents/footer/footer.component';
import { TableComponent } from './ludyComponents/table/table.component';
import { LoginComponent } from './ludyComponents/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; //Stellt Funktionen für das Arbeiten mit Angular-Formularen bereit.
import { HomeComponent } from './ludyComponents/home/home.component';


//import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts'; // Ermöglicht die Verwendung von CanvasJS-Angular-Charts in der Anwendung.


// Import the module from the SDK
import { AuthModule } from '@auth0/auth0-angular'; //Auth0-Modul zur Integration von Authentifizierung und Autorisierung in die Angular-Anwendung.
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; //Fügt Animationen für verschiedene UI-Elemente hinzu.
import { DateSelectorComponent } from './date-selector/date-selector.component';


//Deklarationen
@NgModule({
  declarations: [
    AppComponent, // Die Hauptkomponente der Anwendung
    // benutzerdefinierte Komponenten
    NavComponent,
    AsideLeftComponent,
    DashboardComponent,
    FooterComponent,
    TableComponent,
    LoginComponent,
    HomeComponent,
    DateSelectorComponent,
  ],
  imports: [
    BrowserModule,
    // Import the module into the application, with configuration
    //AuthModule-Konfiguration
    AuthModule.forRoot({
      domain: 'http://sems.vms.idial.fh:8086/signin', //Die Domäne des Authentifizierungsdienstes (Auth0 in diesem Fall)
      clientId: '0bdb2da3dec5e000', //Die Client-ID, die für die Anwendung bei Auth0 registriert wurde.
      authorizationParams: {
        redirect_uri: 'http://localhost:4200' // window.location.origin. Parameter für die Autorisierung, einschließlich der Weiterleitungs-URI nach erfolgreicher Authentifizierung.
      }
    }),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    //CanvasJSAngularChartsModule,
    //NgxDaterangepickerMd.forRoot()

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
 