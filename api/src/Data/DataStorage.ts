import { Activity } from "../Interfaces/Activity";

let activityData: Activity[] = [];

function setActivityData(activities: Activity[]){
    activityData = activities;
}

export {
    activityData,
    setActivityData
}