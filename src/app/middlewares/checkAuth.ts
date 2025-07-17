import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/env";
import AppError from "../errorHelpers/AppError";
import { verifyToken } from "../utils/jwt"; 
import { User } from "../../modules/user/user.model";
// import httpStatus from "http-status-codes"
// import { IsActive, Role } from "../../modules/user/user.interface";

export const checkAuth = (...authRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {

    try {
        const accessToken = req.headers.authorization;

        if (!accessToken) {
            throw new AppError(403, "No Token Recieved")
        }


        const verifiedToken = verifyToken(accessToken, envVars.JWT_ACCESS_SECRET) as JwtPayload


            if (!authRoles.includes(verifiedToken.role)){
                throw new AppError(403, "Your are not permitted to view the route");
                
            }
        req.user = verifiedToken
        next()

    } catch (error) {
        console.log("jwt error", error);
        next(error)
    }
}