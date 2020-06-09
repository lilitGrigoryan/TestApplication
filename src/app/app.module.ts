import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from '@app/helpers/fake-backend';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { BasicAuthInterceptor } from '@app/helpers/basic-auth.interceptor';
import { ErrorInterceptor } from '@app/helpers/error.interceptor';
import { FormsModule } from '@angular/forms';

import { HomeComponent } from '@app/home/home.component';
import { LoginComponent } from '@app/login/login.component';
import { AuthenticationService } from '@app/authentication.service';
import { UserService } from '@app/user.service';
import { AppMaterialModule } from '@app/material-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AccordionModule } from 'primeng/accordion';     //accordion and accordion tab
import { MenuItem } from 'primeng/api';                  //api

import { EditableComponent } from '@app/editable/editable.component';
import { ViewModeDirective } from '@app/editable/view-mode.directive';
import { EditModeDirective } from '@app/editable/edit-mode.directive';
import { FocusableDirective } from '@app/focusable.directive';
import { EditableOnEnterDirective } from '@app/editable/edit-on-enter.directive';
import { ResizableModule } from 'angular-resizable-element';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgHttpLoaderModule } from 'ng-http-loader';
import {TableModule} from 'primeng/table';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AccordionModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        AppMaterialModule,
        CommonModule,
        ResizableModule,
        TableModule,
        FormsModule,
        ScrollingModule,
        NgHttpLoaderModule.forRoot(), 
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        EditableComponent,
        ViewModeDirective,
        EditModeDirective,
        FocusableDirective,
        EditableOnEnterDirective
    ],
    providers: [
      AuthenticationService,
      UserService,
        { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
