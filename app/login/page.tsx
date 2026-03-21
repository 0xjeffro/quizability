"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setShowVerification(true);
    }
  };

  const handleVerificationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle verification
    console.log("Verify:", verificationCode);
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] flex">
      {/* Left side - Login form */}
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        {/* Headline */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-serif italic text-white leading-tight mb-4">
            📑 Create. Learn & Share
          </h1>
          <p className="text-[#8b8b8b] text-xl font-serif italic">
            The quiz builder for modern educators.
          </p>
        </div>

        {/* Login card */}
        <div className="w-full max-w-lg rounded-2xl border border-[#232323] bg-[#141414] p-10">
          {!showVerification ? (
            /* Email input form */
            <form onSubmit={handleEmailSubmit}>
              {/* Google button */}
              <button
                type="button"
                className="w-full bg-[#1c1c1c] border-2 border-[#3a3a3a] text-white rounded-xl px-4 py-3.5 text-base font-semibold font-mono hover:bg-black hover:border-black transition-colors flex items-center justify-center gap-3 mb-4 cursor-pointer"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>

              {/* OR divider */}
              <div className="text-[#707070] text-center text-sm font-mono my-4">
                OR
              </div>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-[#1c1c1c] border-2 border-[#3a3a3a] rounded-xl px-4 py-3.5 text-white placeholder-[#606060] text-base font-medium font-mono focus:outline-none focus:border-[#505050] transition-colors mb-4"
              />

              <button
                type="submit"
                className="w-full bg-[#e8e6dc] text-[#0d0d0d] rounded-xl px-4 py-3.5 text-base font-semibold font-mono hover:bg-[#d8d6cc] transition-colors cursor-pointer"
              >
                Continue with email
              </button>

              <p className="text-[#707070] text-center text-xs font-mono tracking-tight mt-6">
                By continuing, you acknowledge Quizability&apos;s{" "}
                <a href="#" className="text-[#909090] underline hover:text-white">
                  Privacy Policy
                </a>
                .
              </p>
            </form>
          ) : (
            /* Verification code form */
            <form onSubmit={handleVerificationSubmit}>
              <p className="text-[#a0a0a0] text-center text-base font-bold font-mono mb-2">
                Enter verification code
              </p>
              <p className="text-[#707070] text-center text-xs font-mono tracking-tight mb-6">
                We sent a code to{" "}
                <span className="text-[#a0a0a0]">{email}</span>
              </p>

              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="Enter verification code"
                className="w-full bg-[#1c1c1c] border-2 border-[#3a3a3a] rounded-xl px-4 py-3.5 text-white placeholder-[#606060] text-base font-medium font-mono focus:outline-none focus:border-[#505050] transition-colors mb-4"
              />

              <button
                type="submit"
                className="w-full bg-[#e8e6dc] text-[#0d0d0d] rounded-xl px-4 py-3.5 text-base font-semibold font-mono hover:bg-[#d8d6cc] transition-colors cursor-pointer"
              >
                Verify Email Address
              </button>

              <p className="text-[#707070] text-center text-xs font-mono tracking-tight mt-6">
                Not seeing the email?{" "}
                <button
                  type="button"
                  className="text-[#909090] underline hover:text-white cursor-pointer"
                >
                  Try sending again
                </button>
              </p>
            </form>
          )}
        </div>

        {/* Back button when in verification mode */}
        {showVerification && (
          <button
            onClick={() => setShowVerification(false)}
            className="mt-4 text-[#707070] text-sm font-mono hover:text-white transition-colors cursor-pointer"
          >
            ← Back to email
          </button>
        )}
      </div>

    </div>
  );
}
