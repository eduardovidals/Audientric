import {Document, model, Schema} from "mongoose";

export interface User extends Document {
  fullName: string,
  issues: string[],
  status: string, // initial, done, issue
}

const UserSchema = new Schema({
  fullName: {type: String, required: true},
  issues: [String],
  status: String
});

export default model<User>('user', UserSchema);
