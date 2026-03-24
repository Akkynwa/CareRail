import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  isLoading?: boolean;
}

export const Button = ({ 
  children, 
  variant = 'primary', 
  isLoading, 
  className, 
  ...props 
}: ButtonProps) => {
  const baseStyles = "px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50";
  
  const variants = {
    primary: "bg-[#0052FF] text-white hover:bg-[#0042CC] shadow-lg shadow-blue-500/20",
    secondary: "bg-[#10B981] text-white hover:bg-[#059669]",
    outline: "border-2 border-gray-200 text-gray-700 hover:border-[#0052FF] hover:text-[#0052FF]",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : children}
    </button>
  );
};