import Role from "../../models/user/Role.js";
import UserRepo from "../../repository/user/user.repo.js";

const userRepo = new UserRepo();

class UserController {

    async getUsers(req, res) {
        try {
            const result = await userRepo.get();
            res.status(result.status).json(result.data);
        } catch (error) {
            res.status(500).json({ message: error.message || "Something went wrong" });
        }
    }

    async addUser(req, res) {
        try {
            const { username, email, role } = req.body;
            const hasRole = await Role.findOne({ _id: role });
            if (!hasRole) {
               return res.status(400).json({ message: "Invalid role" });
            }

            if (!username || !email || !role) {
                res.status(400).json({ message: "Missing fields" });
            }

            const user = {
                username,
                email,
                role
            };
            const result = await userRepo.add(user);
            res.status(result.status).json(result.data);

        } catch (error) {
            res.status(500).json({ message: error.message || "Something went wrong" });
        }
    }

    async deleteUser(req, res) {
        try {
            const result = await userRepo.delete(req.params.id);
            res.status(result.status).json(result.data);
        } catch (error) {
            res.status(500).json({ message: error.message || "Something went wrong" });
        }
    }
}

export default UserController