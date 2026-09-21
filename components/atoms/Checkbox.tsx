import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Checkbox = ({ label, className = '', ...props }: CheckboxProps) => {
  return (
    <label className="flex items-center space-x-2 cursor-pointer group">
      <input 
        type="checkbox" 
        className="w-4 h-4 rounded border-border text-primary focus:ring-primary transition-all group-hover:scale-105"
        {...props}
      />
      <span className="text-sm text-foreground/80 group-hover:text-primary transition-colors">{label}</span>
    </label>
  );
};
