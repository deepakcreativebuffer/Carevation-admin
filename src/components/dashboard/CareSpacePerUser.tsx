import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Pagination } from '../ui/pagination/Pagination';

interface SpaceUser {
    user_id: number;
    user_name: string;
    careSpacesCreated: number;
}

interface TableProps {
    caregiverSpaceUsers: SpaceUser[];
    isFiltered: boolean;
}

export const CareSpacePerUser: React.FC<TableProps> = ({ caregiverSpaceUsers, isFiltered }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const startIndex = (currentPage - 1) * pageSize;
    const paginatedCaregiverSpaceUsers = caregiverSpaceUsers?.slice(startIndex, startIndex + pageSize);
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-slate-900">
                        Weekly Session Frequency
                    </h3>
                    {isFiltered && (
                        <span className="bg-teal-100 text-teal-800 text-sm px-3 py-1 rounded-full">
                            Filtered Results ({caregiverSpaceUsers.length})
                        </span>
                    )}
                </div>
            </CardHeader>
            <CardContent>
                {caregiverSpaceUsers?.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-slate-500">No Active found for the selected date range.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-slate-200">
                                    <th className="text-left py-3 px-4 font-medium text-slate-700">S.no</th>
                                    <th className="text-left py-3 px-4 font-medium text-slate-700">User Id</th>
                                    <th className="text-left py-3 px-4 font-medium text-slate-700">User Name</th>
                                    <th className="text-left py-3 px-4 font-medium text-slate-700">CareSpaces Created</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedCaregiverSpaceUsers?.map((spaceUser, index) => (
                                    <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                                        <td className="py-3 px-4 text-sm font-medium text-slate-900">
                                            #{index + 1}
                                        </td>
                                        <td className="py-3 px-4 text-sm text-slate-600">
                                            {spaceUser.user_id}
                                        </td>
                                        <td className="py-3 px-4 text-sm text-slate-900">
                                            {spaceUser.user_name}
                                        </td>
                                        <td className="py-3 px-4 text-sm font-medium text-slate-900">
                                            {spaceUser.careSpacesCreated}
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Pagination
                            currentPage={currentPage}
                            totalItems={caregiverSpaceUsers?.length}
                            pageSize={pageSize}
                            onPageChange={setCurrentPage}
                            onPageSizeChange={(size) => {
                                setPageSize(size);
                                setCurrentPage(1);
                            }}
                        />
                    </div>
                )}
            </CardContent>
        </Card>
    );
};