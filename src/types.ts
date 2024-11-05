export type LeaveType = '事假' | '年休假' | '病假' | '丧假' | '调休假' | '婚假' | '生育假' | '外勤';

export interface LeaveRequest {
  id: string;
  name: string;
  type: LeaveType;
  dates: string;
  days: number;
  description?: string; // 添加请假说明字段
}

export interface LeaveSummary {
  事假: number;
  年休假: number;
  病假: number;
  丧假: number;
  调休假: number;
  婚假: number;
  生育假: number;
  外勤: number;
}