import { Schema, model } from 'mongoose';

const timingSchema = new Schema({
  user: { type: Schema.Types.ObjectId, require: true },
}, { timestamps: { createdAt: 'created' } });

const trackerSchema = new Schema({
  vehicleNumber: { type: String, require: true },
  organization: { type: Schema.Types.ObjectId, require: true },
  in: { type: timingSchema, require: true },
  out: { type: timingSchema, require: false },
}, { timestamps: { createdAt: 'created', updatedAt: 'updated' } });

const Tracker = model('Tracker', trackerSchema);

export default Tracker;
