import type { TrendsReponse } from "../Types/Trends";
import type { SummaryResponse } from "../Types/Sumary";

const apiUrl: string = import.meta.env.VITE_API_URL;

export const setDataOnMemory = async (): Promise<{ message: string, status: boolean }> => {
    const response = fetch(apiUrl + "/load_data");
    return (await response).json();
}

export const getUserSummary = async (userId: number, startDate: string, endDate: string): Promise<SummaryResponse> => {
    const params = new URLSearchParams();

    if (startDate) params.append("start_time", startDate);
    if (endDate) params.append("end_time", endDate);

    const urlToFetch = `${apiUrl}/summary/${userId}?${params.toString()}`;
    const response = fetch(urlToFetch);
    return (await response).json();
}

export const getTrendingActions = async (startDate: string, endDate: string): Promise<TrendsReponse> => {
    const params = new URLSearchParams();
    params.append("start_time", startDate);
    params.append("end_time", endDate);

    const urlToFetch = `${apiUrl}/action_trends?${params.toString()}`;
    const response = fetch(urlToFetch);
    return (await response).json();
}