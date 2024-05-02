import OptionRepo from "../../repository/quiz/option.repo.js";
import QuestionRepo from "../../repository/quiz/question.repo.js";
const optionRepo = new OptionRepo();
const questionRepo = new QuestionRepo();

class OptionController {
    async addOption(req, res) {
        try {
            const { question } = req.body;
            if (!question) {
                return res.status(400).json({ message: "Not getting question" });
            }
            const resultOpt = await optionRepo.add(req.body);
            if (!resultOpt.data.success) {
                return res.status(resultOpt.status || 500).json({ message: resultOpt.data.message || "Error in adding option" });
            }
            const resultQues = await questionRepo.addOption(question, resultOpt.data._doc._id);
            if (!resultQues.data.success) {
                return res.status(resultQues.status || 500).json({ message: resultQues.data.message || "Error in adding option to question" });
            }
            return res.status(resultQues.status).json(resultQues.data);
        } catch (error) {
            return res.status(500).json({ message: error.message || "Something went wrong" });
        }
    }
}

export default OptionController;