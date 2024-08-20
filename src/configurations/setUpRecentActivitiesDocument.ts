import RecentActivitiesModel from "../models/RecentActivitiesModel";

export default async function setUpRecentActivitiesDocument() {
  try {
    const recentActivitiesDocument = await RecentActivitiesModel.findOne();
    if (!recentActivitiesDocument) {
      await new RecentActivitiesModel().save();
    }
  } catch (error: any) {
    throw new Error(
      "Error while setting up the recent activities document: " + error?.message
    );
  }
}
