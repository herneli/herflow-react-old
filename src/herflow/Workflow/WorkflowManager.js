import React from 'react';
import 'jsplumb';
import ActivityBox from '../activities/ActivityBox';
import ActivityInitial from '../activities/ActivityInitial';
import ActivityFinal from '../activities/ActivityFinal';
import ActivityTask from '../activities/ActivityTask';
import ActivityEmail from '../activities/ActivityEmail';
import ActivitySequence from '../activities/ActivitySequence';
import ActivityBranch from '../activities/ActivityBranch';
import ActivityLoop from '../activities/ActivityLoop';
import ActivityCondition from '../activities/ActivityCondition';
import { ObjectID } from 'bson';
import _ from 'lodash';

const arrowOverlay = {
  width: 6, 
  length: 6, 
  foldback: 0.8, 
  location: 1, 
}

const defaultPaintStyle = {
  stroke: "#aaaaaa",
  strokeWidth: 2
};

class WorkflowManager {
    constructor(workflow) {
      // Create jsPlumbInstance
      let jsPlumb = window.jsPlumb;
      this.jsPlumbInstance = jsPlumb.getInstance();
      this.jsPlumbInstance.setContainer("workflow-canvas");
      this.jsPlumbInstance.Defaults.PaintStyle = defaultPaintStyle;
      this.jsPlumbInstance.Defaults.Connector = ["Flowchart", { cornerRadius: 4, midpoint: 1, stub: 10 }];
      this.jsPlumbInstance.Defaults.Endpoint = "Blank";
      this.jsPlumbInstance.Defaults.Anchor = ["Top", "Bottom"];

      // Register standard activities
      this.activities = [];
      this.registerActivity(ActivityInitial);
      this.registerActivity(ActivityFinal);
      this.registerActivity(ActivityTask);
      this.registerActivity(ActivityEmail);
      this.registerActivity(ActivitySequence);
      this.registerActivity(ActivityBranch);
      this.registerActivity(ActivityLoop);
      this.registerActivity(ActivityCondition);
      // Reset clipboard
      this.activityClipboard = null;

      // Bindings
      this.createConnections = this.createConnections.bind(this);
      this.connect = this.connect.bind(this);
    }

    registerActivity(registerActivity){
      this.activities.push(registerActivity);
    }
  
    setActivityClipboard(activity){
      this.activityClipboard = activity;
    }

    getActivityClipboard(){
      return this.activityClipboard;
    }

    getSelectableActivities(){
      let selectableActivities= [];
      _.forEach(this.activities,function(activity){
        if (!activity.excludeSelector){
          selectableActivities.push(activity);
        }
      });
      return selectableActivities;
    }

    getActivityChart(activity){
      const activityRegistry = _.find(this.activities,{type: activity.type});
      if (activityRegistry){
        return activityRegistry.ActivityChart;
      } else {
        throw Error("Activity " + activity.type + " not found");
      }
    }

    renderActivityBox(props){
      return (      
        <ActivityBox 
          workflow={props.workflow}
          activity={props.activity}
          onCut={props.onCut}
          onEdit={props.onEdit}
          onChange={props.onChange}/>
      );
    }

    generateActivity(type) {
      const activityRegistry = _.find(this.activities,{type: type});
      if (activityRegistry){
        
        let activity = activityRegistry.generateActivity(this);
        if (activityRegistry.validate){
          activity.errors = activityRegistry.validate(this,activity);
        }
        return activity;
      } else {
        throw Error("Activity " + type + " not found");
      }
    }

    handleOnChangeChildren(activity) {
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

    connect(source, destination,options) {
      let connectObject = _.assign({},{ source: source, target: destination},options);
      this.jsPlumbInstance.connect(connectObject);
    }
    
    createConnectionsSequential(activity){
      let returnNode;
      let nodes = [];
      let activityId = 'activity-' + activity.id;
      if (!activity.isMain){
        nodes.push({ initial: activityId + '-label', final: activityId + "-label" });
      }
      activity.childrenActivities && activity.childrenActivities.forEach(function (activity) {
        nodes.push(this.createConnections(activity));
      }.bind(this));
      if (nodes.length > 0) {
        returnNode = { initial: nodes[0].initial, final: nodes[nodes.length - 1].final };
        if (nodes.length > 1) {
          for (let i = 0; i < nodes.length - 1; i++) {
            this.connect(nodes[i].final, nodes[i + 1].initial);
          }
        }
      }
      return returnNode;      
    }

    createConnectionsParallel(activity){
      let activityId = 'activity-' + activity.id;    
      let finalPointId = activityId + "-final";
          
      if (activity.childrenActivities && activity.childrenActivities.length > 0) {
        activity.childrenActivities.forEach(function (childrenActivity) {
          let parallelNode = this.createConnections(childrenActivity);
          this.connect(activityId, parallelNode.initial);
          this.connect(parallelNode.final, finalPointId);
          if (activity.type ==="Loop"){
            let loopBackId = activityId + "-loop-back";
            this.connect(finalPointId, loopBackId,{anchor: "Left"});
            this.connect(loopBackId,activityId,{anchor: "Left", overlays: [["Arrow", arrowOverlay]]});
          }
        }.bind(this));

        return { initial: activityId, final: finalPointId };
      } else {
        this.connect(activityId, finalPointId);
        return { initial: activityId, final: finalPointId };
      }      
    }

    newId(){
      return ObjectID().toHexString();
    }

    createConnectionsSingle(activity){
      let activityId = 'activity-' + activity.id;
      return { initial: activityId, final: activityId };
    }

    resetJsPlumb(){
      this.jsPlumbInstance.reset();
    }

    createConnections(activity) {
      const activityRegistry = _.find(this.activities,{type: activity.type});
      if (activityRegistry.createConnections){
        return activityRegistry.createConnections(this, activity);
      }else{
        return this.createConnectionsSingle(activity);
      }
    }    
}



export default WorkflowManager;