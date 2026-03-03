import express from "express";
import {
  createDonor,
  deleteDonor,
  getAllDonors,
  getDonorById,
  updateDonor
} from "../controllers/donorController.js";

const router = express.Router();

router.get("/", getAllDonors);
router.get("/:id", getDonorById);
router.post("/", createDonor);
router.put("/:id", updateDonor);
router.delete("/:id", deleteDonor);

export default router;
