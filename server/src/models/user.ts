import {Document, model, Schema} from "mongoose";

export interface User extends Document {
  fullName: string,
  issues: string[],
  status: string, // initial, done, issue
  updatedAt: Date
}

const UserSchema = new Schema({
  fullName: {type: String, required: true},
  issues: {type: [String], default: []},
  status: {type: String, default: 'initial'},
  updatedAt: {type: Date}
});

export default model<User>('User', UserSchema);
