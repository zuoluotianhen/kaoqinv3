import React, { useState } from 'react';
import { FileText } from 'lucide-react';

interface ImportDataProps {
  onImport: (data: string) => void;
}

export default function ImportData({ onImport }: ImportDataProps) {
  const [importData, setImportData] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onImport(importData);
    setImportData('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">批量导入请假记录</h2>
        <FileText size={24} className="text-green-500" />
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            请粘贴表格数据（包含表头的完整内容）
          </label>
          <textarea
            value={importData}
            onChange={(e) => setImportData(e.target.value)}
            required
            rows={10}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="姓名&#9;请假类型&#9;请假说明&#9;开始时间&#9;结束时间&#9;请假时长"
          />
        </div>
        <p className="text-sm text-gray-500">
          支持直接从Excel复制粘贴，确保包含：姓名、请假类型、请假说明、开始时间、结束时间、请假时长
        </p>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-200"
        >
          导入数据
        </button>
      </div>
    </form>
  );
}