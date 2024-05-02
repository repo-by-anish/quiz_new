import Quiz from "../../models/quiz/Quiz.js";

class QuizRepo {
    async add(quiz) {
        try {
            const newQuiz = new Quiz(quiz);
            const result = await newQuiz.save();
            return {
                data: {...result._doc, success: true},
                status: 201
            }
        } catch (error) {
            return {
                data: {message: error.message || "Quiz not created",success: false},
                status: 500
            }
        }
    }

    async get() {
        try {
            const result = await Quiz.find().populate({
                path: "questions",
                select: "-__v -_id -updatedAt -quiz",
                populate: {
                    path: "options",
                    select: "-__v -_id -updatedAt -question",
                },
            }).select(
                {
                    __v: 0,
                    _id: 0,
                    updatedAt: 0,
                },
            );
            return {
                data: {result, success: true},
                status: 200
            }
        } catch (error) {
            return {
                data: {message: error.message || "Something went wrong",success: false},
                status: 500
            }
        }
    }

    async delete(id) {
        try {
            const result = await Quiz.deleteOne({_id: id});
            return {
                data: {...result, success: true},
                status: 200
            }
        } catch (error) {
            return {
                data: {message: error.message || "Something went wrong",success: false},
                status: 500
            }
        }
    }

    async getById(id) {
        try {
            const result = await Quiz.findById(id);
            return {
                data: {...result, success: true},
                status: 200
            }
        } catch (error) {
            return {
                data: {message: error.message || "Something went wrong",success: false},
                status: 500
            }
        }
    }
    async addQuestion(quizId, questionId) {
        try {
            const result = await Quiz.updateOne({_id: quizId}, {$push: {questions: questionId}});
            return {
                data: {...result, success: true},
                status: 200
            }
        } catch (error) {
            return {
                data: {message: error.message || "Something went wrong",success: false},
                status: 500
            }
        }
    }
}

export default QuizRepo