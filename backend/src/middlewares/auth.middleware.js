import jwt from "jsonwebtoken";
import { jwtSecret } from "../config/env.js";

/**
 * Middleware: auth
 * - Verifies JWT token from Authorization header
 * - Attaches minimal user info to req.user
 * - Uses callback-style jwt.verify
 */
export const auth = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer")) {
        return res.status(401).json({ message: "Unauthorized user!" });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
            console.error("JWT verification failed:", err.message);
            return res.status(401).json({ message: "Unauthorized user!" });
        }

        req.user = { _id: decoded.id };
        next();
    });
};
