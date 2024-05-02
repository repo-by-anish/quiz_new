import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    questions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Question"
        }
    ],
    quizDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    duration: {
        type: Number,
        required: true
    }
});

export default mongoose.model("Quiz", quizSchema);


/*

testing Data

{
    "name": "test",
    "description": "test",
    "quizDate": "2022-01-01T00:00:00.000Z",
    "duration": 1
}

"questions": [
        {
            "question": "test",
            "options": [
                {
                    "option": "test"
                },
                {
                    "option": "test"
                }
                }
            ],
            "questionWeight": 1
        }
    ],

*/