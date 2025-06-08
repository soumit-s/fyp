'use client'

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

export default function ForgotPassword() {
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');

  const handleEmailSubmit = () => {
    // pretend to send OTP
    setStep('otp');
  };

  const handleOtpSubmit = () => {
    // pretend OTP is valid
    alert('Password reset process continues...');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow w-96 space-y-4">
        <h2 className="text-xl font-semibold text-center">Forgot Password</h2>

        {step === 'email' ? (
          <>
            <Input placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button onClick={handleEmailSubmit} className="w-full bg-blue-600 text-white py-2 rounded">Send OTP</button>
          </>
        ) : (
          <>
            <Input placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
            <button onClick={handleOtpSubmit} className="w-full bg-green-600 text-white py-2 rounded">Verify OTP</button>
          </>
        )}

        <Link href="/login" className="text-blue-500 text-sm hover:underline block text-center mt-2">Back to Login</Link>
      </div>
    </div>
  );
}
