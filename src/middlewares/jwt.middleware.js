import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {

    let token = req.headers.authorization;

    if (!token) {
        return res.status(401).send({ message: "No token Provided" });
    }

    token = token.split(" ")[1]

    try {

        const { email } = jwt.verify(token, process.env.TOKEN_SECRET);
        req.email = email
        next();
    } catch (error) {
        return res.status(400).send({ message: "Invalid token" });

    }


}