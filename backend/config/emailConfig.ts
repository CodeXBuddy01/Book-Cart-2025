import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();


// Create email otp credentials.
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((error, success) => {
    if(error) {
        console.log("Gmail Service is not ready to send the email, please check the email configuration")
    } else {
        console.log("Gmail Services is ready to send the email")
    }
})

const sendEmail = async (to:string, subject:string, body:string) => {
    await transporter.sendMail({
        from: `"Your BookBridge" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html:body
    })
}

// For Password Verification
export const sendVerificationToEmail = async(to:string, token:string) => {
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${token}`
    const html = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background-color: #f4f4f4;">
    <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
      <h2 style="color: #4A90E2; text-align: center;">Welcome to <span style="color: #000;">BookBridge 📚</span></h2>
      <p style="font-size: 16px; color: #333;">Hello 👋,</p>
      <p style="font-size: 16px; color: #333;">
        Thank you for registering with <strong>BookBridge</strong>. We're excited to have you on board!
      </p>
      <p style="font-size: 16px; color: #333;">
        To get started, please verify your email address by clicking the button below:
      </p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${verificationUrl}" style="background-color: #4A90E2; color: #fff; padding: 12px 24px; border-radius: 5px; text-decoration: none; font-size: 16px;">
          ✅ Verify Email Here
        </a>
      </div>
      <p style="font-size: 14px; color: #555;">
        If you did not request this registration, you can safely ignore this email.
      </p>
      <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
      <p style="font-size: 12px; color: #999; text-align: center;">
        &copy; ${new Date().getFullYear()} BookBridge. All rights reserved.
      </p>
    </div>
  </div>
`;

await sendEmail(to, 'Please Verify Your Email to Access Your BookBridge', html)

}

// For Reset Password
export const sendResetPasswordLinkToEmail = async(to:string, token:string) => {
    const resetPasswordUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`
    const html = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background-color: #f4f4f4;">
    <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
      <h2 style="color: #D9534F; text-align: center;">🔐 Password Reset Request</h2>
      <p style="font-size: 16px; color: #333;">Hello 👋,</p>
      <p style="font-size: 16px; color: #333;">
        We received a request to reset your password for your <strong>BookBridge</strong> account.
      </p>
      <p style="font-size: 16px; color: #333;">
        Click the button below to reset your password:
      </p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetPasswordUrl}" style="background-color: #D9534F; color: #fff; padding: 12px 24px; border-radius: 5px; text-decoration: none; font-size: 16px;">
          🔁 Reset Your Password
        </a>
      </div>
      <p style="font-size: 14px; color: #555;">
        If you didn’t request this, please ignore this email. Your account is safe.
      </p>
      <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
      <p style="font-size: 12px; color: #999; text-align: center;">
        &copy; ${new Date().getFullYear()} BookBridge. All rights reserved.
      </p>
    </div>
  </div>
`;


await sendEmail(to, 'Please Reset Your Password', html)

}