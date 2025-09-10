import React from 'react';
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  icon?: React.ReactNode;
  className?: string;
}
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  onClick,
  type = 'button',
  disabled = false,
  icon,
  className = ''
}: ButtonProps) => {
  const baseStyles = 'rounded-lg font-medium transition-all duration-200 flex items-center justify-center';
  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-800',
    secondary: 'bg-green-600 text-white hover:bg-green-700 focus:ring-4 focus:ring-green-300 dark:bg-green-700 dark:hover:bg-green-800 dark:focus:ring-green-800',
    outline: 'bg-transparent text-blue-600 border border-blue-600 hover:bg-blue-50 focus:ring-4 focus:ring-blue-300 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-blue-950 dark:focus:ring-blue-800'
  };
  const sizeStyles = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-base px-5 py-2.5',
    lg: 'text-lg px-6 py-3'
  };
  const disabledStyles = disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer';
  const widthStyles = fullWidth ? 'w-full' : '';
  return <button type={type} className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${disabledStyles} ${className}`} onClick={onClick} disabled={disabled}>
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>;
};
export default Button;