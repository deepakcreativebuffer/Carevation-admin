import React from 'react';
import { Card, CardContent, CardHeader } from '../ui/Card';

interface DailySessionFrequency {
  id: string;
  date: string;
  amount: number;
  status: 'completed' | 'pending' | 'cancelled';
  customer: string;
  day: string; 
  avg_frequency:number;
  total_sessions: number;
  unique_users: number
}

interface TableProps {
  dailySessionFrequency: DailySessionFrequency[];
  isFiltered: boolean;
}

export const DailySession: React.FC<TableProps> = ({ dailySessionFrequency, isFiltered }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">
           Daily Session Frequency
          </h3>
          {isFiltered && (
            <span className="bg-teal-100 text-teal-800 text-sm px-3 py-1 rounded-full">
              Filtered Results ({dailySessionFrequency?.length})
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {dailySessionFrequency?.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-slate-500">No Active found for the selected date range.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-medium text-slate-700">S.no</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Day</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Total Sessions</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Unique Users</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Avg Frequency</th>
                </tr>
              </thead>
              <tbody>
                {dailySessionFrequency?.map((dailySession,index) => (
                  <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-4 text-sm font-medium text-slate-900">
                      #{index + 1}
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600">
                      {new Date(dailySession.day).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-900">
                      {dailySession.total_sessions}
                    </td>
                    <td className="py-3 px-4 text-sm font-medium text-slate-900">
                      {dailySession.unique_users}
                    </td>
                    <td className="py-3 px-4 text-sm font-medium text-slate-900">
                      {dailySession.avg_frequency.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};