import { Request, Response } from "express";
import HttpError from "../Errors/HttpError";
import ActivityService from "../Services/ActivityService";
import { ActionTrend, Activity, ActivitySummary } from "../Interfaces/Activity";
import { activityData, setActivityData } from "../Data/DataStorage";

class ActivityController {

    private service: ActivityService;

    constructor() {
        this.service = new ActivityService();
    }

    public loadActivityData = async (req: Request, res: Response): Promise<void> => {
        try {
            if (activityData.length != 0) {
                res.status(200).json({
                    message: "Data already stored!",
                    status: true
                })
                return;
            }
            const fetchedData: Activity[] = await this.service.fetchActivityData();
            setActivityData(fetchedData);
            res.status(200).json({
                message: "Successfully stored data",
                status: true
            })
            return;
        }
        catch (err) {
            const error = err as Error;
            res.status(500).json({
                message: error.message,
                status: false
            });
        }
    }

    public getUserActivities = (req: Request, res: Response): void => {
        try {
            const { user_id } = req.params;
            const { start_time, end_time } = req.query;

            const userId = parseInt(user_id, 10);
            if (isNaN(userId)) {
                res.status(400).json({
                    message: 'invalid user_id',
                    status: false
                });
                return;
            }

            const startTime = start_time ? new Date(start_time as string) : undefined;
            const endTime = end_time ? new Date(end_time as string) : undefined;

            if ((startTime && isNaN(startTime!.getTime())) || (endTime && isNaN(endTime!.getTime()))) {
                throw new HttpError('Start date or end date are invalids!', 400);
            }

            const summary: ActivitySummary = this.service.getSummary(userId, startTime, startTime);
            res.status(200).json({
                summary: summary,
                status: true
            })
            return;
        }
        catch (err) {
            const error = err as Error;
            res.status(500).json({
                message: error.message,
                status: false
            });
        }
    }

    public getActionTrends = (req: Request, res: Response): void => {
        try{
            const { start_time, end_time } = req.query;

            const startTime = new Date(start_time as string);
            const endTime = new Date(end_time as string);

            if ((startTime && isNaN(startTime!.getTime())) || (endTime && isNaN(endTime!.getTime()))) {
                throw new HttpError('Start date or end date are missing!', 400);
            }

            const tredingActions: ActionTrend[] = this.service.getActionTrends(startTime, endTime);

            res.json({
                trending_actions: tredingActions,
                status: true
            })
            return;
        }
        catch (err) {
            const error = err as Error;
            res.status(500).json({
                message: error.message,
                status: false
            });
        }
    }
}

export default ActivityController;