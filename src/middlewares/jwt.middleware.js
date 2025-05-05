import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {

    let token = req.headers.authorization;

    if (!token) {
        return res.status(401).send({ message: "No token Provided" });
    }

    token = token.split(" ")[1]

    try {

        const { email, role } = jwt.verify(token, process.env.TOKEN_SECRET);
        req.email = email
        req.role = role
        next();
    } catch (error) {
        return res.status(401).send({ message: "Invalid token" });

    }
}

export const verifyAdmin = (req, res, next) => {
    if (req.role === 1) {
        return next()
    }
    return res.status(403).send({ message: "Access denied only for admin" });
}


export const verifyCoach = (req, res, next) => {
    if (req.role === 1 || req.role === 2) {
        return next()
    }
    return res.status(403).send({ message: "Access denied only for admin or coach" });
}