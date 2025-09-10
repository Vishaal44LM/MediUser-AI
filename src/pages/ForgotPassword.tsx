import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, PhoneIcon, KeyIcon } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
const ForgotPassword = () => {
  const [step, setStep] = useState<'phone' | 'otp' | 'success'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length < 10) {
      setError('Please enter a valid phone number');
      return;
    }
    setIsLoading(true);
    setError('');
    // Simulate API call to send OTP
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
    }, 1500);
  };
  const handleOtpChange = (value: string, index: number) => {
    if (value.length > 1) {
      value = value.slice(0, 1);
    }
    if (value && !/^\d+$/.test(value)) {
      return;
    }
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };
  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.some(digit => !digit)) {
      setError('Please enter the complete OTP');
      return;
    }
    setIsLoading(true);
    setError('');
    // Simulate API call to verify OTP
    setTimeout(() => {
      setIsLoading(false);
      setStep('success');
    }, 1500);
  };
  return <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 flex flex-col transition-colors duration-200">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm transition-colors duration-200">
        <div className="px-4 py-4 flex items-center">
          <Link to="/login" className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            <ArrowLeftIcon size={18} className="mr-2" />
            Back to Login
          </Link>
          <div className="mx-auto text-xl font-bold text-blue-600 dark:text-blue-400">
            Reset Password
          </div>
          <div className="w-10"></div> {/* Spacer for centering */}
        </div>
      </header>
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <Card className="w-full max-w-md">
          {step === 'phone' && <>
              <div className="flex justify-center mb-6">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                  <PhoneIcon size={24} className="text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <h1 className="text-xl font-bold text-gray-800 dark:text-white mb-2 text-center">
                Forgot your password?
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
                Enter your phone number to receive a verification code
              </p>
              <form onSubmit={handlePhoneSubmit}>
                <div className="mb-4">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Phone Number
                  </label>
                  <input id="phone" type="tel" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} placeholder="(555) 123-4567" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none" />
                  {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {error}
                    </p>}
                </div>
                <Button type="submit" fullWidth disabled={isLoading}>
                  {isLoading ? 'Sending code...' : 'Send verification code'}
                </Button>
              </form>
            </>}
          {step === 'otp' && <>
              <div className="flex justify-center mb-6">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                  <KeyIcon size={24} className="text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <h1 className="text-xl font-bold text-gray-800 dark:text-white mb-2 text-center">
                Enter verification code
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
                We've sent a 4-digit code to {phoneNumber}
              </p>
              <form onSubmit={handleOtpSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 text-center">
                    Enter OTP
                  </label>
                  <div className="flex justify-center space-x-3">
                    {[0, 1, 2, 3].map(index => <input key={index} id={`otp-${index}`} type="text" maxLength={1} value={otp[index]} onChange={e => handleOtpChange(e.target.value, index)} className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none" />)}
                  </div>
                  {error && <p className="mt-2 text-sm text-red-600 dark:text-red-400 text-center">
                      {error}
                    </p>}
                </div>
                <div className="mt-2 mb-6 text-center">
                  <button type="button" className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300" onClick={() => setStep('phone')}>
                    Didn't receive code? Resend
                  </button>
                </div>
                <Button type="submit" fullWidth disabled={isLoading}>
                  {isLoading ? 'Verifying...' : 'Verify'}
                </Button>
              </form>
            </>}
          {step === 'success' && <>
              <div className="flex justify-center mb-6">
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h1 className="text-xl font-bold text-gray-800 dark:text-white mb-2 text-center">
                Password Reset Email Sent
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
                We've sent password reset instructions to your email address.
              </p>
              <Link to="/login">
                <Button fullWidth>Return to Login</Button>
              </Link>
            </>}
        </Card>
      </div>
    </div>;
};
export default ForgotPassword;