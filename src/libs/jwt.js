import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export function createAccesToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            TOKEN_SECRET,
            {
                expiresIn: "60min",
            },
            (err, token) => {
                if (err) {
                    return reject(err);
                }
                resolve(token);
            }
        );
    });
}