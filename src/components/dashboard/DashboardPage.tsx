import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { FilteredStatsCard } from './FilteredStatsCard';
import { DateRangeFilter } from './DateRangeFilter';
import {
  Users,
  TrendingUp,
  DollarSign,
  ShoppingBag,
  LogOut,
  User,
  Settings,
  BarChart3
} from 'lucide-react';
import { useGetApi } from '../../hooks/useFetch';
import { DailyUser } from './DailyUser';
import { DailySession } from './DailySession';
import { WeeklyActiveUser } from './WeeklyActiveUser';
import { WeeklySessionUser } from './WeeklySessionUser';
import { usePostApi } from '../../hooks/usePost';
import { CareGiverPerCareSpace } from './CareGiverPerCareSpace';
import { CareSpacePerUser } from './CareSpacePerUser';

export const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const { data, loading, error, get } = useGetApi({
    url: "superadmin/dashboard/web/onboarding-retention-metrics",
  });
  const { data: engagementMetricsData, loading: engagementLoading, error: engagementError, get: getEngagement } = useGetApi({
    url: "superadmin/dashboard/web/engagement-metrics",
  });
  const { data: carespaceMetricsData, loading: carespaceMetricsLoading, error: carespaceMetricsError, get: getCarespaceMetric } = useGetApi({
    url: "superadmin/dashboard/web/carespace-data-entry-metrics",
  });

  const { data: tasktoolData, loading: tasktoolDataLoading, error: tasktoolDataError, submit } = usePostApi({ url: "superadmin/dashboard/web/task-tool-usage" });
  const { data: visitToolData, loading: visitToolDataLoading, error: visitToolDataError, submit: submitVisitTool } = usePostApi({ url: "superadmin/dashboard/web/visit-tool-usage" });
  const { data: medicationToolData, loading: medicationToolDataLoading, error: medicationToolDataError, submit: submitMedTool } = usePostApi({ url: "superadmin/dashboard/web/medication-tool-usage" });


  useEffect(() => {
    get();
    getCarespaceMetric()
    getEngagement()
    submit({ data: { start_date: "", end_date: "" } })
    submitVisitTool({ data: { start_date: "", end_date: "" } })
    submitMedTool({ data: { start_date: "", end_date: "" } })
  }, []);

  useEffect(() => {
    submit({ data: { start_date: startDate || "", end_date: endDate || "" } });
    submitVisitTool({ data: { start_date: startDate || "", end_date: endDate || "" } });
    submitMedTool({ data: { start_date: startDate || "", end_date: endDate || "" } });
  }, [startDate, endDate]);


  // console.log("data", data);
  // console.log("engagementMetricsData", engagementMetricsData);
  // console.log("getCarespaceMetric", carespaceMetricsData);
  // console.log("tasktoolData", tasktoolData);
  // console.log("visitToolData", visitToolData);
  // console.log("medicationToolData", medicationToolData);
  const handleDateRangeChange = (newStartDate: string | null, newEndDate: string | null) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };



  const getStatsData = () => [
    {
      title: 'Average Onboarding Time',
      value: data?.data?.data?.average_onboarding_time.toFixed(2),
      // filteredValue: filteredStats ? filteredStats.totalUsers.toLocaleString() : undefined,
      change: 'minutes',
      changeType: 'positive' as const,
      icon: Users
    },
    {
      title: 'Onbooading Completion Rate',
      value: data?.data?.data?.onbooading_completion_rate.toFixed(2),
      // filteredValue: filteredStats ? filteredStats.totalUsers.toLocaleString() : undefined,
      change: 'percentage',
      changeType: 'positive' as const,
      icon: Users
    },

    // {
    //   title: 'Total Users',
    //   value: baseStats.totalUsers.toLocaleString(),
    //   filteredValue: filteredStats ? filteredStats.totalUsers.toLocaleString() : undefined,
    //   change: '+12% from last month',
    //   changeType: 'positive' as const,
    //   icon: Users
    // },
    // {
    //   title: 'Revenue',
    //   value: `$${baseStats.revenue.toLocaleString()}`,
    //   filteredValue: filteredStats ? `$${filteredStats.revenue.toLocaleString()}` : undefined,
    //   change: '+8% from last month',
    //   changeType: 'positive' as const,
    //   icon: DollarSign
    // },
    // {
    //   title: 'Revenue',
    //   value: `$${baseStats.revenue.toLocaleString()}`,
    //   filteredValue: filteredStats ? `$${filteredStats.revenue.toLocaleString()}` : undefined,
    //   change: '+8% from last month',
    //   changeType: 'positive' as const,
    //   icon: DollarSign
    // },
    // {
    //   title: 'Orders',
    //   value: baseStats.orders.toLocaleString(),
    //   filteredValue: filteredStats ? filteredStats.orders.toLocaleString() : undefined,
    //   change: '-3% from last month',
    //   changeType: 'negative' as const,
    //   icon: ShoppingBag
    // },
    // {
    //   title: 'Growth Rate',
    //   value: `${baseStats.growthRate.toFixed(1)}%`,
    //   filteredValue: filteredStats ? `${filteredStats.growthRate.toFixed(1)}%` : undefined,
    //   change: '+2.1% from last month',
    //   changeType: 'positive' as const,
    //   icon: TrendingUp
    // }
  ];

  //   const { data, loading, error, get } = useGetApi({
  //   url: "/api/users/:id",
  //   pathParams: { id: 42 },
  //   queryParams: { active: true },
  // });

  const getSecondStatsData = () => [
    {
      title: 'Average Session Length',
      value: engagementMetricsData?.data?.data?.average_session_length,
      // filteredValue: filteredStats ? `$${filteredStats.revenue.toLocaleString()}` : undefined,
      change: 'minutes',
      changeType: 'positive' as const,
      icon: DollarSign
    },
    {
      title: 'Rolling Weekly Active Users',
      value: engagementMetricsData?.data?.data?.rolling_weekly_active_users?.wau,
      // filteredValue: filteredStats ? filteredStats.orders.toLocaleString() : undefined,
      change: 'Last 7 days',
      changeType: 'negative' as const,
      icon: ShoppingBag
    },

  ]

  const getThirdStatsData = () => [
    {
      title: 'Total Medical Files Uploaded',
      value: carespaceMetricsData?.data?.data?.total_medical_files_uploaded,
      // filteredValue: filteredStats ? `${filteredStats.growthRate.toFixed(1)}%` : undefined,
      change: '+2.1% from last month',
      changeType: 'positive' as const,
      icon: TrendingUp
    }
  ]


  const getFouthStatsData = () => [
    {
      title: 'Medications',
      value: carespaceMetricsData?.data?.data?.weekly_entity_counts?.medications,
      // filteredValue: filteredStats ? `${filteredStats.growthRate.toFixed(1)}%` : undefined,
      change: '+2.1% from last month',
      changeType: 'positive' as const,
      icon: TrendingUp
    },
    {
      title: 'Tasks',
      value: carespaceMetricsData?.data?.data?.weekly_entity_counts?.tasks,
      // filteredValue: filteredStats ? `${filteredStats.growthRate.toFixed(1)}%` : undefined,
      change: '+2.1% from last month',
      changeType: 'positive' as const,
      icon: TrendingUp
    },
    {
      title: 'Visits',
      value: carespaceMetricsData?.data?.data?.weekly_entity_counts?.visits,
      // filteredValue: filteredStats ? `${filteredStats.growthRate.toFixed(1)}%` : undefined,
      change: '+2.1% from last month',
      changeType: 'positive' as const,
      icon: TrendingUp
    },
    {
      title: 'Week End',
      value: new Date(carespaceMetricsData?.data?.data?.weekly_entity_counts?.weekEnd).toLocaleDateString(),
      // filteredValue: filteredStats ? `${filteredStats.growthRate.toFixed(1)}%` : undefined,
      change: '+2.1% from last month',
      changeType: 'positive' as const,
      icon: TrendingUp
    },
    {
      title: 'Week Start',
      value: new Date(carespaceMetricsData?.data?.data?.weekly_entity_counts?.weekStart).toLocaleDateString(),
      // filteredValue: filteredStats ? `${filteredStats.growthRate.toFixed(1)}%` : undefined,
      change: '+2.1% from last month',
      changeType: 'positive' as const,
      icon: TrendingUp
    }
  ]


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
                <span className="text-sm text-slate-700">Welcome, {user?.name}</span>
              </div>

              <Button variant="secondary" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>

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
            Welcome back, {user?.name}!
          </h2>
          <p className="text-slate-600">
            Here's what's happening with your dashboard today.
          </p>
        </div>




        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Onboarding & Retention Metrics
          </h2>
        </div>
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {getStatsData().map((stat, index) => (
            <FilteredStatsCard key={index} {...stat} isFiltered={false} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-slate-900">On Boarding Drop Off Points
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data?.data?.data?.onboarding_drop_off_points.map((item: any, index: number) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                    <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                      <Users className="w-4 h-4 text-teal-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">{item.step}</p>
                      <p className="text-xs text-slate-500">{item.percentage} %</p>
                      <p className="text-xs text-slate-500">{item.count}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="my-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            CareSpace & Data Entry Metric
          </h2>
        </div>


        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {getSecondStatsData().map((stat, index) => (
            <FilteredStatsCard key={index} {...stat} isFiltered={false} />
          ))}
        </div>

        {/* Content Cards */}
        <div className="space-y-6">
          {/* Orders Table */}
          <DailyUser orders={engagementMetricsData?.data?.data?.daily_active_users} isFiltered={false} />
          <DailySession orders={engagementMetricsData?.data?.data?.daily_session_frequency} isFiltered={false} />
          <WeeklyActiveUser orders={engagementMetricsData?.data?.data?.weekly_active_users} isFiltered={false} />
          <WeeklySessionUser orders={engagementMetricsData?.data?.data?.weekly_session_frequency} isFiltered={false} />
          <CareGiverPerCareSpace orders={carespaceMetricsData?.data?.data?.caregiver_per_carespace?.per_carespace} isFiltered={false} />
          <CareSpacePerUser orders={carespaceMetricsData?.data?.data?.carespace_per_user?.per_user} isFiltered={false} />
          {/* <OrdersTable orders={filteredOrders} isFiltered={isFiltered} /> */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-6">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-slate-900">Time Of Day Usage
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* {data?.data?.data?.onboarding_drop_off_points.map((item: any, index: number) => ( */}
                <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                  <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-teal-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">Morning</p>
                    <p className="text-xs text-slate-500">{engagementMetricsData?.data?.data?.time_of_day_usage?.percentage?.morning}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                  <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-teal-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">Afternoon</p>
                    <p className="text-xs text-slate-500">{engagementMetricsData?.data?.data?.time_of_day_usage?.percentage?.afternoon}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                  <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-teal-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">Evening</p>
                    <p className="text-xs text-slate-500">{engagementMetricsData?.data?.data?.time_of_day_usage?.percentage?.evening}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                  <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-teal-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">Night</p>
                    <p className="text-xs text-slate-500">{engagementMetricsData?.data?.data?.time_of_day_usage?.percentage?.night}</p>
                  </div>
                </div>
                {/* ))} */}
              </div>
            </CardContent>
          </Card>
        </div>


        <div className="my-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Engagement & Usage Metrics
          </h2>
        </div>


        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {getThirdStatsData().map((stat, index) => (
            <FilteredStatsCard key={index} {...stat} isFiltered={false} />
          ))}
        </div>

        <Card className='mb-8'>
          <CardHeader>
            <h3 className="text-lg font-semibold text-slate-900">Weekly Entity Counts
            </h3>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {getFouthStatsData().map((stat, index) => (
                <FilteredStatsCard key={index} {...stat} isFiltered={false} />
              ))}
            </div>
          </CardContent>
        </Card>
        <div className="grid grid-cols-12 gap-6">
          <Card className="col-span-12 md:col-span-6 lg:col-span-4">
            <CardHeader>
              <h3 className="text-lg font-semibold text-slate-900">Task Completion Rate
              </h3>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="space-y-1">
                  <p className="text-sm text-slate-500">Completed</p>
                  <p className="text-xl font-bold text-slate-900">
                    {carespaceMetricsData?.data?.data?.task_completion_rate.completed}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-slate-500">Rate</p>
                  <p className="text-xl font-bold text-slate-900">
                    {carespaceMetricsData?.data?.data?.task_completion_rate.rate.toFixed(2)}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-slate-500">Total</p>
                  <p className="text-xl font-bold text-slate-900">
                    {carespaceMetricsData?.data?.data?.task_completion_rate.total}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>


        <div className="my-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Feature-Specific Metrics
          </h2>
        </div>

        {/* Date Range Filter */}
        <DateRangeFilter
          startDate={startDate}
          endDate={endDate}
          onDateRangeChange={handleDateRangeChange}
        />

        <div className="grid grid-cols-12 gap-6 mb-8">
          <Card className="col-span-12 md:col-span-6 lg:col-span-6 ">
            <CardHeader>
              <h3 className="text-lg font-semibold text-slate-900">Task Completion Rate
              </h3>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="space-y-1">
                  <p className="text-sm text-slate-500">Task Completions</p>
                  <p className="text-xl font-bold text-slate-900">
                    {tasktoolData?.data?.data?.task_completions
                    }
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-slate-500">Task Creates</p>
                  <p className="text-xl font-bold text-slate-900">
                    {tasktoolData?.data?.data?.task_creates}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-slate-500">Task Edits</p>
                  <p className="text-xl font-bold text-slate-900">
                    {tasktoolData?.data?.data?.task_edits}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-12 md:col-span-6 lg:col-span-6">
            <CardHeader>
              <h3 className="text-lg font-semibold text-slate-900">Task Completion Rate
              </h3>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="space-y-1">
                  <p className="text-sm text-slate-500">AI Summaries Generated</p>
                  <p className="text-xl font-bold text-slate-900">
                    {visitToolData?.data?.data?.ai_summaries_generated}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-slate-500">Visit Notes</p>
                  <p className="text-xl font-bold text-slate-900">
                    {visitToolData?.data?.data?.visit_notes}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-slate-500">Visits Created</p>
                  <p className="text-xl font-bold text-slate-900">
                    {visitToolData?.data?.data?.visits_created}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-12 md:col-span-6 lg:col-span-6">
            <CardHeader>
              <h3 className="text-lg font-semibold text-slate-900">Task Completion Rate
              </h3>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="space-y-1">
                  <p className="text-sm text-slate-500">Medications Added</p>
                  <p className="text-xl font-bold text-slate-900">
                    {medicationToolData?.data?.data?.medications_added
                    }
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-slate-500">Medications Edited</p>
                  <p className="text-xl font-bold text-slate-900">
                    {medicationToolData?.data?.data?.medications_edited}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-slate-500">Medications Removed</p>
                  <p className="text-xl font-bold text-slate-900">
                    {medicationToolData?.data?.data?.medications_removed}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-slate-500">Medications With Reminders</p>
                  <p className="text-xl font-bold text-slate-900">
                    {medicationToolData?.data?.data?.medications_with_reminders}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-slate-500">Reminder Days</p>
                  <p className="text-xl font-bold text-slate-900">
                    {medicationToolData?.data?.data?.reminder_schedules?.reminderDays
                    }
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-slate-500">Reminder Times</p>
                  <p className="text-xl font-bold text-slate-900">
                    {medicationToolData?.data?.data?.reminder_schedules?.reminderTimes
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};