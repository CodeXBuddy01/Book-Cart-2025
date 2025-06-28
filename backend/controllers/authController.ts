import { Request, Response } from "express";
import User from "../models/User";
import { response } from "../utils/responseHandler";
import crypto from "crypto";
import {
  sendResetPasswordLinkToEmail,
  sendVerificationToEmail,
} from "../config/emailConfig";
import { generateToken } from "../utils/generateToken";


// REgister User
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, agreeTerms } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return response(res, 400, "User already exists");
    }

    const varificationToken = crypto.randomBytes(20).toString("hex");
    const user = new User({
      name,
      email,
      password,
      agreeTerms,
      varificationToken,
    });
    await user.save();

    const result = await sendVerificationToEmail(user.email, varificationToken);
    return response(
      res,
      200,
      "User register successfully, Please check your email box to verify your account"
    );
  } catch (error) {
    console.log(error);
    return response(res, 500, "Internal Server Error, Please Try Again");
  }
};


//Email Verified
export const verifyEmail = async (req: Request, res: Response) => {
  try {
    // const token = req.params.token; // ✅ req.params is an object, use req.params.token
    const token = req.params; // ✅ req.params is an object, use req.params.token

    if (!token) {
      return response(res, 400, "Verification token is required");
    }

    const user = await User.findOne({ verificationToken: token }); // ✅ spelling fix: verificationToken

    if (!user) {
      return response(res, 400, "Invalid or expired verification token");
    }

    user.isVerified = true;
    user.verificationToken = undefined; // ✅ spelling fix again

    const accessToken = generateToken(user);
    res.cookie("access_token", accessToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    await user.save(); // ✅ don't forget to save changes

    return response(res, 200, "Email verified successfully");
  } catch (error) {
    console.error(error);
    return response(res, 500, "Internal Server Error, Please Try Again");
  }
};

// Login User
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return response(res, 400, "Invalid email or password");
    }

    if (!user.isVerified) {
      return response(
        res,
        400,
        "Please Verify your email before logging. Check your email inbox to verify"
      );
    }

    const accessToken = generateToken(user);
    res.cookie("access_token", accessToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return response(res, 200, "User logged in Successfully", {
      user: { name: user.name, email: user.email },
    });
  } catch (error) {
    console.error(error);
    return response(res, 500, "Internal Server Error, Please Try Again");
  }
};


//Forgot Password
export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return response(res, 400, "No Account found with this email address");
    }

    const resetPasswordToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpires = new Date(Date.now() + 3600000);
    await user.save();

    await sendResetPasswordLinkToEmail(user.email, resetPasswordToken);

    return response(
      res,
      200,
      "A password link has been send to your email address"
    );
  } catch (error) {
    console.error(error);
    return response(res, 500, "Internal Server Error, Please Try Again");
  }
};

// Reset Password
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const token = req.params; // ✅ req.params is an object, use req.params.token
    const {newPassword} = req.body;

    const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: {$gt : Date.now()}}); // ✅ spelling fix: verificationToken

    if (!user) {
      return response(res, 400, "Invalid or expired reset password token");
    }

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    const accessToken = generateToken(user);
    res.cookie("access_token", accessToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    await user.save(); // ✅ don't forget to save changes

    return response(res, 200, "Your Password reset successfully. You can now login with your new Password.");
  } catch (error) {
    console.error(error);
    return response(res, 500, "Internal Server Error, Please Try Again");
  }
};

//logout
export const logout = async(req:Request, res:Response) => {
  try {
    res.clearCookie("access_token", {
      httpOnly: true
    })
    return response(res, 200, 'Successfully logged out.')
  } catch (error) {
    console.error(error);
    return response(res, 500, "Internal Server Error, Please Try Again");
  }
}

//Verify Auth
export const checkUserAuth = async(req:Request, res:Response) => {
  try {
    const userId = req?.id;
    if(!userId){
      return response(res, 400, 'Unauthenticated please login to access our data')
    }

    const user = await User.findById(userId).select('-password -varificationToken -resetPasswordToken -resetPasswordExpires')

    if(!user){
      return response(res, 403, 'User Not Found')
    }
    return response(res, 201, 'User retrived Successfully', user)
  } catch (error) {
    console.error(error);
    return response(res, 500, "Internal Server Error, Please Try Again");
  }
}