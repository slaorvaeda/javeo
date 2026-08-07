import React from "react";

export default function Button({
  children,
  variant = "primary",
  className = "",
  type = "button",
  disabled = false,
  onClick,
  ...props
}) {
  const baseStyles = "inline-flex items-center justify-center font-sans text-xs uppercase tracking-widest font-semibold transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-primary-brand disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-primary-brand text-white border border-primary-brand hover:bg-primary-brand-hover hover:border-primary-brand-hover shadow-sm px-6 py-3",
    secondary: "bg-foreground text-background border border-foreground hover:bg-foreground/90 px-6 py-3",
    outline: "bg-transparent text-foreground border border-foreground/30 hover:border-foreground hover:bg-foreground/5 px-6 py-3",
    ghost: "bg-transparent text-foreground hover:bg-foreground/5 px-4 py-2",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
