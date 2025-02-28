import mongoose from "mongoose"

const WeatherSchema = new mongoose.Schema({
  city: { type: String, required: true },
  temperature: { type: Number, required: true },
  condition: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const weather = mongoose.model("Weather", WeatherSchema);

export default weather;