import UserController from "../../controllers/user/user.controller.js";
import verifyJwt from "../../middleware/verifyJwt.js";
import express from "express";
const router = express.Router();

const userController = new UserController();
// router.use(verifyJwt);
router.route("/")
    .get(userController.getUsers)
    .post(userController.addUser);

router.delete("/:id", userController.deleteUser);
export default router