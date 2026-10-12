import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  variant?: 'dark' | 'light';
}

export default function Breadcrumbs({ items, className, variant = 'dark' }: BreadcrumbsProps) {
  const isLight = variant === 'light';
  
  return (
    <nav className={cn(
      "flex items-center gap-2 text-sm font-medium mb-3",
      isLight ? "text-white/60" : "text-dark/60",
      className
    )}>
      <Link 
        to="/" 
        className={cn(
          "hover:text-accent transition-colors flex items-center gap-1",
          isLight && "hover:text-white"
        )}
      >
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </Link>
      
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        
        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-4 h-4" />
            {item.path ? (
              <Link 
                to={item.path} 
                className={cn(
                  "hover:text-accent transition-colors",
                  isLight && "hover:text-white"
                )}
              >
                {item.label}
              </Link>
            ) : (
              <span className={cn(
                isLight ? "text-white" : "text-dark"
              )}>
                {item.label}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
