import { Router } from "express";
import { createUser, signIn } from "../controllers/UserController.js";

const userRouter = Router();

userRouter.post("/signup", createUser);
userRouter.post("/signin", signIn);

export default userRouter;
