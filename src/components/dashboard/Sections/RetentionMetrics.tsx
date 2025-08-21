import { Users } from "lucide-react";
import { useGetApi } from "../../../hooks/useFetch";
import { FilteredStatsCard } from "../FilteredStatsCard";
import { Card, CardContent, CardHeader } from "../../ui/Card";
import { useEffect } from "react";

interface OnboardingDropOffPoint {
    step: string;
    percentage: number;
    count: number;
}
const RetentionMetrics = () => {
    const { data, loading, error, get } = useGetApi({
        url: "superadmin/dashboard/web/onboarding-retention-metrics",
    });

    useEffect(() => {
        get();

    }, []);
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
    ];

    const stepMessages: Record<string, string> = {
        USER_ACCOUNT_CREATED: "User successfully created an account",
        SCREEN_OPENED_Welcome: "User landed on the Welcome screen",
        "SCREEN_OPENED_CreateFirstCareSpace_Step 1/3": "User started CareSpace setup (Step 1 of 3)",
        "SCREEN_OPENED_CreateFirstCareSpace_Step 2/3": "User continued CareSpace setup (Step 2 of 3)",
        "SCREEN_OPENED_CreateFirstCareSpace_Step 3/3": "User reached the final step of CareSpace setup (Step 3 of 3)",
        SCREEN_OPENED_ConditionPicker: "User opened the Condition Picker screen (to choose medical condition)",
        SCREEN_OPENED_CreateFirstCareSpace: "User viewed the CareSpace creation overview screen",
        ONBOARDING_COMPLETED: "User successfully completed onboarding",
    };


    return (
        <div>
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
                            {data?.data?.data?.onboarding_drop_off_points.map((item: OnboardingDropOffPoint, index: number) => (
                                <div key={index} className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                                    <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                                        <Users className="w-4 h-4 text-teal-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-900">
                                            {stepMessages[item.step] ?? item.step}
                                        </p>
                                        <p className="text-xs text-slate-500">{item.percentage} %</p>
                                        <p className="text-xs text-slate-500">{item.count}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default RetentionMetrics