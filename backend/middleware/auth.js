import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    // Retrieve token from headers
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from "Bearer <token>" format

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Not authorized. Please log in again.",
        });
    }

    try {
        // Verify token and extract user information
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user ID or other decoded info to the request object for further use
        req.body.userId = decodedToken.id;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error("Authentication Error:", error);

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                success: false,
                message: "Token expired. Please log in again.",
            });
        }

        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({
                success: false,
                message: "Invalid token. Please log in again.",
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error. Please try again later.",
        });
    }
};

export default authMiddleware;
