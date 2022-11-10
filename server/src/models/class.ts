import {Document, model, Schema} from "mongoose";
import UserSchema, {User} from "../models/user";

export interface Class extends Document {
  users: string[],
  task: string,
  status: string,
  hostId: string
}

const ClassSchema = new Schema({
  users: {type: [String], default: []},
  task: {type: String},
  status: {type: String, default: 'initial', enum: ['initial', 'started', 'done']}, // initial, started, done
  hostId: {type: String, required: true}
});

export default model<Class>('Class', ClassSchema);
