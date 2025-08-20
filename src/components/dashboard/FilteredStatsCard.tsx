import React from 'react';
import { Card, CardContent } from '../ui/Card';

interface FilteredStatsCardProps {
  title: string;
  value: string;
  filteredValue?: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  isFiltered: boolean;
}

export const FilteredStatsCard: React.FC<FilteredStatsCardProps> = ({
  title,
  value,
  filteredValue,
  change,
  changeType,
  icon: Icon,
  isFiltered
}) => {
  const changeColors = {
    positive: 'text-green-600',
    negative: 'text-red-600',
    neutral: 'text-slate-600'
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <p className="text-sm text-slate-600">{title}</p>
              {isFiltered && (
                <span className="bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full">
                  Filtered
                </span>
              )}
            </div>
            
            <div className="space-y-1">
              <p className="text-2xl font-bold text-slate-900">
                {isFiltered && filteredValue ? filteredValue : value}
              </p>
              
              {isFiltered && filteredValue && (
                <p className="text-sm text-slate-500">
                  Total: {value}
                </p>
              )}
            </div>
            
            <p className={`text-sm ${changeColors[changeType]} mt-1`}>
              {change}
            </p>
          </div>
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
            isFiltered ? 'bg-teal-600' : 'bg-teal-100'
          }`}>
            <Icon className={`w-6 h-6 ${isFiltered ? 'text-white' : 'text-teal-600'}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};