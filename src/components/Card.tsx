import React from 'react';
interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}
const Card = ({
  children,
  title,
  className = ''
}: CardProps) => {
  return <div className={`p-4 rounded-lg shadow-sm ${className}`}>
      {title && <h2 className="text-lg font-medium mb-4 dark:text-white">{title}</h2>}
      {children}
    </div>;
};
export default Card;