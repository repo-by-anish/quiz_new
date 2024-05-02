import express from "express";
import OptionController from "../../controllers/quiz/option.controller.js";

const router = express.Router();
const optionController = new OptionController();
router.post("/", optionController.addOption);

export default router