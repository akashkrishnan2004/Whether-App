import express from "express"
import Weather from "../models/weather.js";
import City from "../models/city.js";

const router = express.Router();

// Get all weather data
router.get("/", async (req, res) => {
  const weatherData = await Weather.find().sort({ timestamp: -1 });
  res.json(weatherData);
});

// Add a new city
router.post("/cities", async (req, res) => {
  const { name } = req.body;
  const city = new City({ name });
  await city.save();
  res.json({ message: ` ${name} added to monitoring list` });
});

// Remove a city
router.delete("/cities/:city", async (req, res) => {
  const { city } = req.params;
  await City.deleteOne({ name: city });
  res.json({ message: ` ${city} removed from monitoring list` });
});

// module.exports = router;
export default router