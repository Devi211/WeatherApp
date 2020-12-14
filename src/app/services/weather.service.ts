import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class WeatherService {
weatherData: any;
  apikey = 'fb763619beb06b98c04046c34de70536';
baseUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';

constructor(private http: HttpClient) { }

getWeatherByCity(city: string): Observable<any> {
    return this.http.get(this.baseUrl + city + '&appid=' + this.apikey);
}
}
