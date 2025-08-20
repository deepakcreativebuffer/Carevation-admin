import React, { useState, useEffect } from 'react';
import { Calendar, Filter, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card, CardContent } from '../ui/Card';

interface DateRangeFilterProps {
  onDateRangeChange: (startDate: string | null, endDate: string | null) => void;
  startDate: string | null;
  endDate: string | null;
}

export const DateRangeFilter: React.FC<DateRangeFilterProps> = ({
  onDateRangeChange,
  startDate,
  endDate
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localStartDate, setLocalStartDate] = useState<string | null>(startDate);
  const [localEndDate, setLocalEndDate] = useState<string | null>(endDate);

  // sync props -> local state (when parent resets)
  useEffect(() => {
    setLocalStartDate(startDate);
    setLocalEndDate(endDate);
  }, [startDate, endDate]);

  const clearFilters = () => {
    onDateRangeChange("", "");
    setIsExpanded(false);
  };

  const applyFilters = () => {
    onDateRangeChange(localStartDate, localEndDate);
    setIsExpanded(false);
  };

  const hasActiveFilters = startDate || endDate;

  return (
    <Card className="mb-6">
      <CardContent className="py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center space-x-2"
            >
              <Filter className="w-4 h-4" />
              <span>Filter by Date Range</span>
              {hasActiveFilters && (
                <span className="bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full">
                  Active
                </span>
              )}
            </Button>

            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="flex items-center space-x-1 text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <X className="w-3 h-3" />
                <span>Clear Filters</span>
              </Button>
            )}
          </div>

          {hasActiveFilters && (
            <div className="text-sm text-slate-600">
              {startDate && endDate ? (
                <span>
                  {new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}
                </span>
              ) : startDate ? (
                <span>From: {new Date(startDate).toLocaleDateString()}</span>
              ) : endDate ? (
                <span>Until: {new Date(endDate).toLocaleDateString()}</span>
              ) : null}
            </div>
          )}
        </div>

        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-slate-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Start Date */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Start Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={localStartDate || ''}
                    onChange={(e) => setLocalStartDate(e.target.value || null)}
                    className="w-full px-3 py-2 pl-10 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                  />
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* End Date */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  End Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={localEndDate || ''}
                    onChange={(e) => setLocalEndDate(e.target.value || null)}
                    min={localStartDate || undefined}
                    className="w-full px-3 py-2 pl-10 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                  />
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-slate-500">
                Select date range to filter orders and analytics data
              </p>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsExpanded(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={applyFilters}
                  disabled={!localStartDate && !localEndDate}
                >
                  Apply Filter
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
