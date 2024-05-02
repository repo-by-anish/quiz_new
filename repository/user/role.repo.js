import Role from "../../models/user/Role.js";

class RoleRepo {
    async get() {
        try {
            const result = await Role.find();
            return {
                data: {result, success: true},
                status: 200
            }
        } catch (error) {
            return {
                data: {message: error.message || "Something went wrong", success: false},
                status: 500
            }
        }
    }
    async add(role) {
        try {
            const newRole = new Role(role);
            const result = await newRole.save();
            return {
                data: {...result._doc, success: true},
                status: 201
            }
        } catch (error) {
            return {
                data: {message: error.message || "Role not created", success: false},
                status: 500
            }
        }
    }
}

export default RoleRepo