import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { TASK_UPDATED } from './store/actionTypes';
import { initiateStore } from './store/store';
import * as actions from './store/actions';

const store = initiateStore();

const App = () => {
  const [state, setState] = useState(store.getState());

  useEffect(() => {
    store.subscribe(() => {
      setState(store.getState());
    });
  }, []);

  const completeTask = (taskId) => {
    store.dispatch(actions.taskCompleted(taskId));
  };

  const changeTitle = (taskId) => {
    store.dispatch(actions.titleChanged(taskId));
  };

  return (
    <div className="container">
      <h1 className="text-center my-3">React Redux App</h1>
      <div className="list-group">
        {state.map((task) => (
          <div className="card list-group-item" key={task.id}>
            <div className="card-body">
              <p className="card-text">{task.title}</p>
              <p className="card-text">{`Status Complete: ${task.completed}`}</p>
              <div className="btn-group" role="group">
                <button
                  className="btn btn-outline-primary"
                  onClick={() => completeTask(task.id)}
                >
                  Complete
                </button>
                <button
                  className="btn btn-outline-primary"
                  onClick={() => changeTitle(task.id)}
                >
                  Change Title
                </button>
                <button className="btn btn-outline-primary">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
