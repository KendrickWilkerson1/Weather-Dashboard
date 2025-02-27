import dotenv from 'dotenv';
dotenv.config();

// DONE: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}

// DONE: Define a class for the Weather object
// class Weather {
//   temp: number;
//   wind: number;
//   humidity: number;

//   constructor(temp: number, wind: number, humidity: number) {
//     this.temp = temp;
//     this.wind = wind;
//     this.humidity = humidity;
//   };
// };

// TODO: Complete the WeatherService class
// DONE: Define the baseURL, API key, and city name properties
// DONE: Create fetchLocationData method
class WeatherService {
  private baseURL: string;
  private apiKey: string;

  constructor() {
    this.baseURL = process.env.API_BASE_URL || '';
    this.apiKey = process.env.API_KEY || '';
  }
  
  private async fetchLocationData(query: string) {
    try {
      const response = await fetch(
        `${this.baseURL}/geo/1.0/direct?q=${query}&appid=${this.apiKey}`
      ); 
      const res = await response.json();
      return res[0] as Coordinates;

    } catch (err) {
      console.log('Error:', err);
      return err;
    }
  }
  // DONE: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates {
    const coordinates: Coordinates = {lat: locationData.lat, lon: locationData.lon};
    return coordinates;
  }
  
  async getWeatherForCity(city: string) {
    const locationData = await this.fetchLocationData(city);
    const coordinates = this.destructureLocationData(locationData as Coordinates);
    
    //const weatherQuery = this.buildWeatherQuery(city);
    
    try {
      const response = await fetch(
        `${this.baseURL}/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}`
      );
      const weatherData = await response.json();
      const currentWeather = this.parseCurrentWeather(weatherData);
      const forecastArray = this.buildForecastArray(weatherData.list);
      const data = {
        currentWeather, 
        forecastArray
      };
      // return this.parseCurrentWeather(weatherData);
      return data;
    } catch (err) {
      console.log('Error:', err);
      return err;
    }
  }
  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any) {
    const weatherObj = {
      city: response.city.name, 
      date: this._dateFormat(response.list[0].dt_txt), 
      icon: response.list[0].weather[0].icon, 
      iconDescription: response.list[0].weather[0].description, 
      tempF: this._tempConversion(response.list[0].main.temp), 
      windSpeed: response.list[0].wind.speed, 
      humidity: response.list[0].main.humidity
    }
    return weatherObj;
    
  }
  // Helper code to convert from Kelvin to Fer. 
  private _tempConversion(kelvin: number): string {
    return (((kelvin - 273.15) * 9/5) + 32).toFixed(2);
  }
  // // TODO: Complete buildForecastArray method
  private buildForecastArray(weatherData: any[]) {
    let array = [];
    const increment = this._incrementBy(weatherData[0].dt_txt)
    for (let i = 0+increment; i <= 39; i+=8){
      const forcastObj = {
        tempF: this._tempConversion(weatherData[i].main.temp), 
        date: this._dateFormat(weatherData[i].dt_txt), 
        icon: weatherData[i].weather[0].icon, 
        iconDescription: weatherData[i].weather[0].description, 
        windSpeed: weatherData[i].wind.speed, 
        humidity: weatherData[i].main.humidity,
        dt_txt: weatherData[i].dt_txt
      }
      array.push(forcastObj);
    } 
    return array;
  }
  // Helper code to format date to mm/dd/yyyy
  private _dateFormat(dateStr: string): string {
    let dateSplit = dateStr.split(' ');
    dateSplit = dateSplit[0].split('-');
    return `${dateSplit[1]}/${dateSplit[2]}/${dateSplit[0]}`
  }
  // Helper code to determine how many hours to increment by to reach next day in five day forecast
  private _incrementBy(timeStr: string): number {
    let timeSplit = timeStr.split(' ');
    timeSplit = timeSplit[1].split(':');
    const time = parseInt(timeSplit[0]);
    const increment = (24 - time) / 3
    return increment;
  }
};

export default new WeatherService();

// TODO: Create buildGeocodeQuery method
// private buildGeocodeQuery(): string {}

// // TODO: Create buildWeatherQuery method
// private buildWeatherQuery(coordinates: Coordinates): string {
  
// }
// // TODO: Create fetchAndDestructureLocationData method
// private async fetchAndDestructureLocationData() {}

// // TODO: Create fetchWeatherData method
// private async fetchWeatherData(coordinates: Coordinates) {}



// TODO: Complete getWeatherForCity method