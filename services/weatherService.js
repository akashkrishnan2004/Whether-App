import axios from "axios";
import dotenv from "dotenv";
import Weather from "../models/weather.js";
import Alert from "../models/alert.js";
import City from "../models/city.js";

dotenv.config();

const API_KEY = process.env.WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

const fetchWeatherData = async () => {
  try {
    const cities = await City.find();
    
    if (!cities.length) {
      console.log("No cities found to fetch weather data.");
      return;
    }

    for (let city of cities) {
      try {
        const response = await axios.get(`${BASE_URL}`, {
          params: {
            q: city.name,
            appid: API_KEY,
            units: "metric",
          },
        });

        const { temp } = response.data.main;
        const condition = response.data.weather[0].description;

        console.log(`${city.name}: ${temp}°C, ${condition}`);

        // Save weather data
        const weatherEntry = new Weather({
          city: city.name,
          temperature: temp,
          condition,
          timestamp: new Date(),
        });
        await weatherEntry.save();

        // Check for alerts
        await checkWeatherAlerts(city.name, temp, condition);
      } catch (error) {
        console.error(
          `Error fetching weather for ${city.name}: ${error.response?.data?.message || error.message}`
        );
      }
    }
  } catch (error) {
    console.error("Error fetching city list:", error.message);
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
    console.log(`⚠️ Alert: ${alertType} in ${city}`);

    const alert = new Alert({
      city,
      alertType,
      timestamp: new Date(),
    });
    await alert.save();
  }
};

export default fetchWeatherData;
