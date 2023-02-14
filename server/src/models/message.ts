import { model, Schema } from "mongoose";

const messageSchema = new Schema({
  message: {
    type: {
      iv: String,
      content: String,
    },
    required: true,
  },
  author: {
    type: String,
    required: false,
    default: "Unknown",
  },
  password: {
    type: String,
    required: false,
  },
  views: {
    type: Number,
    required: false,
    default: 0,
  },
  maxViews: {
    type: Number,
    required: false,
    default: 1,
  },
  isEditableByOther: {
    type: Boolean,
    required: false,
    default: false,
  },
  code: {
    type: String,
    required: true,
  },
  date: { type: Number, required: true },
});

export default model("messages", messageSchema);
