import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { config } from 'rxjs';
import { PublicRoutingModule } from './public/public-routing.module';
import { PrivateModule } from './private/private.module';
import { PublicModule } from './public/public.module';
import { PrivateRoutingModule } from './private/private-routing.module';


export function tokenGetter(){
  return sessionStorage.getItem('jwtToken');
}

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({
        config:{
          tokenGetter:tokenGetter,
          allowedDomains:['localhost:4200']
        }
})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
