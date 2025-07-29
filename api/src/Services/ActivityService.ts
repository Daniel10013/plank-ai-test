import { CSV_PATH } from '../Config/config';
import HttpError from '../Errors/HttpError';
import { activityData } from '../Data/DataStorage';
import { ActionTrend, Activity, ActivitySummary, JsonMetadata } from '../Interfaces/Activity';

class ActivityService {

    public fetchActivityData = async (): Promise<Activity[]> => {
        if (CSV_PATH == '') {
            throw new HttpError('You must set a path for the CSV file!');
        }

        const response = await fetch(CSV_PATH);
        if (response.ok == false) {
            throw new HttpError('Error on fetching the CSV data!');
        }

        const data = await response.text();
        return this.parseCsvData(data);
    }

    private parseCsvData = (rawCsv: string): Activity[] => {
        const lines: string[] = rawCsv.trim().split('\n');
        //removing the csv header
        lines.shift();

        const activities: Activity[] = [];

        for (const [index, line] of lines.entries()) {
            const data = line.split(',');
            const jsonPosition = line.indexOf('{');
            const rawmetadata = line.slice(jsonPosition);
            const jsonMetadata: JsonMetadata = JSON.parse(rawmetadata)
            if (this.validateLineData(data, jsonMetadata)) {
                console.warn(`Line ${index} is wrong and will be skipped!`);
                continue;
            }

            const activity: Activity = {
                user_id: Number(data[0]),
                timestamp: new Date(data[1]),
                action: data[2],
                metadata: {
                    page: jsonMetadata.page,
                    duration: jsonMetadata.duration,
                    file_size: Number(jsonMetadata.file_size) || undefined,
                    file_type: jsonMetadata.file_type || undefined,
                    query: jsonMetadata.query || undefined
                }
            }
            activities.push(activity);
        }

        return activities;
    }

    private validateLineData = (data: string[], metadata: JsonMetadata): boolean => {
        //data size is invalid
        if (data.length < 4) {
            return false;
        }

        //user id is invalid
        if (isNaN(Number(data[0])) || Number([0]) <= 0) {
            return false;
        }

        //timestamp is invalid
        const timestamp = new Date(data[1]);
        if (isNaN(timestamp.getTime())) {
            return false
        }

        //validate action
        if (!data[2] || typeof data[2] !== 'string') {
            return false;
        }

        // metadata is invalid
        if (typeof metadata.page !== 'string' || metadata.page.trim() === '') {
            return false
        }
        if (typeof metadata.duration !== 'number' || metadata.duration < 0) {
            return false
        }

        return true;
    }

    public getSummary = (userId: number, startDate?: Date, endDate?: Date): ActivitySummary => {
        const summary: ActivitySummary = {
            total_actions: 0,
            most_frequent_action: '',
            average_metadata_duration: 0,
            most_frequent_metadata_page: '',
        };

        // filters the data based on the parameters
        const filtered = activityData.filter((activity) => {
            if (activity.user_id !== userId) return false;
            if (startDate && activity.timestamp < startDate) return false;
            if (endDate && activity.timestamp > endDate) return false;
            return true;
        });

        if (filtered.length === 0) {
            return summary;
        }

        const total_actions = filtered.length;
        //data structures to save the values and the names
        const actionCounts: Record<string, number> = {};
        const pageCounts: Record<string, number> = {};
        let totalDuration = 0;

        //iterate over all the found data and store the values, names and the duration
        for (const activity of filtered) {
            actionCounts[activity.action] = (actionCounts[activity.action] || 0) + 1;
            pageCounts[activity.metadata.page] = (pageCounts[activity.metadata.page] || 0) + 1;
            totalDuration += activity.metadata.duration;
        }

        //convert to array and sort to get the ones with highets values
        const most_frequent_action = Object.entries(actionCounts).sort((a, b) => b[1] - a[1])[0][0];
        const most_frequent_page = Object.entries(pageCounts).sort((a, b) => b[1] - a[1])[0][0];
        const average_duration = Number((totalDuration / total_actions).toFixed(2));

        //sets the data
        summary.total_actions = total_actions;
        summary.most_frequent_action = most_frequent_action;
        summary.average_metadata_duration = average_duration;
        summary.most_frequent_metadata_page = most_frequent_page;

        return summary;
    }

    public getActionTrends = (start: Date, end: Date): ActionTrend[] => {
        const activitiesInPeriod = activityData.filter(activity =>
            activity.timestamp >= start && activity.timestamp <= end
        );

        //data structure to get the data
        const userActionFrequency: Record<string, number> = {};

        //iterate over the data and save the actions in pair with the frequency
        for (const activity of activitiesInPeriod) {
            const pairKey = `${activity.user_id}|${activity.action}`;
            userActionFrequency[pairKey] = (userActionFrequency[pairKey] || 0) + 1;
        }

        //filter the data and get the top 3 actions
        const trendingActions: ActionTrend[] = [];
        Object.entries(userActionFrequency).sort((a, b) => b[1] - a[1]).slice(0, 3)
            .map(([pairKey, count]) => {
                const [id, actionName] = pairKey.split('|');
                const trending: ActionTrend = {
                    user_id: Number(id),
                    action: actionName,
                    count: count
                }
                trendingActions.push(trending);
            });

        return trendingActions;
    }
}

export default ActivityService;