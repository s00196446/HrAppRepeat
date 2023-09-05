import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit{
  weatherData: any;
  errorMessage: string = '';

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getWeatherData('lon');
  }

  getWeatherData(city: string) {
    const apiKey = 'ca7f38cb7aa73d55ca53a1e8bdceabbe';
    const apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&appid={ca7f38cb7aa73d55ca53a1e8bdceabbe}`;
  
    this.weatherService.getWeather(apiUrl).subscribe(
      (data) => {
        this.weatherData = data;
      },
      (error: HttpErrorResponse) => {
        if (error.status === 404) {
          this.errorMessage = 'City not found. Please check the city name.';
        } else {
          this.errorMessage = 'An error occurred while fetching weather data.';
        }
        console.error('Error:', error);
      }
    );
  }
}
