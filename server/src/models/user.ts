import {Document, model, Schema} from "mongoose";

export interface User extends Document {
  fullName: string,
  issues: string[],
  status: string, // initial, done, issue
  answers: string[],
  updatedAt: Date
}

const UserSchema = new Schema({
  fullName: {type: String, required: true},
  issues: {type: [String], default: []},
  status: {type: String, default: 'initial', enum: ['initial', 'done', 'issue']},
  answers: {type: [String], default: []},
  updatedAt: {type: Date}
});

export default model<User>('User', UserSchema);
