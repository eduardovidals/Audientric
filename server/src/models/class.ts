import {Document, model, Schema} from "mongoose";
import UserSchema, {User} from "../models/user";

export interface Class extends Document {
  users: string[],
  status: string,
  hostId: string
}

const ClassSchema = new Schema({
  users: {type: [String], default: []},
  status: {type: String, default: 'initial'}, // initial, started, done
  hostId: {type: String, required: true}
});

export default model<Class>('Class', ClassSchema);
