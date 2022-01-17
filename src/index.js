import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Provider, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import configureStore from './store/store';
import {
  titleChanged,
  taskDeleted,
  completeTask,
  getTasks,
} from './store/task';

const store = configureStore();

const App = () => {
  const state = useSelector((state) => state);
  console.log(state);

  useEffect(() => {
    store.dispatch(getTasks());
  }, []);

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
                <p className="card-text">
                  <span className="fw-bolder">Task #{task.id}:</span>{' '}
                  {task.title}
                </p>
                <p className="card-text">
                  <span className="fw-bolder">Status Complete:</span>{' '}
                  {task.completed.toString()}
                </p>
                <div className="btn-group" role="group">
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => store.dispatch(completeTask(task.id))}
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
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
