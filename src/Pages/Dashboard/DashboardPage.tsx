import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/ui/Button';
import {
  LogOut,
  User,
  BarChart3
} from 'lucide-react';
import RetentionMetrics from '../../components/dashboard/Sections/RetentionMetrics';
import EngagementMetricsData from '../../components/dashboard/Sections/EngagementMetricsData';
import CareSpaceEntryMetric from '../../components/dashboard/Sections/CareSpaceEntryMetric';
import SpecificMetrics from '../../components/dashboard/Sections/SpecificMetrics';

export const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-slate-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-slate-500" />
                <span className="text-sm text-slate-700">Welcome, {user?.first_name}</span>
              </div>

              {/* <Button variant="secondary" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button> */}

              <Button variant="outline" size="sm" onClick={logout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Welcome back, {user?.first_name}!
          </h2>
          <p className="text-slate-600">
            Here's what's happening with your dashboard today.
          </p>
        </div>
        <RetentionMetrics />
        <EngagementMetricsData />
        <CareSpaceEntryMetric />
        <SpecificMetrics />
      </main>
    </div>
  );
};