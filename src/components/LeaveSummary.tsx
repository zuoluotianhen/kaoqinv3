import React from 'react';
import { LeaveSummary as LeaveSummaryType } from '../types';
import { 
  Briefcase, 
  Calendar, 
  Stethoscope, 
  Heart, 
  Clock, 
  HeartHandshake, 
  Baby, 
  Navigation 
} from 'lucide-react';

interface Props {
  summary: LeaveSummaryType;
}

export default function LeaveSummary({ summary }: Props) {
  const items = [
    { label: '事假申请', value: summary.事假, icon: Briefcase, color: 'from-green-400 to-green-600' },
    { label: '年休假申请', value: summary.年休假, icon: Calendar, color: 'from-blue-400 to-blue-600' },
    { label: '病假申请', value: summary.病假, icon: Stethoscope, color: 'from-red-400 to-red-600' },
    { label: '丧假申请', value: summary.丧假, icon: Heart, color: 'from-purple-400 to-purple-600' },
    { label: '调休假申请', value: summary.调休假, icon: Clock, color: 'from-yellow-400 to-yellow-600' },
    { label: '婚假申请', value: summary.婚假, icon: HeartHandshake, color: 'from-pink-400 to-pink-600' },
    { label: '生育假申请', value: summary.生育假, icon: Baby, color: 'from-indigo-400 to-indigo-600' },
    { label: '外勤申请', value: summary.外勤, icon: Navigation, color: 'from-orange-400 to-orange-600' },
  ] as const;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {items.map(({ label, value, icon: Icon, color }) => (
        <div 
          key={label} 
          className="relative bg-white rounded-lg shadow-md overflow-hidden"
          style={{
            pageBreakInside: 'avoid',
            breakInside: 'avoid',
            printColorAdjust: 'exact',
            WebkitPrintColorAdjust: 'exact'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br opacity-10" style={{
            background: `linear-gradient(to bottom right, var(--tw-gradient-from), var(--tw-gradient-to))`,
            '--tw-gradient-from': 'rgb(74 222 128)',
            '--tw-gradient-to': 'rgb(22 163 74)'
          }}></div>
          <div className="relative p-6">
            <div className="flex items-center justify-between mb-2">
              <Icon className="text-green-500" size={24} />
              <span className="text-3xl font-bold text-green-500">{value}</span>
            </div>
            <p className="text-gray-600 text-sm">{label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}