import mongoose from "mongoose";

const collSchema = mongoose.Schema({
  title: String,
  description: String,
  topic: String,
  creator: String,
  tags: [String],
  items: [String],
  imageFile: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  likes: {
    type: [String],
    default: [],
  },
});

const CollModal = mongoose.model("Coll", collSchema);

export default CollModal;
