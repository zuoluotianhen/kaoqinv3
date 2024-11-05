import React from 'react';
import { LayoutDashboard, FileSpreadsheet, Upload } from 'lucide-react';

interface NavigationProps {
  activeTab: 'summary' | 'apply' | 'import';
  onTabChange: (tab: 'summary' | 'apply' | 'import') => void;
}

export default function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const navItems = [
    { id: 'summary', label: '统计概览', icon: LayoutDashboard },
    { id: 'apply', label: '请假申请', icon: FileSpreadsheet },
    { id: 'import', label: '批量导入', icon: Upload },
  ] as const;

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center space-x-8">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={`
                flex items-center gap-2 px-4 py-4 text-sm font-medium
                ${activeTab === id
                  ? 'text-green-600 border-b-2 border-green-500'
                  : 'text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300'
                }
                transition-colors duration-200
              `}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}