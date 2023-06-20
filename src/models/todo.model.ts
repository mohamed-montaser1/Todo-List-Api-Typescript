import { model, Schema } from "mongoose";

type todoSchemaType = {
  title: string | { type: string; required: true };
  complated: boolean | { type: boolean; required: true };
};

let todoSchema = new Schema<todoSchemaType>(
  {
    title: String,
    complated: Boolean,
  },
  { timestamps: true }
);

export default model("Todo", todoSchema);
