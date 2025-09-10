import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, EyeIcon, EyeOffIcon } from 'lucide-react';
import Button from '../components/Button';
import { useUser } from '../contexts/UserContext';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    login,
    isAuthenticated
  } = useUser();
  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);
  // Check if there are stored credentials on component mount
  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    const savedRememberMe = localStorage.getItem('rememberMe') === 'true';
    if (savedEmail && savedRememberMe) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);
  const validateForm = () => {
    const newErrors: {
      email?: string;
      password?: string;
    } = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      // Handle "Remember me" functionality
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
        localStorage.setItem('rememberMe', 'true');
      } else {
        localStorage.removeItem('rememberedEmail');
        localStorage.setItem('rememberMe', 'false');
      }
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        // Extract name from email for demo purposes
        const name = email.split('@')[0];
        // Log the user in
        login({
          name,
          email
        });
        // Redirect to dashboard
        navigate('/dashboard');
      }, 1500);
    }
  };
  const handleRememberMeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.target.checked);
  };
  return <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 flex flex-col transition-colors duration-200">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm transition-colors duration-200">
        <div className="px-4 py-4 flex items-center">
          <Link to="/" className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            <ArrowLeftIcon size={18} className="mr-2" />
            Back
          </Link>
          <div className="mx-auto text-xl font-bold text-blue-600 dark:text-blue-400">
            Login
          </div>
          <div className="w-10"></div> {/* Spacer for centering */}
        </div>
      </header>
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md w-full max-w-md transition-colors duration-200">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white mb-6 text-center transition-colors duration-200">
            Log in to your account
          </h1>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-200">
                Email address
              </label>
              <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-colors duration-200
                  ${errors.email ? 'border-red-500 focus:ring-red-200 dark:focus:ring-red-900' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-200 dark:focus:ring-blue-900 focus:border-blue-500 dark:focus:border-blue-500'}
                  dark:bg-gray-700 dark:text-white`} placeholder="you@example.com" />
              {errors.email && <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.email}
                </p>}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-200">
                Password
              </label>
              <div className="relative">
                <input id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-colors duration-200
                    ${errors.password ? 'border-red-500 focus:ring-red-200 dark:focus:ring-red-900' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-200 dark:focus:ring-blue-900 focus:border-blue-500 dark:focus:border-blue-500'}
                    dark:bg-gray-700 dark:text-white`} placeholder="••••••••" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
                  {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.password}
                </p>}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" checked={rememberMe} onChange={handleRememberMeChange} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700" />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300 transition-colors duration-200">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200">
                  Forgot?
                </Link>
              </div>
            </div>
            <Button type="submit" fullWidth disabled={isLoading} className="mt-6">
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200">
                Don't have an account?{' '}
                <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>;
};
export default Login;