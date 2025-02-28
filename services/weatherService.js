import axios from "axios";

import Weather from "../models/weather.js";
import Alert from "../models/alert.js";
import City from "../models/city.js";

const API_KEY = process.env.WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

const fetchWeatherData = async () => {
  const cities = await City.find();

  for (let city of cities) {
    try {
      const response = await axios.get(
        `${BASE_URL}?q=${city.name}&appid=${API_KEY}&units=metric`
      );
      const { temp } = response.data.main;
      const condition = response.data.weather[0].description;

      console.log(`${city.name}: ${temp}°C, ${condition}`);

      const weatherEntry = new Weather({
        city: city.name,
        temperature: temp,
        condition,
      });
      await weatherEntry.save();

      checkWeatherAlerts(city.name, temp, condition);
    } catch (error) {
      console.error(
        `Error fetching weather for ${city.name}:`,
        error.message
      );
    }
  }
};

const checkWeatherAlerts = async (city, temp, condition) => {
  let alerts = [];

  if (condition.toLowerCase().includes("rain")) {
    alerts.push("Rain detected");
  }
  if (temp > 30) {
    alerts.push(`High temperature (${temp}°C)`);
  }
  if (temp < 10) {
    alerts.push(`Low temperature (${temp}°C)`);
  }

  for (let alertType of alerts) {
    console.log(`Alert: ${alertType} in ${city}`);
    const alert = new Alert({ city, alertType });
    await alert.save();
  }
};

export default fetchWeatherData