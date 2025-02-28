import mongoose from "mongoose"

const CitySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});

const city = mongoose.model("City", CitySchema);

export default city;