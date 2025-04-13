import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface LoginProps {
  isLoginOpen: boolean;
  setIsLoginOpen: (open: boolean) => void;
}

interface LoginFormData {
  email: string;
  password: string;
}

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  agreeTerms: boolean;
}

interface ForgotPasswordFormData {
  email: string;
}

const AuthPage: React.FC<LoginProps> = ({ isLoginOpen, setIsLoginOpen }) => {
  const [currentTab, setCurrentTab] = useState<"login" | "signup" | "forgot">(
    "login"
  );
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);

  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    let interval: any;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginError },
  } = useForm<LoginFormData>();
  const {
    register: registerSignUp,
    handleSubmit: handleSignUpSubmit,
    formState: { errors: signupError },
  } = useForm<SignUpFormData>();
  const {
    register: registerForgotPassword,
    handleSubmit: handleForgotPasswordSubmit,
    formState: { errors: forgotPasswordError },
  } = useForm<ForgotPasswordFormData>();

  return (
    <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
      <DialogContent className="max-w-md w-full bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 space-y-6">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-2xl font-bold text-center text-gray-800">
            Welcome to <span className="text-green-600">Book Kart</span>
          </DialogTitle>
          <Tabs
            value={currentTab}
            onValueChange={(value) =>
              setCurrentTab(value as "login" | "signup" | "forgot")
            }
            className="space-y-4"
          >
            <TabsList className="w-full flex justify-center bg-gray-100 p-1 rounded-xl">
              <TabsTrigger
                value="login"
                className="w-full text-sm font-medium px-4 py-2 rounded-lg data-[state=active]:bg-green-600 data-[state=active]:text-white"
              >
                Login
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="w-full text-sm font-medium px-4 py-2 rounded-lg data-[state=active]:bg-green-600 data-[state=active]:text-white"
              >
                Sign Up
              </TabsTrigger>
              <TabsTrigger
                value="forgot"
                className="w-full text-sm font-medium px-4 py-2 rounded-lg data-[state=active]:bg-green-600 data-[state=active]:text-white"
              >
                Forgot
              </TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <TabsContent value="login" className="space-y-4">
                  <form className="space-y-4">
                    <div className="relative">
                      <Input
                        {...registerLogin("email", {
                          required: "Email is Required",
                        })}
                        placeholder="Enter Your Email"
                        type="email"
                        className="pl-10"
                      />
                      <Mail
                        className="absolute left-3 top-3 text-gray-400"
                        size={20}
                      />
                    </div>
                    {loginError.email && (
                      <p className="text-red-500 text-sm">
                        {loginError.email.message}
                      </p>
                    )}

                    <div className="relative">
                      <Input
                        {...registerLogin("password", {
                          required: "Password is Required",
                        })}
                        placeholder="Enter Your Password"
                        type={showPassword ? "text" : "password"}
                        className="pl-10 pr-10"
                      />
                      <Lock
                        className="absolute left-3 top-3 text-gray-400"
                        size={20}
                      />
                      {showPassword ? (
                        <EyeOff
                          className="absolute right-3 top-3 cursor-pointer text-gray-400"
                          size={20}
                          onClick={() => setShowPassword(false)}
                        />
                      ) : (
                        <Eye
                          className="absolute right-3 top-3 cursor-pointer text-gray-400"
                          size={20}
                          onClick={() => setShowPassword(true)}
                        />
                      )}
                    </div>
                    {loginError.password && (
                      <p className="text-red-500 text-sm">
                        {loginError.password.message}
                      </p>
                    )}

                    <Button type="submit" className="w-full">
                      {loginLoading ? <Loader2 size={20} /> : "Login"}
                    </Button>
                  </form>

                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-px bg-gray-300" />
                    <p className="text-sm text-gray-500">or</p>
                    <div className="flex-1 h-px bg-gray-300" />
                  </div>

                  <Button
                    variant="outline"
                    className="w-full flex items-center gap-2 justify-center"
                  >
                    {googleLoading ? (
                      <>
                        <Loader2 size={20} /> Login with Google...
                      </>
                    ) : (
                      <>
                        <Image
                          src="/icons/google.svg"
                          alt="google"
                          width={20}
                          height={20}
                        />{" "}
                        Login with Google
                      </>
                    )}
                  </Button>
                </TabsContent>

                <TabsContent value="signup" className="space-y-4">
                  <form className="space-y-4">
                    <div className="relative">
                      <Input
                        {...registerSignUp("name", {
                          required: "Name is Required",
                        })}
                        placeholder="Enter Your Name"
                        type="text"
                        className="pl-10"
                      />
                      <User
                        className="absolute left-3 top-3 text-gray-400"
                        size={20}
                      />
                    </div>
                    {signupError.name && (
                      <p className="text-red-500 text-sm">
                        {signupError.name.message}
                      </p>
                    )}

                    <div className="relative">
                      <Input
                        {...registerSignUp("email", {
                          required: "Email is Required",
                        })}
                        placeholder="Enter Your Email"
                        type="email"
                        className="pl-10"
                      />
                      <Mail
                        className="absolute left-3 top-3 text-gray-400"
                        size={20}
                      />
                    </div>
                    {signupError.email && (
                      <p className="text-red-500 text-sm">
                        {signupError.email.message}
                      </p>
                    )}

                    <div className="relative">
                      <Input
                        {...registerSignUp("password", {
                          required: "Password is Required",
                        })}
                        placeholder="Enter Your Password"
                        type={showPassword ? "text" : "password"}
                        className="pl-10 pr-10"
                      />
                      <Lock
                        className="absolute left-3 top-3 text-gray-400"
                        size={20}
                      />
                      {showPassword ? (
                        <EyeOff
                          className="absolute right-3 top-3 cursor-pointer text-gray-400"
                          size={20}
                          onClick={() => setShowPassword(false)}
                        />
                      ) : (
                        <Eye
                          className="absolute right-3 top-3 cursor-pointer text-gray-400"
                          size={20}
                          onClick={() => setShowPassword(true)}
                        />
                      )}
                    </div>
                    {signupError.password && (
                      <p className="text-red-500 text-sm">
                        {signupError.password.message}
                      </p>
                    )}

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="accent-green-600"
                        {...registerSignUp("agreeTerms", {
                          required: "You must agree to the terms of service",
                        })}
                      />
                      <label className="text-sm text-gray-600">
                        I agree to the Terms & Conditions
                      </label>
                    </div>
                    {signupError.agreeTerms && (
                      <p className="text-red-500 text-sm">
                        {signupError.agreeTerms.message}
                      </p>
                    )}

                    <Button type="submit" className="w-full">
                      {signupLoading ? <Loader2 size={20} /> : "Sign Up"}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="forgot">
                  {!forgotPasswordSuccess ? (
                    <form>
                      <div className="relative">
                        <Input
                          {...registerForgotPassword("email", {
                            required: "Email is Required",
                          })}
                          placeholder="Enter Your Email"
                          type="email"
                        />
                        <Mail
                          size={20}
                          className="absolute right-3 top-3 text-gray-400"
                        />
                      </div>
                      {forgotPasswordError.email && (
                        <p className="text-sm text-red-500 mt-1">
                          {forgotPasswordError.email.message}
                        </p>
                      )}

                      <Button type="submit" className="w-full mt-4">
                        {forgotPasswordLoading ? (
                          <Loader2 size={20} className="animate-spin" />
                        ) : (
                          "Send Reset Link"
                        )}
                      </Button>
                    </form>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center space-y-4"
                    >
                      <CheckCircle
                        className="text-green-600 mx-auto"
                        size={40}
                      />
                      <h3 className="text-xl font-semibold">Reset Link Sent</h3>
                      <p className="text-sm text-gray-600">
                        We've sent a password reset link to your email. Please
                        check your inbox and follow the instructions.
                      </p>
                      <Button
                        className="w-full"
                        onClick={() => {
                          setForgotPasswordSuccess(false);
                          setResendTimer(30);
                        }}
                        disabled={resendTimer > 0}
                      >
                        {resendTimer > 0
                          ? `Send Another Link in ${resendTimer}s`
                          : "Send Another Link"}
                      </Button>
                    </motion.div>
                  )}
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>

          <p className="text-xs text-gray-500 text-center">
            By clicking "Agree", you agree to our
            <Link
              href="/terms-of-use"
              className="text-green-600 ml-1 hover:underline"
            >
              Terms of Use
            </Link>
            ,
            <Link
              href="/privacy-policy"
              className="text-green-600 ml-1 hover:underline"
            >
              Privacy Policy
            </Link>
          </p>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AuthPage;
