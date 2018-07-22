import _ from "lodash";
import ActivityType from './ActivityType';
import { ObjectID } from 'bson';
import T from 'i18n-react';
/**
 * Class to manage and validate activities
 * 
 * @class ActivityManager
 */
class ActivityManager {
  /**
   * Creates an instance of ActivityManager.
   * @param {Activity} activity 
   * @memberof ActivityManager
   */
  constructor(activity) {
    _.assign(this,activity);
  }
  
  validate(){
    if (!ActivityType[this.type]){
      console.error(`Activity type ${this.type} not exists`);
    }
  }

/**
 * Generates a new activity with default values depending of the type
 * 
 * @static
 * @param {string} type 
 * @memberof ActivityManager
 */
static generateActivity(type) {
    switch (type) {
      case ActivityType.Task:
        return {
          id: ObjectID().toHexString(),
          name: T.translate("workflow.newTask"),
          hasErrors: true,
          type: type
        };
      case ActivityType.Email:
        return {
          id: ObjectID().toHexString(),
          name: T.translate("workflow.newEmail"),
          type: type
        };
      case ActivityType.Condition:
        return {
          id: ObjectID().toHexString(),
          name: T.translate("workflow.newCondition"),
          hasErrors: true,
          type: type,
          childrenActivities: [
            {
              id: ObjectID().toHexString(),
              type: ActivityType.Sequence,
              label: T.translate("workflow.conditionTrue"),
              branchName: "true"
            },
            {
              id: ObjectID().toHexString(),
              type: ActivityType.Sequence,
              label: T.translate("workflow.conditionFalse"),
              branchName: "false"
            }
          ]
        };
      case ActivityType.Parallel:
        return {
          id: ObjectID().toHexString(),
          name: T.translate("workflow.newParallel"),
          type: type,
          childrenActivities: [
            {
              id: ObjectID().toHexString(),
              type: ActivityType.Sequence,
              label: T.translate("workflow.branch",{branchNumber: 1})
            },
            {
              id: ObjectID().toHexString(),
              type: ActivityType.Sequence,
              label: T.translate("workflow.branch",{branchNumber: 2})
            }
          ]
        };
      case ActivityType.Loop:
        return {
          id: ObjectID().toHexString(),
          name: T.translate("workflow.newLoop"),
          type: type,
          childrenActivities: [
            {
              id: ObjectID().toHexString(),
              type: ActivityType.Sequence,
              branchName: "loop",
            }
          ]
        };
  
      default:
      // Nothing
    }  
  }
}

export default ActivityManager;