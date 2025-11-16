import mongoose, { Schema, Document } from "mongoose";

export interface IAdmin extends Document {
  name: string;
  email: string;
  password: string;
  superAdmin?: boolean;
}

const AdminSchema = new Schema<IAdmin>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    superAdmin: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model<IAdmin>("Admin", AdminSchema);
