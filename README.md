# Weather Dashboard


## User Story

```md
AS A traveler

I WANT to see the weather outlook for multiple cities

SO THAT I can plan a trip accordingly
```

## Acceptance Criteria

```md
GIVEN a weather dashboard with form inputs

WHEN I search for a city

THEN I am presented with current and future conditions for that city, and that city is added to the search history

WHEN I view current weather conditions for that city

THEN I am presented with the city name, the date, an icon representation of weather conditions, a description of the weather for the icon's alt tag, the temperature, the humidity, and the wind speed

WHEN I view future weather conditions for that city

THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity

WHEN I click on a city in the search history

THEN I am again presented with current and future conditions for that city
```

## Mock-Up

The following image shows the web application's appearance and functionality:

![The weather app includes a search option, a list of cities, and a 5-day forecast and current weather conditions for Atlanta ](./Assets/09-servers-and-apis-homework-demo.png)

## Getting Started

On the back end, the application should include a `searchHistory.json` file that will be used to store and retrieve cities using the `fs` module.

The following HTML route should be created:

* `GET *` should return the `index.html` file.

The following API routes should be created:

* `GET /api/weather/history` should read the `searchHistory.json` file and return all saved cities as JSON.

* `POST /api/weather` should receive a city name to save on the request body, add it to the `searchHistory.json` file, and then return associated weather data to the client. You'll need to find a way to give each city name a unique id when it's saved (look into npm packages that could do this for you).

Refer to the [Full-Stack Blog on deploying to Render](https://coding-boot-camp.github.io/full-stack/render/render-deployment-guide) and the [Render documentation on setting environment variables](https://docs.render.com/configure-environment-variables).

---

