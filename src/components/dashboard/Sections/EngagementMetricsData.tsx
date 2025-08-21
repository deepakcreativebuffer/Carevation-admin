import { DollarSign, ShoppingBag, Users } from 'lucide-react';
import { useEffect } from 'react';
import { FilteredStatsCard } from '../FilteredStatsCard';
import { DailyUser } from '../DailyUser';
import { DailySession } from '../DailySession';
import { WeeklyActiveUser } from '../WeeklyActiveUser';
import { WeeklySessionUser } from '../WeeklySessionUser';
import { Card, CardContent, CardHeader } from '../../ui/Card';
import { useGetApi } from '../../../hooks/useFetch';

const EngagementMetricsData = () => {

    const { data: engagementMetricsData, loading: engagementLoading, error: engagementError, get: getEngagement } = useGetApi({
        url: "superadmin/dashboard/web/engagement-metrics",
    });


    useEffect(() => {
        getEngagement()
    }, []);


    const getSecondStatsData = () => [
        {
            title: 'Average Session Length',
            value: engagementMetricsData?.data?.data?.average_session_length.toFixed(2),
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
    return (
        <div>
            <div className="my-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                    Engagement & Usage Metrics
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
                <DailyUser dailyActiveUsers={engagementMetricsData?.data?.data?.daily_active_users} isFiltered={false} />
                <DailySession dailySessionFrequency={engagementMetricsData?.data?.data?.daily_session_frequency} isFiltered={false} />
                <WeeklyActiveUser weeklyActiveUsers={engagementMetricsData?.data?.data?.weekly_active_users} isFiltered={false} />
                <WeeklySessionUser weeklySessionFrequency={engagementMetricsData?.data?.data?.weekly_session_frequency} isFiltered={false} />
            </div>


            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-6">
                <Card>
                    <CardHeader>
                        <h3 className="text-lg font-semibold text-slate-900">Time Of Day Usage
                        </h3>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
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
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default EngagementMetricsData