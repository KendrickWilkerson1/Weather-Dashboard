import { Router, type Request, type Response } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// DONE: POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  console.log('API Call')
  const {cityName} = req.body;
  if (req.body) {
    const weatherData = await WeatherService.getWeatherForCity(cityName);
    res.json(weatherData);
    HistoryService.addCity(cityName);
  } else {
    res.send('Error in getting city weather');
  }
  
  // DONE: GET weather data from city name
  // TODO: save city to search history
});

//   // DONE: GET weather data from city name
//   // TODO: save city to search history
// });
// TODO: GET search history
// router.get('/history', async (req: Request, res: Response) => {});

// * BONUS TODO: DELETE city from search history
// router.delete('/history/:id', async (req: Request, res: Response) => {});

export default router;
