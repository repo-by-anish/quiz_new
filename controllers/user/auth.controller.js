import AuthRepo from "../../repository/user/auth.repo.js";

const authRepo = new AuthRepo();

class AuthController {
    async login(req, res) {
        try {
            const { email } = req.body;
            const result = await authRepo.login(email);
            res.status(result.status).json(result.data);
        } catch (error) {
            res.status(500).json({ message: error.message || "Something went wrong" });
        }
    }

    async verifyOtp(req, res) {
        try {
            const { email, otp } = req.body;
            const result = await authRepo.verifyOtp(email, otp);
            if (result.data.success) {
                res.cookie('refreshToken', result.data.refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    maxAge: 24 * 60 * 60 * 1000
                });
                res.status(result.status).json({ accessToken: result.data.accessToken });
            } else {
                res.status(result.status).json(result.data);
            }
        } catch (error) {
            res.status(500).json({ message: error.message || "Something went wrong" });
        }
    }

    async resendOtp(req, res) {
        try {
            const { email } = req.body;
            const result = await authRepo.login(email);
            res.status(result.status).json(result.data);
        } catch (error) {
            res.status(500).json({ message: error.message || "Something went wrong" });
        }
    }

    async refresh(req, res) {
        try {
            const cookies = req.cookies;
            if (!cookies.refreshToken) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            const result = await authRepo.refresh(cookies.refreshToken);

            res.status(result.status).json(result.data);

        } catch (error) {
            res.status(500).json({ message: error.message || "Something went wrong" });
        }
    }

    async logout(req, res) {
        try {
            const cookies = req.cookies;
            if (!cookies?.refreshToken) return res.sendStatus(204);
            res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'None', secure: true });
            res.json({ message: 'Cookie cleared' });
        } catch (error) {
            res.status(500).json({ message: error.message || "Something went wrong" });
        }
    }
}

export default AuthController