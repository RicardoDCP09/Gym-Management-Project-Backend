import express from "express";
import userRoutes from "./routes/user.routes.js"
import classRoutes from "./routes/class.routes.js"
import membershipsRoutes from "./routes/type_memberships.routes.js"
import inventoryRoutes from "./routes/inventory.routes.js"
import authRoutes from "./routes/auth.routes.js"
import recovPasswordRoutes from "./routes/recovPassword.routes.js"
import dashboardRoutes from "./routes/dashboard.routes.js"
import staffRoutes from "./routes/staff.routes.js"
import exercisesRoutes from "./routes/exercise.routes.js"
import routinesRoutes from "./routes/routine.routes.js"
import paymentsRoutes from "./routes/payment.routes.js"
import progressRoutes from "./routes/progress.routes.js"
import reportRoutes from "./routes/report.routes.js"
import roles from "./routes/role.routes.js"
import statusclass from "./routes/statusclass.routes.js"
import userroles from "./routes/userroles.routes.js"
import statusinventory from "./routes/statusinventory.routes.js"
import statuspayment from "./routes/statuspay.routes.js"
import methodspay from "./routes/methodpay.routes.js"
import routinedifficulty from "./routes/routinedifficulty.routes.js"
import typexercise from "./routes/typexercise.routes.js"
import reportype from "./routes/typereport.routes.js"
// Imports ORM
import userorm from "./routes/userorm.routes.js"
import morgan from "morgan";
import cors from 'cors';



const app = express();
app.use(cors({
    origin: '*',
    credentials: true,
}));
app.use(express.json());
app.use(morgan('dev'));
app.use(userRoutes)
app.use(classRoutes)
app.use(membershipsRoutes)
app.use(inventoryRoutes)
app.use(authRoutes)
app.use(recovPasswordRoutes)
app.use(dashboardRoutes)
app.use(staffRoutes)
app.use(exercisesRoutes)
app.use(routinesRoutes)
app.use(paymentsRoutes)
app.use(progressRoutes)
app.use(reportRoutes)
app.use(roles)
app.use(statusclass)
app.use(userroles)
app.use(statusinventory)
app.use(statuspayment)
app.use(methodspay)
app.use(routinedifficulty)
app.use(typexercise)
app.use(reportype)
// Imports ORM 
app.use(userorm)


export default app;