import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherComponent } from './weather/weather.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { WeatherData } from './weather-data';

import { WeatherService } from './services/weather.service';
import { environment } from '../environments/environment';


@NgModule({
   declarations: [
      AppComponent,
      WeatherComponent

   ],
   imports: [
BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      AngularFontAwesomeModule,
      FormsModule,
      ReactiveFormsModule
   ],
   providers: [WeatherService],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
