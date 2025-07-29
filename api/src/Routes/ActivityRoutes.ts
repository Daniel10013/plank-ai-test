import { Router, Request, Response } from "express";
import ActivityController from "../Controllers/ActivityController";

const router = Router();
const activityController = new ActivityController();

router.get('/load_data', activityController.loadActivityData);
router.get('/summary/:user_id', activityController.getUserActivities);
router.get('/action_trends', activityController.getActionTrends);

export default router;