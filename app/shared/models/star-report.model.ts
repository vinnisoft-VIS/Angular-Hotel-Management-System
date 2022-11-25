export interface MonthlyStarReport {
    month: string;
    currentMonth: MonthlyPerformanceMeta;
    yearToDate: MonthlyPerformanceMeta;
    running3Month: MonthlyPerformanceMeta;
    running12Month: MonthlyPerformanceMeta;
}

export interface MonthlyPerformanceMeta {
    occupancy: any;
    adr: any;
    revPar: any;
}

export interface WeeklyStarReport {
    dateRange: string;
    occupancy: DailyDataSet[];
    adr: DailyDataSet[];
    revPar: DailyDataSet[];
}

export interface DailyDataSet {
    performanceMeasure: string;
    performanceMeta: any;
}

export interface DailyPerformanceMeta {
    performance: number;
    performanceChange: any;
}

export interface MonthlyStarPerformanceTrend {
    month: string;
    occupancy: DailyDataSet[];
    adr: DailyDataSet[];
    revPar: DailyDataSet[];
}
