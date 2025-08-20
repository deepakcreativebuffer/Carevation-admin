import React from 'react';
import { Card, CardContent, CardHeader } from '../ui/Card';

interface Order {
  id: string;
  date: string;
  amount: number;
  status: 'completed' | 'pending' | 'cancelled';
  customer: string;
  week_start: string; 
  avg_frequency:number;
  total_sessions: number;
  unique_users: number
}

interface OrdersTableProps {
  orders: Order[];
  isFiltered: boolean;
}

export const WeeklySessionUser: React.FC<OrdersTableProps> = ({ orders, isFiltered }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">
           Weekly Session Frequency
          </h3>
          {isFiltered && (
            <span className="bg-teal-100 text-teal-800 text-sm px-3 py-1 rounded-full">
              Filtered Results ({orders.length})
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {orders?.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-slate-500">No Active found for the selected date range.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-medium text-slate-700">S.no</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Week Start</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Total Sessions</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Unique Users</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Avg Frequency</th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((order,index) => (
                  <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-4 text-sm font-medium text-slate-900">
                      #{index + 1}
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600">
                      {new Date(order.week_start).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-900">
                      {order.total_sessions}
                    </td>
                    <td className="py-3 px-4 text-sm font-medium text-slate-900">
                      ${order.unique_users}
                    </td>
                    <td className="py-3 px-4 text-sm font-medium text-slate-900">
                      ${order.avg_frequency}
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