import * as fs from 'fs';

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
  // TODO: Define a read method that reads from the searchHistory.json file
  // private async read() {}
  // // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  // private async write(cities: City[]) {

  // }
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities(): Promise<City[]> {
    let cityArr: City[] = [];
    fs.readFile('./db/searchHistory.json', 'utf8', function (_, data) {
      // Display the file content
      console.log(data);
      const cities = JSON.parse(data);
      console.log('GET === cities', cities);
      cityArr = [...cities]
    });
    return cityArr;
  }
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string) {
    const cities = await this.getCities();
    console.log('cities', cities);
    let newCity = new City(city, city); 
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
