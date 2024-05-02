import RoleController from "../../controllers/user/role.controller.js";
import express from "express";

const router = express.Router();

const roleController = new RoleController();

router.route("/")
    .get(roleController.getRoles)
    .post(roleController.addRole);

export default router
