const jwt = require('jsonwebtoken')


const AuthMiddleare = (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            return res.status(400).json({
                success: false,
                message: "Token Tidak Tersedia"
            })
        }
        const token = authHeader.split(" ")[1]
        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Format Token Salah"
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey");
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const AdminMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Token tidak ditemukan" });
    }
    jwt.verify(
        token,
        "secretkey",
        (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: "Token tidak valid" });
            }

            if (decoded.role_name !== "admin") {
                return res
                    .status(403)
                    .json({ message: "Akses ditolak, hanya untuk admin" });
            }

            req.user = decoded;
            next();
        }
    );
};


module.exports = { AuthMiddleare, AdminMiddleware }