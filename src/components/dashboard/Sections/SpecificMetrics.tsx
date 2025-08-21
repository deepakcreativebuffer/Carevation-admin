import React, { useEffect, useState } from 'react'
import { DateRangeFilter } from '../DateRangeFilter';
import { Card, CardContent, CardHeader } from '../../ui/Card';
import { usePostApi } from '../../../hooks/usePost';

const SpecificMetrics = () => {

    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);
    const { data: tasktoolData, loading: tasktoolDataLoading, error: tasktoolDataError, submit } = usePostApi({ url: "superadmin/dashboard/web/task-tool-usage" });
    const { data: visitToolData, loading: visitToolDataLoading, error: visitToolDataError, submit: submitVisitTool } = usePostApi({ url: "superadmin/dashboard/web/visit-tool-usage" });
    const { data: medicationToolData, loading: medicationToolDataLoading, error: medicationToolDataError, submit: submitMedTool } = usePostApi({ url: "superadmin/dashboard/web/medication-tool-usage" });
    useEffect(() => {
        submit({ data: { start_date: "", end_date: "" } })
        submitVisitTool({ data: { start_date: "", end_date: "" } })
        submitMedTool({ data: { start_date: "", end_date: "" } })
    }, []);

    useEffect(() => {
        submit({ data: { start_date: startDate || "", end_date: endDate || "" } });
        submitVisitTool({ data: { start_date: startDate || "", end_date: endDate || "" } });
        submitMedTool({ data: { start_date: startDate || "", end_date: endDate || "" } });
    }, [startDate, endDate]);

    const handleDateRangeChange = (newStartDate: string | null, newEndDate: string | null) => {
        setStartDate(newStartDate);
        setEndDate(newEndDate);
    };
    return (
        <div>

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
                        <h3 className="text-lg font-semibold text-slate-900">Task Tool Data
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
                        <h3 className="text-lg font-semibold text-slate-900">Visit Tool Data
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
                        <h3 className="text-lg font-semibold text-slate-900">Medication Tool Data
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
        </div>
    )
}

export default SpecificMetrics