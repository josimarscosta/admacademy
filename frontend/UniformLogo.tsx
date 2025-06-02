import React from 'react';
import { UniformLogo } from '@/components/UniformLogo';

const UniformLogo: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <svg width="120" height="40" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.5 8H10.5C9.4 8 8.5 8.9 8.5 10V30C8.5 31.1 9.4 32 10.5 32H20.5C21.6 32 22.5 31.1 22.5 30V10C22.5 8.9 21.6 8 20.5 8Z" fill="#003C71"/>
        <path d="M38.5 8H28.5C27.4 8 26.5 8.9 26.5 10V30C26.5 31.1 27.4 32 28.5 32H38.5C39.6 32 40.5 31.1 40.5 30V10C40.5 8.9 39.6 8 38.5 8Z" fill="#003C71"/>
        <path d="M56.5 8H46.5C45.4 8 44.5 8.9 44.5 10V30C44.5 31.1 45.4 32 46.5 32H56.5C57.6 32 58.5 31.1 58.5 30V10C58.5 8.9 57.6 8 56.5 8Z" fill="#003C71"/>
        <path d="M68.5 20.5H64.5V8H62.5V32H64.5V22.5H68.5V32H70.5V8H68.5V20.5Z" fill="#003C71"/>
        <path d="M80.5 8H72.5V32H80.5C83.8 32 86.5 29.3 86.5 26V14C86.5 10.7 83.8 8 80.5 8ZM84.5 26C84.5 28.2 82.7 30 80.5 30H74.5V10H80.5C82.7 10 84.5 11.8 84.5 14V26Z" fill="#003C71"/>
        <path d="M96.5 8H88.5V32H90.5V22H96.5C99.3 22 101.5 19.8 101.5 17V13C101.5 10.2 99.3 8 96.5 8ZM99.5 17C99.5 18.7 98.2 20 96.5 20H90.5V10H96.5C98.2 10 99.5 11.3 99.5 13V17Z" fill="#003C71"/>
        <path d="M111.5 8H103.5V32H111.5C114.8 32 117.5 29.3 117.5 26V14C117.5 10.7 114.8 8 111.5 8ZM115.5 26C115.5 28.2 113.7 30 111.5 30H105.5V10H111.5C113.7 10 115.5 11.8 115.5 14V26Z" fill="#003C71"/>
      </svg>
    </div>
  );
};

export default UniformLogo;
