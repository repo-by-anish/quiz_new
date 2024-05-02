import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
        required: true
    },
    verified:{
        type: Boolean,
        default: false
    }
})

export default mongoose.model("User", userSchema)


/*

Dummy Data for testing
{
    "username": "ABC Name",
    "email": "admin@abc.com",
    "role": ""
}

*/