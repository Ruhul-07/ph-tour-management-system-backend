import bcryptjs from "bcryptjs";
import httpStatus from "http-status-codes";
import { IUser } from "../user/user.interface"
import { User } from "../user/user.model";
import AppError from "../../app/errorHelpers/AppError";
import Jwt  from "jsonwebtoken";
import { generateToken } from "../../app/utils/jwt";
import { envVars } from "../../app/config/env";

const credentialsLogin = async (payload: Partial<IUser>) => {
      const { email, password } = payload;

      const isUserExist = await User.findOne({ email })

    if (!isUserExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "Email does not exist")
    }

    const isPasswordMatched = await bcryptjs.compare(password as string, isUserExist.password as string)

    if (!isPasswordMatched) {
        throw new AppError(httpStatus.BAD_REQUEST, "Incorrect Password")
    }

    const jwtPayload = {
        userId: isUserExist._id,
        email: isUserExist.email,
        role: isUserExist.role
    }

    const accessToken = generateToken(jwtPayload, envVars.JWT_ACCESS_SECRET, envVars.JWT_ACCESS_EXPIRES)

    return {
        // email: isUserExist.email
        accessToken
    }
}

export const authServices = {
    credentialsLogin
}