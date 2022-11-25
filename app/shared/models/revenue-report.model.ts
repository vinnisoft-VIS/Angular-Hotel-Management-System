export interface DailyRevenue {
    month?: string;
    day?: string;
    categories: RevenueCategory[];
    soldRooms: any[];
    revenue: any[];
    occupancy: any[];
    totalRevenue?: any;
    arr?: any[];
}

export interface RevenueCategory {
    transactionCode?: string;
    description?: string;
    lineNo?: string;
    lineDescription?: string;
    categoryMappingId?: number;
}

export interface DailyRevenueByProperty {
    property: string;
    dailyRevenue: DailyRevenue;
}

export interface MonthlyRevenueReport {
    property?: string;
    rooms: number;
    revenue: any;
    day: any;
    occupancy?: number;
}