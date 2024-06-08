import React from 'react';

const Button = ({ children, onClick, className,  ...rest }) => {
  return (
    <button
      onClick={onClick}
      className={`text-white px-4 py-2 rounded-full focus:outline-none   ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;