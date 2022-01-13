import { TASK_UPDATED } from "./actionTypes";

export function taskReducer(state = [], action) {
  switch (action.type) {
    case TASK_UPDATED: {
      const newState = [...state];
      const elementIndex = newState.findIndex(
        (element) => element.id === action.payload.id
      );
      newState[elementIndex] = { ...newState[elementIndex], ...action.payload };

      return newState;
    }
    default:
      return state;
  }
}
