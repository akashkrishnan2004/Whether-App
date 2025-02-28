import cron from "node-cron";
import fetchWeatherData from "../services/weatherService.js";

cron.schedule("*/1 * * * *", async () => {
  console.log(" Fetching latest weather data...");
  await fetchWeatherData();
});

export default cron;
