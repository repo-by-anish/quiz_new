import mongoose from "mongoose";

const optionSchema = new mongoose.Schema({
    question:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question"
    },
    option: {
        type: String,
        required: true
    },
    isCorrect: {
        type: Boolean,
        default: false
    }
});

export default mongoose.model("Option", optionSchema);


/*

Dummy Data for testing

{
    "question": "",
    "option": "Option 1",
    "isCorrect": true
}

*/