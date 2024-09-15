import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationInterceptor } from './core/interceptors/authentication.interceptor';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./core/pages/header/header.component";
import { FooterComponent } from "./core/pages/footer/footer.component";
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routes';
import { LoginComponent } from './core/pages/login/login.component';

// Import Kendo UI modules
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { AppBarModule } from '@progress/kendo-angular-navigation';
import { ItemComponent } from './core/pages/item/item.component';
import { TransactionComponent } from './core/pages/transaction/transaction.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';


@NgModule({
  declarations: [AppComponent,HeaderComponent,FooterComponent,LoginComponent,ItemComponent,TransactionComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    RouterOutlet,
    AppRoutingModule,
    BrowserAnimationsModule,
    NotificationModule,        
    ButtonsModule,
    InputsModule,
    LayoutModule,
    DateInputsModule,
    AppBarModule,
    GridModule,
    DialogModule,
    DropDownsModule
],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    DatePipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
