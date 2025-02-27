import * as fs from 'fs';
import { uuid } from 'uuidv4';


// DONE: Define a City class with name and id properties
class City {
id: string;
name: string;

constructor(id: string, name: string) {
  this.id = id;
  this.name = name;
}
};


// // TODO: Complete the HistoryService class
class HistoryService {
  async getCities(): Promise<City []> {
    const cities = fs.readFileSync('./db/searchHistory.json').toString() 
    return JSON.parse(cities);
  }
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string) {
   let cities = await this.getCities();
    cities = cities.filter((cityObj) => cityObj.name.toLocaleLowerCase() !== city.toLocaleLowerCase())
        // cities = cities.filter((cityObj) => {
    //   if (cityObj.name.toLocaleLowerCase() !== city.toLocaleLowerCase()) {
    //     return cityObj;
    //   }
    //   return;
    // });
    let newCity = new City(uuid(), city); 
    cities.push(newCity)
    fs.writeFile('./db/searchHistory.json', JSON.stringify(cities), err => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('File written successfully!');
    });
  }
}
// * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
// async removeCity(id: string) {}

export default new HistoryService();
