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
import { Eye, EyeOff, Loader2, Lock, Mail, User } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Welcome to Book Kart</DialogTitle>
          <Tabs
            value={currentTab}
            onValueChange={(value) =>
              setCurrentTab(value as "login" | "signup" | "forgot")
            }
          >
            <TabsList>
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
              <TabsTrigger value="forgot">Forgot</TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <TabsContent value="login">
                  <form>
                    <div className="relative">
                      <Input
                        {...registerLogin("email", {
                          required: "Email is Required",
                        })}
                        placeholder="Enter Your Email"
                        type="email"
                      />
                      <Mail size={20} />
                    </div>
                    {loginError.email && <p>{loginError.email.message}</p>}

                    <div className="relative">
                      <Input
                        {...registerLogin("password", {
                          required: "Password is Required",
                        })}
                        placeholder="Enter Your Password"
                        type={showPassword ? "text" : "password"}
                      />
                      <Lock size={20} />
                      {showPassword ? <EyeOff size={20} onClick={() => setShowPassword(false)}/> : <Eye size={20} onClick={() => setShowPassword(true)} />}
                    </div>
                    {loginError.password && <p>{loginError.password.message}</p>}

                    <Button type="submit">
                      {loginLoading ? (
                        <Loader2 size={20} />
                      ) : (
                        "Login"
                      )}
                    </Button>
                  </form>

                  <div>
                    <div></div>
                    <p>Or</p>
                    <div></div>
                  </div>
                  <Button>
                    <Image
                    src='/icons/google.svg'
                    alt="google"
                    width={20}
                    height={20}
                     />
                     Login with Google
                  </Button>
                </TabsContent>

                <TabsContent value="signup">
                <form>
                <div className="relative">
                      <Input
                        {...registerSignUp("name", {
                          required: "Name is Required",
                        })}
                        placeholder="Enter Your Name"
                        type="text"
                      />
                      <User size={20} />
                    </div>
                    {signupError.name && <p>{signupError.name.message}</p>}

                    <div className="relative">
                      <Input
                        {...registerSignUp("email", {
                          required: "Email is Required",
                        })}
                        placeholder="Enter Your Email"
                        type="email"
                      />
                      <Mail size={20} />
                    </div>
                    {signupError.email && <p>{signupError.email.message}</p>}

                    <div className="relative">
                      <Input
                        {...registerSignUp("password", {
                          required: "Password is Required",
                        })}
                        placeholder="Enter Your Password"
                        type={showPassword ? "text" : "password"}
                      />
                      <Lock size={20} />
                      {showPassword ? <EyeOff size={20} onClick={() => setShowPassword(false)}/> : <Eye size={20} onClick={() => setShowPassword(true)} />}
                    </div>
                    {signupError.password && <p>{signupError.password.message}</p>}

                    <div>
                      <input type="checkbox" 
                      {...registerSignUp('agreeTerms', {
                        required: "You must agree to the terms of service",
                      })}
                      />
                      <label htmlFor="">I agree to the Terms & Condition</label>
                    </div>
                      {signupError.agreeTerms && <p>{signupError.agreeTerms.message}</p>}

                    <Button type="submit">
                      {loginLoading ? (
                        <Loader2 size={20} />
                      ) : (
                        "Sign Up"
                      )}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="forgot">
                  <form>
                    <div className="relative">
                      <Input
                        {...registerLogin("email", {
                          required: "Email is Required",
                        })}
                        placeholder="Enter Your Email"
                        type="email"
                      />
                      <Mail size={20} />
                    </div>
                    {loginError.email && <p>{loginError.email.message}</p>}

                    <div className="relative">
                      <Input
                        {...registerLogin("password", {
                          required: "Password is Required",
                        })}
                        placeholder="Enter Your Password"
                        type={showPassword ? "text" : "password"}
                      />
                      <Lock size={20} />
                      {showPassword ? <EyeOff size={20} onClick={() => setShowPassword(false)}/> : <Eye size={20} onClick={() => setShowPassword(true)} />}
                    </div>
                    {loginError.password && <p>{loginError.password.message}</p>}

                    <Button type="submit">
                      {loginLoading ? (
                        <Loader2 size={20} />
                      ) : (
                        "Login"
                      )}
                    </Button>
                  </form>

                  <div>
                    <div></div>
                    <p>Or</p>
                    <div></div>
                  </div>
                  <Button>
                    <Image
                    src='/icons/google.svg'
                    alt="google"
                    width={20}
                    height={20}
                     />
                     Login with Google
                  </Button>
                </TabsContent>

                
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AuthPage;
