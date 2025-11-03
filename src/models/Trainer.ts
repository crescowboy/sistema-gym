import { Schema, models, model } from "mongoose";

const TrainerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
  },
  specialization: {
    type: String,
  },
});

const Trainer = models.Trainer || model("Trainer", TrainerSchema);

export default Trainer;
