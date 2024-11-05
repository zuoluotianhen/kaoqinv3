import React, { useState } from 'react';
import { LeaveRequest, LeaveType, LeaveSummary } from './types';
import LeaveForm from './components/LeaveForm';
import LeaveSummaryComponent from './components/LeaveSummary';
import LeaveTable from './components/LeaveTable';
import Navigation from './components/Navigation';
import ImportData from './components/ImportData';
import Header from './components/Header';

function App() {
  const [requests, setRequests] = useState<LeaveRequest[]>([]);
  const [activeTab, setActiveTab] = useState<'summary' | 'apply' | 'import'>('summary');
  const [editingRequest, setEditingRequest] = useState<LeaveRequest | null>(null);
  const [showDescriptions, setShowDescriptions] = useState(false);

  const summary: LeaveSummary = requests.reduce(
    (acc, curr) => ({
      ...acc,
      [curr.type]: acc[curr.type as keyof LeaveSummary] + 1,
    }),
    { 事假: 0, 年休假: 0, 病假: 0, 丧假: 0, 调休假: 0, 婚假: 0, 生育假: 0, 外勤: 0 }
  );

  const handleSubmit = (data: Omit<LeaveRequest, 'id'>) => {
    if (editingRequest) {
      setRequests((prev) =>
        prev.map((req) =>
          req.id === editingRequest.id
            ? { ...data, id: editingRequest.id }
            : req
        )
      );
      setEditingRequest(null);
    } else {
      const newRequest: LeaveRequest = {
        ...data,
        id: Date.now().toString(),
      };
      setRequests((prev) => [...prev, newRequest]);
    }
    setActiveTab('summary');
  };

  const handleEdit = (request: LeaveRequest) => {
    setEditingRequest(request);
    setActiveTab('apply');
  };

  const handleBulkImport = (data: string) => {
    try {
      const lines = data.trim().split('\n');
      if (lines.length < 2) {
        alert('请确保包含表头和至少一行数据');
        return;
      }

      const newRequests = lines.slice(1).map((line) => {
        const [name, type, description, startDate, , days] = line.split('\t');
        return {
          id: Date.now().toString() + Math.random(),
          name,
          type: type as LeaveType,
          description: description?.trim(),
          dates: startDate,
          days: parseFloat(days),
        };
      });

      setRequests((prev) => [...prev, ...newRequests]);
      setActiveTab('summary');
      alert('数据导入成功！');
    } catch (error) {
      alert('数据格式错误，请确保复制了完整的表格内容');
    }
  };

  const handleDelete = (id: string) => {
    setRequests((prev) => prev.filter((request) => request.id !== id));
  };

  const leaveTypes: LeaveType[] = ['事假', '年休假', '病假', '丧假', '调休假', '婚假', '生育假', '外勤'];

  const renderContent = () => {
    switch (activeTab) {
      case 'apply':
        return <LeaveForm onSubmit={handleSubmit} initialData={editingRequest} />;
      case 'import':
        return <ImportData onImport={handleBulkImport} />;
      default:
        return (
          <>
            <LeaveSummaryComponent summary={summary} />
            {leaveTypes.map((type) => (
              <LeaveTable
                key={type}
                title={type}
                requests={requests.filter((r) => r.type === type)}
                onDelete={handleDelete}
                onEdit={handleEdit}
                showDescription={showDescriptions}
              />
            ))}
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <div id="printable-content" className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Header onExportTypeChange={setShowDescriptions} />
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default App;