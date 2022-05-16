import express from "express";
import auth from "../middleware/auth.js";
const router = express.Router();

import {
  createColl,
  getColls,
  getColl,
  getCollsByUser,
  updateColl,
  deleteColl,
  getCollsBySearch,
  likeColl,
} from "../controllers/coll.js";

router.get("/search", getCollsBySearch);
router.get("/", getColls);
router.get("/:id", getColl);

router.post("/", auth, createColl);
router.delete("/:id", auth, deleteColl);
router.patch("/:id", auth, updateColl);
router.get("/userColls/:id", auth, getCollsByUser);
router.patch("/like/:id", auth, likeColl);

export default router;
