import { Schema, model } from 'mongoose';

const organizationSchema = new Schema({
  user: { type: Schema.Types.ObjectId, require: true },
  name: { type: String, require: true, unique: true },
  isActive: { type: Boolean, require: true, default: true },
}, { timestamps: { createdAt: 'created', updatedAt: 'updated' } });

const Oragnization = model('Organization', organizationSchema);

export default Oragnization;
