import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz",
        required: true
    },
    question: {
        type: String,
        required: true
    },
    options: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Option"
        }
    ],
    questionWeight: {
        type: Number,
        required: true
    }
})

export default mongoose.model("Question", questionSchema);


/*

Dummy data for api testing

{
    "question": "test question",
    "questionWeight": 1
    "options": [
        
    ],
    "quiz": "63a5c0a8f0e0f0e0f0e0f0e0"
}

*/