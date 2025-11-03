import { Schema, models, model, Types } from "mongoose";

const PaymentSchema = new Schema({
  client: {
    type: Types.ObjectId,
    ref: 'Client',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['completed', 'pending', 'failed'],
    default: 'pending',
  }
});

const Payment = models.Payment || model("Payment", PaymentSchema);

export default Payment;
