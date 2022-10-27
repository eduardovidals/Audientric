import m2s from 'mongoose-to-swagger'
import User from "../models/user";
import Class from "../models/class";

export default {
  user: m2s(User),
  class: m2s(Class)
}
