import { Schema, models, model, Types } from "mongoose";

const SubscriptionSchema = new Schema({
  client: {
    type: Types.ObjectId,
    ref: 'Client',
    required: true,
  },
  plan: {
    type: String,
    enum: ['basic', 'premium', 'vip'],
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'expired', 'cancelled'],
    default: 'active',
  }
});

const Subscription = models.Subscription || model("Subscription", SubscriptionSchema);

export default Subscription;
