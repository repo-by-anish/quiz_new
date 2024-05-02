import User from "../../models/user/User.js";

class UserRepo {
    async get() {
        try {
            const result = await User.find();
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

    async add(user) {
        try {
            const newUser = new User(user);
            const result = await newUser.save();
            return {
                data: {...result._doc, success: true},
                status: 201
            }
        } catch (error) {
            return {
                data: {message: error.message || "User not created", success: false},
                status: 500
            }
        }
    }

    async delete(id) {
        try {
            const result = await User.deleteOne({_id: id});
            return {
                data: {...result, success: true},
                status: 200
            }
        } catch (error) {
            return {
                data: {message: error.message || "Something went wrong", success: false},
                status: 500
            }
        }
    }
}

export default UserRepo