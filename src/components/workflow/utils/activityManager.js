import _ from 'lodash';
import ActivityType from '../classes/ActivityType';
import { ObjectID } from 'bson';
import T from 'i18n-react';

export function handleOnChangeChildren(activity) {
  let children = this.getChildrenActivities();
  let index = _.findIndex(children, { "_id": activity._id });
  let newChildren = [
    ...children.slice(0, index),
    activity,
    ...children.slice(index + 1)
  ];
  let newActivity = _.assign({}, this.props.activity, { childrenActivities: newChildren });

  console.log(newActivity);
  this.props.onChange && this.props.onChange(newActivity);
}

export function generateActivity(type) {
  switch (type) {
    case ActivityType.Task:
      return {
        _id: ObjectID().toHexString(),
        name: T.translate("workflow.newTask"),
        type: type
      };
    case ActivityType.Email:
      return {
        _id: ObjectID().toHexString(),
        name: T.translate("workflow.newEmail"),
        type: type
      };
    case ActivityType.Condition:
      return {
        _id: ObjectID().toHexString(),
        name: T.translate("workflow.newCondition"),
        type: type,
        childrenActivities: [
          {
            _id: ObjectID().toHexString(),
            type: ActivityType.Sequence,
            label: T.translate("workflow.conditionTrue"),
            branchName: "true"
          },
          {
            _id: ObjectID().toHexString(),
            type: ActivityType.Sequence,
            label: T.translate("workflow.conditionFalse"),
            branchName: "false"
          }
        ]
      };
    case ActivityType.Parallel:
      return {
        _id: ObjectID().toHexString(),
        name: T.translate("workflow.newParallel"),
        type: type,
        childrenActivities: [
          {
            _id: ObjectID().toHexString(),
            type: ActivityType.Sequence,
            label: T.translate("workflow.branch",{branchNumber: 1})
          },
          {
            _id: ObjectID().toHexString(),
            type: ActivityType.Sequence,
            label: T.translate("workflow.branch",{branchNumber: 2})
          }
        ]
      };
    case ActivityType.Loop:
      return {
        _id: ObjectID().toHexString(),
        name: T.translate("workflow.newLoop"),
        type: type,
        childrenActivities: [
          {
            _id: ObjectID().toHexString(),
            type: ActivityType.Sequence,
            branchName: "loop",
          }
        ]
      };

    default:
    // Nothing
  }
}