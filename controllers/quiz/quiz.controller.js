import QuizRepo from "../../repository/quiz/quiz.repo.js";

const quizRepo = new QuizRepo();

class QuizController {
    getAllQuizzes = async (req, res) => {
        try {
            const result = await quizRepo.get();
            res.status(result.status).json(result.data);
        } catch (error) {
            res.status(500).json({ message: error.message || "Something went wrong" });
        }
    }

    addQuiz = async (req, res) => {
        try {
            const {name, description, quizDate, duration} = req.body;
            if(!name || !description || !quizDate || !duration) {
                return res.status(400).json({message: "All fields are required"});
            }
            const quiz = {name, description, questions: [], quizDate, duration};
            const result = await quizRepo.add(quiz);
            res.status(result.status).json(result.data);
        } catch (error) {
            res.status(500).json({ message: error.message || "Something went wrong" });
        }
    }

    async deleteQuiz(req, res) {
        try {
            const result = await quizRepo.delete(req.params.id);
            res.status(result.status).json(result.data);
        } catch (error) {
            res.status(500).json({ message: error.message || "Something went wrong" });
        }
    }
}

export default QuizController