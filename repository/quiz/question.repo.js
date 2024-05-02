import Question from "../../models/quiz/Question.js";
import Quiz from "../../models/quiz/Quiz.js";

class QuestionRepo {

    async addQuestion(question) {
        try {
            const quiz = await Quiz.findById(question.quiz);
            if (!quiz) {
                return {
                    data: {message: "Quiz not found",success: false},
                    status: 404
                }
            }
            const newQuestion = new Question(question);
            const result = await newQuestion.save();
            return {
                data: {...result, success: true},
                status: 201
            }
        } catch (error) {
            return {
                data: {message: error.message||"Question not created",success: false},
                status: 500
            }
        }
    }
    
    async getQuestions() {
        try {
            const result = await Question.find().populate("options");
            return {
                data: {result, success: true},
                status: 200,
            }
        } catch (error) {
            return {
                data: {message: error.message||"Something went wrong",success: false},
                status: 500
            }
        }
    }
    async deleteQuestion(id) {
        try {
            const result = await Question.deleteOne({ _id: id });
            return {
                data: {...result, success: true},
                status: 200
            }
        } catch (error) {
            return {
                data: {message: error.message||"Something went wrong",success: false},
                status: 500
            }
        }
    }

    async addOption(questionId, option) {
        try {
            const result = await Question.updateOne({_id: questionId}, {$push: {options: option}});
            return {
                data: {...result, success: true},
                status: 200
            }
        } catch (error) {
            return {
                data: {message: error.message||"Something went wrong",success: false},
                status: 500
            }
        }
    }
}
export default QuestionRepo;