import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbsProps {
  items: Array<{ label: string; href: string }>;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {items.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            {index > 0 && <ChevronRight className="w-4 h-4 text-gray-400" />}
            <Link href={item.href}>
              <a className={`inline-flex items-center text-sm font-medium ${
                index === items.length - 1 
                  ? 'text-fuchsia-400' 
                  : 'text-gray-400 hover:text-white'
              }`}>
                {item.label}
              </a>
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;

