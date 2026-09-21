import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = ({ className = '', ...props }: TextareaProps) => {
  return (
    <textarea 
      className={`w-full p-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${className}`}
      {...props}
    />
  );
};
