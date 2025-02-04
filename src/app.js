import express from "express";
import userRoutes from "./routes/user.routes.js"
import classRoutes from "./routes/class.routes.js"
import membershipsRoutes from "./routes/type_memberships.routes.js"
import inventoryRoutes from "./routes/inventory.routes.js"
import authRoutes from "./routes/auth.routes.js"
import recovPassword from "./routes/recovPassword.routes.js"
import dashboard from "./routes/dashboard.routes.js"
import staff from "./routes/staff.routes.js"
import exercises from "./routes/exercise.routes.js"
import routines from "./routes/routine.routes.js"
import payments from "./routes/payment.routes.js"
import morgan from "morgan";

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(userRoutes)
app.use(classRoutes)
app.use(membershipsRoutes)
app.use(inventoryRoutes)
app.use(authRoutes)
app.use(recovPassword)
app.use(dashboard)
app.use(staff)
app.use(exercises)
app.use(routines)
app.use(payments)


export default app;