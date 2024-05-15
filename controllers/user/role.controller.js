import RoleRepo from "../../repository/user/role.repo.js";

const roleRepo = new RoleRepo();

class RoleController {
    async getRoles(req, res) {
        try {
            const result = await roleRepo.get();
            res.status(result.status).json(result.data);
        } catch (error) {
            res.status(500).json({ message: error.message || "Something went wrong" });
        }
    }

    async addRole(req, res) {
        try {
            const { name, description, permissions } = req.body;
            if (!name || !description || !permissions.length) {
                return {
                    data: { message: "Missing fields", success: false },
                    status: 400
                }
            }
            const role = { name, description, permissions };
            const result = await roleRepo.add(role);
            res.status(result.status).json(result.data);
        } catch (error) {
            res.status(500).json({ message: error.message || "Something went wrong" });
        }
    }
}

export default RoleController

