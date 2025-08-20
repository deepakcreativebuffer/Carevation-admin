import React from 'react';
import { Card, CardContent, CardHeader } from '../ui/Card';

interface Order {
  id: string;
  date: string;
  amount: number;
  status: 'completed' | 'pending' | 'cancelled';
  customer: string;
}

interface OrdersTableProps {
  orders: Order[];
  isFiltered: boolean;
}

export const OrdersTable: React.FC<OrdersTableProps> = ({ orders, isFiltered }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">
            Recent Orders
          </h3>
          {isFiltered && (
            <span className="bg-teal-100 text-teal-800 text-sm px-3 py-1 rounded-full">
              Filtered Results ({orders.length})
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {orders.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-slate-500">No orders found for the selected date range.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Order ID</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Customer</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-4 text-sm font-medium text-slate-900">
                      #{order.id}
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600">
                      {new Date(order.date).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-900">
                      {order.customer}
                    </td>
                    <td className="py-3 px-4 text-sm font-medium text-slate-900">
                      ${order.amount.toFixed(2)}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
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