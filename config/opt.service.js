import nodemailer from "nodemailer";
import OTP from "../models/user/OTP.js";


const otpGenrator = () => {
    const otp = Math.floor(100000 + Math.random() * 900000)
    return otp
}

const otpSender = async (email) => {
    try {
        const otp = otpGenrator();
        let message = `Your OTP is ${otp}`;

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                type: "OAuth2",
                user: process.env.OPT_SENDER,
                clientId: process.env.OPT_CLIENT_ID,
                clientSecret: process.env.OPT_CLIENT_SECRET,
                refreshToken: process.env.OPT_REFRESH_TOKEN,
                accessToken: process.env.OPT_ACCESS_TOKEN,
                expires: 1484314697598,
            }
        })

        const mailOptions = {
            from: process.env.OPT_SENDER,
            to: email,
            subject: "OTP",
            text: message
        }

        const otpSender = new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, async (err, info) => {
                if (err) {
                    return reject(err)
                }
                if (info) {
                    const otpData = new OTP({
                        email: email,
                        otp: otp
                    })
                    await otpData.save();
                    setTimeout(async () => {
                        await OTP.deleteOne({ email: email })
                    }, 1000 * 60)
                    return resolve({
                        success: true
                    })
                }
            })
        })
        return await otpSender;
    } catch (error) {
        return {
            success: false,
            message: error.message || "Error in sending OTP"
        }
    }
}

export {
    otpSender
}