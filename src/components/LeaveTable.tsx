import React, { useState } from 'react';
import { LeaveRequest, LeaveType } from '../types';
import { Pencil, Trash2, FileText, ChevronDown, ChevronUp } from 'lucide-react';

interface Props {
  title: LeaveType;
  requests: LeaveRequest[];
  onDelete: (id: string) => void;
  onEdit: (request: LeaveRequest) => void;
  showDescription?: boolean;
}

export default function LeaveTable({ title, requests, onDelete, onEdit, showDescription }: Props) {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  if (requests.length === 0) return null;

  const toggleDescription = (id: string) => {
    setExpandedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="mb-8">
      <h2 className="bg-green-500 text-white px-6 py-3 rounded-t-lg text-lg font-medium">
        {title}
      </h2>
      <div className="bg-white rounded-b-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">姓名</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">日期</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">天数</th>
              <th className="px-6 py-3 text-right text-sm font-medium text-gray-700 print-hide">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {requests.map((request) => (
              <React.Fragment key={request.id}>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {request.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {request.dates}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-green-600">
                    {request.days}天
                  </td>
                  <td className="px-6 py-4 text-right print-hide">
                    <div className="flex items-center justify-end space-x-2 action-buttons">
                      {request.description && (
                        <button
                          onClick={() => toggleDescription(request.id)}
                          className="text-gray-500 hover:text-gray-700 transition-colors duration-200 p-1 rounded-full hover:bg-gray-50"
                          title={expandedRows.has(request.id) ? "收起说明" : "展开说明"}
                        >
                          {expandedRows.has(request.id) ? (
                            <ChevronUp size={16} />
                          ) : (
                            <ChevronDown size={16} />
                          )}
                        </button>
                      )}
                      <button
                        onClick={() => onEdit(request)}
                        className="text-blue-500 hover:text-blue-700 transition-colors duration-200 p-1 rounded-full hover:bg-blue-50"
                        title="编辑"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => onDelete(request.id)}
                        className="text-red-500 hover:text-red-700 transition-colors duration-200 p-1 rounded-full hover:bg-red-50"
                        title="删除"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
                {((showDescription && request.description) || 
                  (!showDescription && expandedRows.has(request.id) && request.description)) && (
                  <tr className="bg-gray-50 description-row">
                    <td colSpan={4} className="px-6 py-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FileText size={16} className="text-gray-400" />
                        <span>{request.description}</span>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}