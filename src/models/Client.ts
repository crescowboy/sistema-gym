import { Schema, models, model } from "mongoose";

const ClientSchema = new Schema({
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
  membershipStatus: {
    type: String,
    enum: ['active', 'inactive', 'pending'],
    default: 'pending',
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
});

const Client = models.Client || model("Client", ClientSchema);

export default Client;
