import express from "express";
import ToughtController from "../controllers/ToughtsController.js";

const router = express.Router();

router.get("/", ToughtController.showToughts);

export default router;
