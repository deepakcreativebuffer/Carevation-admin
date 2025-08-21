import { BookmarkCheck, Scroll, ScrollText, ShieldPlus, SquareKanban, TrendingUp } from 'lucide-react';
import { useEffect } from 'react'
import { FilteredStatsCard } from '../FilteredStatsCard';
import { CareGiverPerCareSpace } from '../CareGiverPerCareSpace';
import { CareSpacePerUser } from '../CareSpacePerUser';
import { Card, CardContent, CardHeader } from '../../ui/Card';
import { useGetApi } from '../../../hooks/useFetch';

const CareSpaceEntryMetric = () => {

    const { data: carespaceMetricsData, loading: carespaceMetricsLoading, error: carespaceMetricsError, get: getCarespaceMetric } = useGetApi({
        url: "superadmin/dashboard/web/carespace-data-entry-metrics",
    });


    useEffect(() => {
        getCarespaceMetric()

    }, []);

    const getThirdStatsData = () => [
        {
            title: 'Total Medical Files Uploaded',
            value: carespaceMetricsData?.data?.data?.total_medical_files_uploaded,
            // filteredValue: filteredStats ? `${filteredStats.growthRate.toFixed(1)}%` : undefined,
            // change: '+2.1% from last month',
            changeType: 'positive' as const,
            icon: TrendingUp
        }
    ]
    const getFouthStatsData = () => [
        {
            title: 'Medications',
            value: carespaceMetricsData?.data?.data?.weekly_entity_counts?.medications,
            // filteredValue: filteredStats ? `${filteredStats.growthRate.toFixed(1)}%` : undefined,
            // change: '+2.1% from last month',
            changeType: 'positive' as const,
            icon: ShieldPlus
        },
        {
            title: 'Tasks',
            value: carespaceMetricsData?.data?.data?.weekly_entity_counts?.tasks,
            // filteredValue: filteredStats ? `${filteredStats.growthRate.toFixed(1)}%` : undefined,
            // change: '+2.1% from last month',
            changeType: 'positive' as const,
            icon: BookmarkCheck
        },
        {
            title: 'Visits',
            value: carespaceMetricsData?.data?.data?.weekly_entity_counts?.visits,
            // filteredValue: filteredStats ? `${filteredStats.growthRate.toFixed(1)}%` : undefined,
            // change: '+2.1% from last month',
            changeType: 'positive' as const,
            icon: SquareKanban
        },
        {
            title: 'Week End',
            value: new Date(carespaceMetricsData?.data?.data?.weekly_entity_counts?.weekEnd).toLocaleDateString(),
            // filteredValue: filteredStats ? `${filteredStats.growthRate.toFixed(1)}%` : undefined,
            // change: '+2.1% from last month',
            changeType: 'positive' as const,
            icon: ScrollText
        },
        {
            title: 'Week Start',
            value: new Date(carespaceMetricsData?.data?.data?.weekly_entity_counts?.weekStart).toLocaleDateString(),
            // filteredValue: filteredStats ? `${filteredStats.growthRate.toFixed(1)}%` : undefined,
            // change: '+2.1% from last month',
            changeType: 'positive' as const,
            icon: Scroll
        }
    ]

    return (
        <div>
            <div className="my-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                    CareSpace & Data Entry Metric
                </h2>
            </div>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {getThirdStatsData().map((stat, index) => (
                    <FilteredStatsCard key={index} {...stat} isFiltered={false} />
                ))}
            </div>

            <div className="space-y-6 mb-8">
                <CareGiverPerCareSpace caregiverSpace={carespaceMetricsData?.data?.data?.caregiver_per_carespace?.per_carespace} isFiltered={false} />
                <CareSpacePerUser caregiverSpaceUsers={carespaceMetricsData?.data?.data?.carespace_per_user?.per_user} isFiltered={false} />
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
        </div>
    )
}

export default CareSpaceEntryMetric