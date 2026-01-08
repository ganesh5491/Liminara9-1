import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  Loader2,
  ArrowRight,
  Mail,
  KeyRound,
  ChevronLeft,
  Sparkles,
  Star,
  Shield,
  Truck,
} from "lucide-react";
const heroModel = "/banner/hero-model.jpg";
import { useAuth } from "@/contexts/AuthContext";

export default function OTPLogin() {
  const [step, setStep] = useState<"request" | "verify">("request");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const { toast } = useToast();
  const { login } = useAuth();

  useEffect(() => {
    if (step === "verify" && inputRefs.current[0]) {
      inputRefs.current[0]?.focus();
    }
  }, [step]);

  const handleRequestOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/request-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: email, method: 'email' }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send OTP');
      }

      toast({
        title: "OTP Sent",
        description: data.debugOtp
          ? `[Dev Mode] OTP is ${data.debugOtp}`
          : "A verification code has been sent to your email.",
      });

      setStep("verify");
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const otpString = otp.join("");
    if (otpString.length !== 6) return;

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: email, otp: otpString }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Verification failed');
      }

      if (data.token && data.user) {
        login(data.user, data.token);
      }

      toast({
        title: "Login Successful",
        description: "Welcome to Liminara!",
      });

      // Navigate to home page and force a clean reload to clear all parameters
      window.location.replace(window.location.origin + '/');
    } catch (err: any) {
      toast({
        title: "Verification Failed",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      // Handle paste
      const pastedData = value.slice(0, 6).split("");
      const newOtp = [...otp];
      pastedData.forEach((char, i) => {
        if (index + i < 6) newOtp[index + i] = char;
      });
      setOtp(newOtp);
      // Focus last filled or next empty
      const nextIndex = Math.min(index + pastedData.length, 5);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResendOTP = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/request-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: email, method: 'email' }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to resend OTP');
      }

      toast({
        title: "OTP Resent",
        description: data.debugOtp
          ? `[Dev Mode] New OTP is ${data.debugOtp}`
          : "A new verification code has been sent to your email.",
      });
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const badges = [
    { icon: Shield, text: "Dermatologist-Tested" },
    { icon: Star, text: "4.9★ Rating" },
    { icon: Sparkles, text: "Clean Beauty" },
    { icon: Truck, text: "Free Shipping" },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen p-4 sm:p-6 lg:p-10 bg-warmWhite font-sans">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row w-full max-w-6xl bg-white rounded-[2rem] shadow-2xl overflow-hidden min-h-[700px]"
      >
        {/* Left Side - Image Section */}
        <div className="relative w-full md:w-[60%] h-80 md:h-auto overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 hover:scale-105"
            style={{ backgroundImage: `url(${heroModel})` }}
          />
          <div className="absolute inset-0 bg-black/10" />

          <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center shadow-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-white tracking-[0.2em] drop-shadow-md">LIMINARA</span>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <span className="inline-block px-4 py-1.5 bg-white/25 backdrop-blur-md rounded-full text-[12px] font-bold text-white tracking-widest uppercase border border-white/20">
                  Glow Naturally
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-tight drop-shadow-xl">
                  Beauty <br /><span className="font-medium italic">Redefined</span>
                </h1>
              </div>

              <div className="flex flex-wrap gap-3">
                {badges.map((badge) => (
                  <div key={badge.text} className="flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-md rounded-full text-[11px] text-white border border-white/10 shadow-sm">
                    <badge.icon className="w-3.5 h-3.5" />
                    {badge.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Sign In Section */}
        <div className="w-full md:w-[40%] p-10 md:p-12 lg:p-14 flex flex-col justify-center bg-white relative">
          <AnimatePresence mode="wait">
            {step === "request" ? (
              <motion.div
                key="request"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-10"
              >
                <div className="space-y-3 text-center md:text-left">
                  <span className="text-[10px] font-black text-primary tracking-[0.3em] uppercase opacity-70">Member Access</span>
                  <h2 className="text-3xl md:text-4xl font-serif text-darkBrown font-medium leading-tight">
                    Sign in to your account
                  </h2>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Secure passwordless login. A code will be sent to your email.
                  </p>
                </div>

                <form onSubmit={handleRequestOTP} className="space-y-8">
                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 ml-1">
                      Email Address
                    </Label>
                    <div className="relative group">
                      <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-primary transition-all duration-300" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="hello@liminara.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="h-16 pl-14 rounded-2xl bg-gray-50/50 border-gray-100 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all duration-300 text-lg"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-16 rounded-2xl text-base font-bold bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20 transition-all duration-300 group active:scale-[0.98]"
                  >
                    {isLoading ? (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                      <>
                        Send Access Code
                        <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1.5 transition-transform" />
                      </>
                    )}
                  </Button>
                </form>

                <div className="space-y-8">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-50"></div>
                    </div>
                    <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-[0.3em]">
                      <span className="bg-white px-4 text-gray-300">Social Connect</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="h-14 rounded-2xl border-gray-100 hover:bg-gray-50 transition-all duration-300 gap-3 text-xs font-bold uppercase tracking-wider">
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                      </svg>
                      Google
                    </Button>
                    <Button variant="outline" className="h-14 rounded-2xl border-gray-100 hover:bg-gray-50 transition-all duration-300 gap-3 text-xs font-bold uppercase tracking-wider">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                      </svg>
                      GitHub
                    </Button>
                  </div>

                  <p className="text-center text-[11px] text-gray-400 font-medium tracking-wide">
                    New to Liminara?{" "}
                    <button className="text-primary font-black hover:underline ml-1">
                      Request Invitation
                    </button>
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="verify"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-12"
              >
                <button
                  onClick={() => setStep("request")}
                  className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 hover:text-primary transition-all duration-300"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Return
                </button>

                <div className="space-y-4">
                  <div className="w-16 h-16 rounded-[1.5rem] bg-primary/5 flex items-center justify-center mb-6 shadow-inner">
                    <KeyRound className="w-7 h-7 text-primary" />
                  </div>
                  <h2 className="text-4xl font-serif text-darkBrown font-medium leading-tight">
                    Confirm Identity
                  </h2>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Access code dispatched to <br /><span className="text-darkBrown font-bold underline decoration-primary/30 underline-offset-4">{email}</span>
                  </p>
                </div>

                <div className="space-y-10">
                  <div className="space-y-5">
                    <Label className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-300 ml-1">
                      6-Digit Access Code
                    </Label>
                    <div className="flex justify-between gap-3">
                      {otp.map((digit, index) => (
                        <motion.div
                          key={index}
                          whileFocus={{ scale: 1.05 }}
                          className="relative flex-1"
                        >
                          <input
                            ref={(el) => (inputRefs.current[index] = el)}
                            type="text"
                            inputMode="numeric"
                            maxLength={6}
                            value={digit}
                            onChange={(e) => handleOtpChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className="w-full h-16 text-center text-3xl font-serif rounded-xl bg-gray-50/50 border border-gray-100 focus:bg-white focus:ring-4 focus:ring-primary/5 focus:border-primary/20 transition-all duration-300 shadow-sm"
                          />
                          <AnimatePresence>
                            {digit && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                              />
                            )}
                          </AnimatePresence>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={() => handleVerifyOTP()}
                    disabled={isLoading || otp.join("").length !== 6}
                    className="w-full h-16 rounded-2xl text-base font-bold bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20 transition-all duration-300 active:scale-[0.98]"
                  >
                    {isLoading ? <Loader2 className="w-7 h-7 animate-spin mx-auto" /> : "Verify & Authorize"}
                  </Button>

                  <div className="text-center pt-2">
                    <p className="text-[11px] text-gray-300 mb-3 font-medium">Missing the code?</p>
                    <button
                      type="button"
                      onClick={handleResendOTP}
                      className="text-primary font-black hover:underline uppercase tracking-[0.2em] text-[10px] bg-primary/5 px-6 py-2.5 rounded-full transition-all hover:bg-primary/10"
                    >
                      Resend Now
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="absolute bottom-10 left-0 right-0 px-10 text-center">
            <p className="text-[9px] text-gray-300 uppercase font-bold tracking-[0.3em] leading-loose">
              Secure authentication protected by <br />
              <span className="text-gray-400">Liminara Privacy Systems &copy; 2026</span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
