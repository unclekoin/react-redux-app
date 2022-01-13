import * as actionTypes from "./actionTypes";

export function taskCompleted(id) {
  return {
    type: actionTypes.TASK_UPDATED,
    payload: { id, completed: true },
  };
}

export function titleChanged(id) {
  return {
    type: actionTypes.TASK_UPDATED,
    payload: { id, title: `The task #${id} is completed` },
  }
}