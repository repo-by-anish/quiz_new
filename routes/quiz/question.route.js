import express from "express";
import QuestionController from "../../controllers/quiz/question.controller.js";
const router = express.Router();

const questionController = new QuestionController();

router.post("/", questionController.addQuestion)
    .get("/", questionController.getQuestions)
    .delete("/:id", questionController.deleteQuestion);

export default router
