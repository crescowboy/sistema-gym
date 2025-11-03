import { Schema, models, model, Types } from "mongoose";

const ScheduleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  trainer: {
    type: Types.ObjectId,
    ref: 'Trainer',
  },
  dayOfWeek: {
    type: String,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    required: true,
  },
  startTime: {
    type: String, // e.g., "08:00"
    required: true,
  },
  endTime: {
    type: String, // e.g., "09:00"
    required: true,
  },
});

const Schedule = models.Schedule || model("Schedule", ScheduleSchema);

export default Schedule;
