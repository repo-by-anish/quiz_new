import User from "../../models/user/User.js";
import jwt from "jsonwebtoken";
import { otpSender } from "../../config/opt.service.js";
import OTP from "../../models/user/OTP.js";

class AuthRepo {
    async login(email) {
        try{
            if (!email) {
                return {
                    data: {
                        message: "Email is required",
                        success: false
                    },
                    status: 400
                }
            }
    
            const user = await User.findOne({ email });
            if (!user) {
                return {
                    data: {
                        message: "User not found",
                        success: false
                    },
                    status: 404
                }
            }
            const otpRes=await otpSender(user.email);
            if (otpRes.success) {
                return {
                    data: {
                        message: "OTP sent successfully",
                        email: user.email,
                        success: true
                    },
                    status: 200
                }
            }else{
                return {
                    data: {
                        message: otpRes.message || "Something went wrong",
                        success: false
                    },
                    status: 500
                }
            }
        } catch (error) {
            return {
                data: {
                    message: error.message || "Something went wrong",
                    success: false
                },
                status: 500
            }
        }
    }

    async verifyOtp(email, otp) {
        try {
            if (!email) {
                return {
                    data: {
                        message: "Email is required",
                        success: false
                    },
                    status: 400
                }
            }
            if (!otp) {
                return {
                    data: {
                        message: "OTP is required",
                        success: false
                    },
                    status: 400
                }
            }

            const otpObj = await OTP.findOne({ email });
            if (!otpObj) {
                return {
                    data: {
                        message: "OTP Expired",
                        success: false
                    },
                    status: 404
                }
            }
            if (otpObj.otp !== otp) {
                return {
                    data: {
                        message: "Invalid OTP",
                        success: false
                    },
                    status: 400
                }
            }

            const user = await User.findOne({ email }).populate({
                path: "role",
                select: "-__v -_id -updatedAt",
            });
            if (!user) {
                return {
                    data: {
                        message: "No user found with the given email",
                        success: false
                    },
                    status: 404
                }
            }

            const accessToken = jwt.sign({ user }, process.env.ACCESS_SECRET, { expiresIn: "15m" });
            const refreshToken = jwt.sign({ user }, process.env.REFRESH_SECRET, { expiresIn: "30m" });
            await OTP.deleteOne({ email });
            return {
                data: {
                    accessToken,
                    refreshToken,
                    success: true
                },
                status: 200
            }
        } catch (error) {
            return {
                data: {
                    message: error.message || "Something went wrong",
                    success: false
                },
                status: 500
            }
        }
    }

    async refresh(refreshToken) {
        try{
            const decode = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
            const user = await User.findOne({ _id: decode.user._id });

            if (!user) {
                return {
                    data: {
                        message: "Unauthorized",
                        success: false
                    },
                    status: 404
                }
            }
            const accessToken = jwt.sign({ user: decode.user }, process.env.ACCESS_SECRET, { expiresIn: "30s" });

            return {
                data: {
                    accessToken,
                    success: true
                },
                status: 200
            }
        }catch(error){
            return {
                data: {
                    message: error.message || "Something went wrong",
                    success: false
                },
                status: 500
            }
        }
    }
}   

export default AuthRepo