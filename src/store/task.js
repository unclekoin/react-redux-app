import { createAction, createReducer } from '@reduxjs/toolkit';

const initialState = [
  { id: 1, title: 'Task 1', completed: false },
  { id: 2, title: 'Task 2', completed: false },
  { id: 3, title: 'Task 3', completed: false },
];

const update = createAction('task/updated');
const remove = createAction('task/removed');

export function taskCompleted(id) {
  return update({ id, completed: true });
}

export function titleChanged(id) {
  return update({ id, title: `The task #${id} is completed` });
}

export function taskDeleted(id) {
  return remove({ id });
}

const taskReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(update, (state, action) => {
      const elementIndex = state.findIndex(
        (element) => element.id === action.payload.id
      );
      state[elementIndex] = { ...state[elementIndex], ...action.payload };
    })
    .addCase(remove, (state, action) => {
      return state.filter((element) => element.id !== action.payload.id);
    });
});

export default taskReducer;
