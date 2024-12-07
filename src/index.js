import express from "express"
import { PORT } from "./config.js"
import userRoutes from "./routes/user.routes.js"
import classRoutes from "./routes/class.routes.js"
import membershipsRoutes from "./routes/memberships.routes.js"
import morgan from "morgan";

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(userRoutes)
app.use(classRoutes)
app.use(membershipsRoutes)
app.listen(PORT)

console.log("Server on port: ", PORT)