import Option from "../../models/quiz/Option.js";
import Question from "../../models/quiz/Question.js";

export default class OptionRepo {
    async add(option) {
        try {
            const question = await Question.findById(option.question);
            if (!question) {
                return {
                    data: {message: "Question not found", success: false},
                    status: 404
                }
            }
            const duplicate = await Option.findOne({question: option.question, option: option.option});
            if (duplicate) {
                return {
                    data: {message: "Option already exists", success: false},
                    status: 409
                }
            }
            const newOption = new Option(option);
            const result = await newOption.save();
            return {
                data: {...result, success: true},
                status: 201
            }
        } catch (error) {
            return {
                data: {message: error.message || "Option not created", success: false},
                status: 500
            }
        }
    }
}