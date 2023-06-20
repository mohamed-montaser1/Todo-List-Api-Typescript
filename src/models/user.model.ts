import { model, Schema } from "mongoose";

export type userSchemaType = {
  name: { type: string; required: boolean } | string;
  email: { type: string; unique: boolean; required: boolean } | string;
  password: { type: string; minlength: number; required: boolean } | string;
};

let todoSchema = new Schema<userSchemaType>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      minlength: 10,
      required: true,
    },
  },
  { timestamps: true }
);

export default model("User", todoSchema);
