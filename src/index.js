import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import configureStore from './store/store';
import { taskCompleted, titleChanged, taskDeleted } from './store/task';

const store = configureStore();

const App = () => {
  const [state, setState] = useState(store.getState());

  useEffect(() => {
    store.subscribe(() => {
      setState(store.getState());
    });
  }, []);

  const completeTask = (taskId) => {
    store.dispatch(taskCompleted(taskId));
  };

  const changeTitle = (taskId) => {
    store.dispatch(titleChanged(taskId));
  };

  const deleteTask = (taskId) => {
    store.dispatch(taskDeleted(taskId));
  };

  return (
    <div className="container">
      <h1 className="text-center my-3">React Redux App</h1>
      {state.length ? (
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
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
