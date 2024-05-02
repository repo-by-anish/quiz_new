import QuestionRepo from "../../repository/quiz/question.repo.js";
import QuizRepo from "../../repository/quiz/quiz.repo.js";
const questionRepo = new QuestionRepo();
const quizRepo = new QuizRepo();

class QuestionController {
    async addQuestion(req, res) {
        try {
            const {question, quiz,questionWeight} = req.body;
            if(!question || !quiz||!questionWeight) {
                return res.status(400).json({message: "All fields are required"});
            }
            const questionObj = {question, options:[], questionWeight, quiz};
            const resultques = await questionRepo.addQuestion(questionObj);
            if(!resultques.data.success) {
                return res.status(resultques.status||500).json({message: resultques.data.message||"error in adding question"});
            }
            const resultquiz = await quizRepo.addQuestion(quiz, resultques.data._doc._id);
            if(!resultquiz.data.success) {
                return res.status(resultquiz.status||500).json({message: resultquiz.data.message||"error in adding question to quiz"});
            }
            res.status(resultquiz.status).json(resultquiz.data);
        } catch (error) {
            res.status(500).json({ message: error.message||"Something went wrong" });
        }
    }
    
    async getQuestions(req, res) {
        try {
            const result = await questionRepo.getQuestions();
            res.status(result.status).json(result.data);
        } catch (error) {
            res.status(500).json({ message: error.message||"Something went wrong" });
        }
    }

    async deleteQuestion(req, res) {
        try {
            const result = await questionRepo.deleteQuestion(req.params.id);
            res.status(result.status).json(result.data);
        } catch (error) {
            res.status(500).json({ message: error.message||"Something went wrong" });
        }
    }
}

export default QuestionController