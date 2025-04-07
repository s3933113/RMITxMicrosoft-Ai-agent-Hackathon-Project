
import React from "react";

export const FileSparkles = ({ 
  size = 24, 
  color = "currentColor", 
  className = "", 
  ...props 
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M8.5 10.5l1.5 1.5-1.5 1.5" />
      <path d="M15.5 13.5l-1.5-1.5 1.5-1.5" />
      <path d="M10 12h4" />
      <path d="M18 18.7c-.4.2-.8.3-1.3.3-1.5 0-2.7-1.1-2.7-2.5S15.2 14 16.7 14c.5 0 .9.1 1.3.3" />
      <path d="M18 16.5h-2" />
      <path d="M5.8 9.8c-.4.3-.8.2-1-.2l-.6-1c-.2-.4-.1-.8.3-1l1.6-.9c.4-.2.8-.1 1 .3l.5.9c.2.4 0 .8-.3 1l-1.5.9z" />
      <path d="M5.5 14v-3" />
      <path d="M5.5 17.5v-1.5" />
      <path d="M5.5 21v-1.5" />
    </svg>
  );
};

export default FileSparkles;
