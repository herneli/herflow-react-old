import _ from 'lodash';
import ActivityType from '../classes/ActivityType';
import { ObjectID } from 'bson';
import T from 'i18n-react';

export function handleOnChangeChildren(activity) {
  let children = this.getChildrenActivities();
  let index = _.findIndex(children, { "id": activity.id });
  let newChildren = [
    ...children.slice(0, index),
    activity,
    ...children.slice(index + 1)
  ];
  let newActivity = _.assign({}, this.props.activity, { childrenActivities: newChildren });

  this.props.onChange && this.props.onChange(newActivity);
}

export function generateActivity(type) {
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