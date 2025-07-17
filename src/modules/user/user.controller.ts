import { NextFunction, Request, Response } from "express";
// import { User } from "./user.model";
import httpStatus from "http-status-codes";
import { UserServices } from "./user.service";
import { catchAsync } from "../../app/utils/catchAsync";
import { sendResponse } from "../../app/utils/sendResponse";
import { envVars } from "../../app/config/env";
import { verifyToken } from "../../app/utils/jwt";
// import AppError from "../../app/errorHelpers/AppError";

// const createUser = async(req: Request, res: Response, next: NextFunction) => {
//     try {
//         // throw new AppError(600, "my error")
//         // const {name, email} = req.body;
//         // const user = await User.create({
//         //     name,
//         //     email
//         // })


//         const user = await UserServices.createUser(req.body)

//         res.status(httpStatus.CREATED).json({
//             message: "User Created Successfully",
//             user
//         })
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     } catch (err:any) {
//         // eslint-disable-next-line no-console
//         console.log(err);
//         next(err)
//     }
// }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserServices.createUser(req.body);

    //  res.status(httpStatus.CREATED).json({
    //         message: "User Created Successfully",
    //         user
    //     })

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User Created Successfully",
        data: user,
    })
})

const updateUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    // const token = req.headers.authorization
    // const verifiedToken = verifyToken(token as string, envVars.JWT_ACCESS_SECRET) as JwtPayload

    const verifiedToken = req.user;
    
    const payload = req.body
    const user = await UserServices.updateUser(userId, payload, verifiedToken as JwtPayload)

    // res.status(httpStatus.CREATED).json({
    //     message: "User Created Successfully",
    //     user
    // })

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User Updated Successfully",
        data: user,
    })
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getAllUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await UserServices.getAllUser()
    //  res.status(httpStatus.OK).json({
    //     success: true,
    //     message: "All Users Retrieved Successfully",
    //     data: users
    // })

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "All Users Retrieved Successfully",
        data: result.data,
        meta: result.meta
    })
})

export const UserControllers = {
    createUser,
    getAllUser,
    updateUser
}