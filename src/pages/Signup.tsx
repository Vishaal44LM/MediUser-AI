import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, EyeIcon, EyeOffIcon } from 'lucide-react';
import Button from '../components/Button';
import { useUser } from '../contexts/UserContext';
const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    terms?: string;
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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const validateForm = () => {
    const newErrors: {
      name?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
      terms?: string;
    } = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!agreeToTerms) {
      newErrors.terms = 'You must agree to the Terms of Service';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        // Log the user in
        login({
          name: formData.name,
          email: formData.email
        });
        // Redirect to dashboard
        navigate('/dashboard');
      }, 1500);
    }
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
            Sign Up
          </div>
          <div className="w-10"></div> {/* Spacer for centering */}
        </div>
      </header>
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md w-full max-w-md transition-colors duration-200">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white mb-6 text-center transition-colors duration-200">
            Create your account
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-200">
                Full Name
              </label>
              <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-colors duration-200
                  ${errors.name ? 'border-red-500 focus:ring-red-200 dark:focus:ring-red-900' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-200 dark:focus:ring-blue-900 focus:border-blue-500 dark:focus:border-blue-500'}
                  dark:bg-gray-700 dark:text-white`} placeholder="John Doe" />
              {errors.name && <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.name}
                </p>}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-200">
                Email address
              </label>
              <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-colors duration-200
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
                <input id="password" name="password" type={showPassword ? 'text' : 'password'} value={formData.password} onChange={handleChange} className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-colors duration-200
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
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-200">
                Confirm Password
              </label>
              <div className="relative">
                <input id="confirmPassword" name="confirmPassword" type={showPassword ? 'text' : 'password'} value={formData.confirmPassword} onChange={handleChange} className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-colors duration-200
                    ${errors.confirmPassword ? 'border-red-500 focus:ring-red-200 dark:focus:ring-red-900' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-200 dark:focus:ring-blue-900 focus:border-blue-500 dark:focus:border-blue-500'}
                    dark:bg-gray-700 dark:text-white`} placeholder="••••••••" />
              </div>
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.confirmPassword}
                </p>}
            </div>
            <div className="flex items-center">
              <input id="terms" name="terms" type="checkbox" checked={agreeToTerms} onChange={e => setAgreeToTerms(e.target.checked)} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700" />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700 dark:text-gray-300 transition-colors duration-200">
                I agree to the{' '}
                <Link to="/terms" className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                  Terms
                </Link>
              </label>
            </div>
            {errors.terms && <p className="text-sm text-red-600 dark:text-red-400">
                {errors.terms}
              </p>}
            <Button type="submit" fullWidth disabled={isLoading} className="mt-6">
              {isLoading ? 'Creating account...' : 'Create account'}
            </Button>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200">
                  Log in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>;
};
export default Signup;