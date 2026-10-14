import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav className="flex items-center space-x-2 text-xs text-slate-400 py-3 overflow-x-auto">
      <Link to="/" className="hover:text-electro-400 flex items-center space-x-1 shrink-0">
        <Home className="w-3.5 h-3.5" />
        <span>Beranda</span>
      </Link>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
          {item.path ? (
            <Link to={item.path} className="hover:text-electro-400 font-medium shrink-0 truncate max-w-[150px]">
              {item.label}
            </Link>
          ) : (
            <span className="text-white font-semibold truncate max-w-[200px] shrink-0">
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
