//Module-Importe
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'; //Importiert das Hauptmodul für die Ausführung von Angular-Anwendungen im Browser
import { HttpClientModule } from '@angular/common/http'; //Ermöglicht den HTTP-Zugriff für die Anwendung.

import { AppRoutingModule } from './app-routing.module'; // Enthält Routing-Konfigurationen für die Navigation innerhalb der Anwendung.
import { AppComponent } from './app.component';
import { NavComponent } from './pages/_helper/nav/nav.component';
import { AsideLeftComponent } from './pages/_helper/aside-left/aside-left.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FooterComponent } from './pages/_helper/footer/footer.component';
import { TableComponent } from './pages/table/table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; //Stellt Funktionen für das Arbeiten mit Angular-Formularen bereit.

//import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts'; // Ermöglicht die Verwendung von CanvasJS-Angular-Charts in der Anwendung.

// Import the module from the SDK
import { AuthModule } from '@auth0/auth0-angular'; //Auth0-Modul zur Integration von Authentifizierung und Autorisierung in die Angular-Anwendung.
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; //Fügt Animationen für verschiedene UI-Elemente hinzu.

//Deklarationen
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
      domain: 'http://sems.vms.idial.fh:8086/signin', //Die Domäne des Authentifizierungsdienstes (Auth0 in diesem Fall)
      clientId: '0bdb2da3dec5e000', //Die Client-ID, die für die Anwendung bei Auth0 registriert wurde.
      authorizationParams: {
        redirect_uri: 'http://localhost:4200', // window.location.origin. Parameter für die Autorisierung, einschließlich der Weiterleitungs-URI nach erfolgreicher Authentifizierung.
      },
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
  bootstrap: [AppComponent],
})
export class AppModule {}
