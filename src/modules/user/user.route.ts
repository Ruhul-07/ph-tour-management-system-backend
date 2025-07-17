import { Router } from "express";
import { UserControllers } from "./user.controller";
import { validateRequest } from "../../app/middlewares/validateRequest";
import { createUserZodSchema, updateUserZodSchema } from "./user.validation";
import { checkAuth } from "../../app/middlewares/checkAuth";
import { Role } from "./user.interface";

const router = Router()

router.post("/register", validateRequest(createUserZodSchema), UserControllers.createUser)
router.get("/all-users", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), UserControllers.getAllUser)
router.patch("/:id", validateRequest(updateUserZodSchema),checkAuth(...Object.values(Role)), UserControllers.updateUser)
// /api/v1/user/:id

export const UserRoutes = router;