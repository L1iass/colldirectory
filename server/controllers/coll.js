import mongoose from "mongoose";
import CollModal from "../models/coll.js";

export const createColl = async (req, res) => {
  const coll = req.body;
  const newColl = new CollModal({
    ...coll,
    creator: req.userId,
    createAt: new Date().toISOString(),
  });

  try {
    await newColl.save();
    res.status(201).json(newColl);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getColls = async (req, res) => {
  try {
    const colls = await CollModal.find();
    res.status(200).json(colls);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getColl = async (req, res) => {
  const { id } = req.params;
  try {
    const coll = await CollModal.findById(id);
    res.status(200).json(coll);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getCollsByUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "User doesn`t exist" });
  }
  const userColls = await CollModal.find({ creator: id });
  res.status(200).json(userColls);
};

export const deleteColl = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ message: `No collection exist with id: ${id}` });
    }
    await CollModal.findByIdAndRemove(id);
    res.json({ message: "Collection deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const updateColl = async (req, res) => {
  const { id } = req.params;
  const { title, description, creator, imageFile, tags, items, topic } =
    req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ message: `No collection exist with id: ${id}` });
    }

    const updatedColl = {
      topic,
      creator,
      title,
      description,
      tags,
      items,
      imageFile,
      _id: id,
    };
    await CollModal.findByIdAndUpdate(id, updatedColl, { new: true });
    res.json(updatedColl);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getCollsBySearch = async (req, res) => {
  const { searchQuery } = req.query;
  try {
    const title = new RegExp(searchQuery, "i");
    const colls = await CollModal.find({ title });
    res.json(colls);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const likeColl = async (req, res) => {
  const { id } = req.params;
  try {
    if (!req.userId) {
      return res.json({ message: "User is not authenticated" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No tour exist with id: ${id}` });
    }

    const coll = await CollModal.findById(id);

    const index = coll.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
      coll.likes.push(req.userId);
    } else {
      coll.likes = coll.likes.filter((id) => id !== String(req.userId));
    }

    const updatedColl = await CollModal.findByIdAndUpdate(id, coll, {
      new: true,
    });

    res.status(200).json(updatedColl);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
