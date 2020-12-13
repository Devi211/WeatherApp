import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { WeatherService } from './../services/weather.service';
import { ErrorHandlerServiceService } from './../services/error-handler-service.service';
import { WeatherData } from './../weather-data';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  city: string;
  weatherForm: FormGroup;
  items: FormArray;
  weatherDataList = [];
  weather = {} as WeatherData;
  panelArray = [];
  errorMessage;
  constructor(
    private WeatherService: WeatherService,
    private fb: FormBuilder,
    private errorHandler: ErrorHandlerServiceService) {
    this.weatherForm = this.fb.group({
      items: this.fb.array([this.newWeather()])
    });
    setInterval(() => {
      this.getLatestWeatherData();
    }, 30000);
  }

  ngOnInit() {
    this.weatherGroup();
    const storedData = JSON.parse(localStorage.getItem("weatherDataList"));
    if (storedData.length > 0) {
      this.weatherDataList = storedData;
      const items = this.weatherForm.get("items") as FormArray;
      this.weatherDataList.forEach((x, index) => {        
        items.controls[x.id].get('cityName').setValue(x.city);
        // document.getElementById('empty-' + index).innerHTML = '';
        // document.getElementById('panel-' + index).classList.remove('hide');
        // document.getElementById('panel-' + index).classList.add('op-1');
      });
    }
  }

  getLatestWeatherData() {
    if (this.weatherDataList.length > 0) {
      const items = this.weatherForm.get("items") as FormArray;
      this.weatherDataList.forEach((x, index) => {
        this.getWeather(x.city, x.id);
        items.controls[x.id].get('cityName').setValue(x.city);
        console.log(index++);
      });
    }
  }

  newWeather() {
    return this.fb.group({
      cityName: ['']
    })
  }

  setFocus(i) {
    document.getElementById('city' + i).focus();
  }

  // enablePanel(index) {
  //   document.getElementById('empty-' + index).innerHTML = '';
  //   document.getElementById('panel-' + index).classList.remove('hide');
  //   document.getElementById('panel-' + index).classList.add('op-1');
  // }

  weatherGroup() {
    this.items = this.weatherForm.get("items") as FormArray;
    for (let i = 1; i <= 8; i++) {
      this.items.push(this.newWeather());
    }
  }

  getWeather(value, id) {
    this.WeatherService.getWeatherByCity(value).subscribe((response) => {
      console.log(response.message);
      let obj = {
        id: id,
        desc: response.weather[0].main,
        city: value,
        humidity: response.main.humidity,
        temp: Math.floor(response.main.temp - 273.15),
        max: Math.floor(response.main.temp_max - 273.15),
        min: Math.floor(response.main.temp_min - 273.15),
        icon: response.weather[0].id,
        iconName: this.getImageType(response.weather[0].id)
      }
      const message = '';
      document.getElementById('error-' + id).innerHTML = message;
      if (this.weatherDataList.length) {
        const findIndex = this.weatherDataList.findIndex(x => x.id == id);
        if (findIndex > -1) {
          this.weatherDataList[findIndex] = obj;
        } else {
          this.weatherDataList.push(obj);
        }
      } else {
        this.weatherDataList.push(obj);
      }
      localStorage.setItem('weatherDataList', JSON.stringify(this.weatherDataList));

    }, (error) => {
      this.errorHandler.handleError(error);
      this.errorMessage = this.errorHandler.errorMessage;
      document.getElementById('error-' + id).innerHTML = this.errorMessage.message;
    });
  }

  getImageType(icon: number) {
    if (icon >= 200 && icon < 233) {
      return 'thunder.svg';
    }
    if (icon >= 300 && icon < 332) {
      return 'rainy-3.svg';
    }
    if (icon >= 500 && icon < 532) {
      return 'rainy-6.svg';
    }
    if (icon >= 600 && icon < 632) {
      return 'snowy-3.svg';
    }
    if (icon === 800) {
      return 'day.svg';
    }

    if (icon > 800) {
      return 'cloudy-day-3.svg';
    }
    if (icon >= 700 && icon < 800) {
      return 'cloudy-day-2.svg';
    }
  }
}
