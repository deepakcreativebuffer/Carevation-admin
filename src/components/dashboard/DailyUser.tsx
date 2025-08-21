import React from 'react';
import { Card, CardContent, CardHeader } from '../ui/Card';

interface ActiveUser {
  day: string; 
  dau:number;
}

interface TableProps {
  dailyActiveUsers: ActiveUser[];
  isFiltered: boolean;
}

export const DailyUser: React.FC<TableProps> = ({ dailyActiveUsers, isFiltered }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">
           Daily Active Users
          </h3>
          {isFiltered && (
            <span className="bg-teal-100 text-teal-800 text-sm px-3 py-1 rounded-full">
              Filtered Results ({dailyActiveUsers?.length})
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {dailyActiveUsers?.length === 0 ? (
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
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Daily Active User</th>
                </tr>
              </thead>
              <tbody>
                {dailyActiveUsers?.map((dailyActiveUser,index) => (
                  <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-4 text-sm font-medium text-slate-900">
                      #{index + 1}
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600">
                      {new Date(dailyActiveUser.day).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-900">
                      {dailyActiveUser.dau}
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