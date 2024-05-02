import express from "express";
import QuizController from "../../controllers/quiz/quiz.controller.js";
const router = express.Router();

const quizController = new QuizController();

router.route("/")
.get(quizController.getAllQuizzes)
.post(quizController.addQuiz);
router.delete("/:id",quizController.deleteQuiz);

export default router