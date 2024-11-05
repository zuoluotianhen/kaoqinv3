import React, { useState } from 'react';
import { Calendar, Printer, X, FileText, FileIcon } from 'lucide-react';
import html2canvas from 'html2canvas';

interface HeaderProps {
  onExportTypeChange: (showDescriptions: boolean) => void;
}

export default function Header({ onExportTypeChange }: HeaderProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [showPrintModal, setShowPrintModal] = useState(false);

  const monthInChinese = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'];

  const handlePrint = async (includeDescription: boolean) => {
    try {
      // 先隐藏模态框
      setShowPrintModal(false);
      
      // 等待模态框消失的动画完成
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // 添加打印类，但不添加遮罩
      document.body.classList.add('is-printing');
      if (!includeDescription) {
        document.body.classList.add('hide-descriptions');
      }
      onExportTypeChange(includeDescription);
      
      // 等待状态更新和重新渲染
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const element = document.getElementById('printable-content');
      if (!element) return;

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        onclone: (clonedDoc) => {
          const header = clonedDoc.querySelector('.header-gradient');
          if (header) {
            header.style.transform = 'none';
            header.style.background = 'linear-gradient(to right, #22c55e, #059669)';
          }
        }
      });

      const link = document.createElement('a');
      link.download = `请假记录_${year}年${month}月${includeDescription ? '_含说明' : ''}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('导出图片失败:', error);
      alert('导出图片失败，请重试');
    } finally {
      document.body.classList.remove('is-printing', 'hide-descriptions');
      onExportTypeChange(false);
    }
  };

  const handleDateClick = () => {
    setIsEditing(true);
  };

  const handleDateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
  };

  return (
    <>
      <div className="relative mb-12">
        <div className="header-gradient absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 transform -skew-y-2"></div>
        <div className="relative py-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center mb-4">
              <Calendar className="text-white mr-2" size={32} />
              <h1 className="text-4xl font-bold text-white">请假记录管理</h1>
              <button
                onClick={() => setShowPrintModal(true)}
                className="print-hide ml-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-200 group"
                title="导出为图片"
              >
                <Printer className="text-white group-hover:scale-110 transform transition-transform duration-200" size={24} />
              </button>
            </div>
            
            {isEditing ? (
              <form onSubmit={handleDateSubmit} className="flex items-center justify-center space-x-4">
                <input
                  type="number"
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                  className="w-20 px-2 py-1 rounded bg-white/90 text-gray-800 text-center"
                  min="2000"
                  max="2100"
                />
                <span className="text-white">年</span>
                <select
                  value={month}
                  onChange={(e) => setMonth(Number(e.target.value))}
                  className="w-20 px-2 py-1 rounded bg-white/90 text-gray-800"
                >
                  {monthInChinese.map((_, index) => (
                    <option key={index + 1} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>
                <span className="text-white">月</span>
                <button
                  type="submit"
                  className="px-3 py-1 rounded bg-white/20 hover:bg-white/30 text-white transition-colors duration-200"
                >
                  确定
                </button>
              </form>
            ) : (
              <div
                onClick={handleDateClick}
                className="flex items-center justify-center space-x-2 text-white/90 cursor-pointer hover:text-white transition-colors duration-200"
              >
                <span className="text-xl">{year}年</span>
                <div className="w-px h-6 bg-white/30"></div>
                <span className="text-xl">{monthInChinese[month - 1]}月</span>
              </div>
            )}
          </div>
        </div>
        <div className="header-gradient absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 transform skew-y-2 -z-10 opacity-30"></div>
      </div>

      {showPrintModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 print-hide">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl transform transition-all">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">选择导出选项</h3>
              <button
                onClick={() => setShowPrintModal(false)}
                className="text-gray-400 hover:text-gray-500 transition-colors duration-200 hover:bg-gray-100 rounded-full p-1"
              >
                <X size={20} />
              </button>
            </div>
            <div className="space-y-3">
              <button
                onClick={() => handlePrint(false)}
                className="w-full py-3 px-4 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 rounded-lg transition-all duration-200 flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <FileIcon className="text-gray-400 group-hover:text-gray-600" />
                  <span>仅导出基本信息</span>
                </div>
                <span className="text-sm text-gray-400 group-hover:text-gray-600">简洁版</span>
              </button>
              <button
                onClick={() => handlePrint(true)}
                className="w-full py-3 px-4 bg-green-50 border-2 border-green-200 hover:border-green-300 text-green-700 rounded-lg transition-all duration-200 flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <FileText className="text-green-500 group-hover:text-green-600" />
                  <span>包含请假说明</span>
                </div>
                <span className="text-sm text-green-500 group-hover:text-green-600">详细版</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}