import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    permissions: [
        {
            type:"String",
        }
    ]
})


export default mongoose.model("Role", roleSchema);


/*

Dummy Data for testing

{
    "name": "admin",
    "description": "admin of the application",
    "permissions": [
        "create",
        "read",
        "update",
        "delete"
    ]
}

*/