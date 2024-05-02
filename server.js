import app from "./index.js";
import connectDB from "./config/db.js";

app.listen(5000, () => {
    connectDB();
    console.log("Server is running on port 5000");
})