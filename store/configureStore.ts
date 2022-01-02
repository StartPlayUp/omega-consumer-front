import { createWrapper } from "next-redux-wrapper";
import { applyMiddleware, compose, createStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware, { Task } from 'redux-saga';

import reducer from "../reducer";
import rootSaga from '../sagas';


export interface SagaStore extends Store {
  sagaTask: Task;
}

const loggerMiddleware = ({ }) => (next: (arg0: any) => any) => (action: any) => {
  return next(action);
};

const configureStore = () => {

  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware, loggerMiddleware];
  const enhancer = process.env.NODE_ENV === "production"
    ? compose(applyMiddleware(...middlewares))
    : composeWithDevTools(applyMiddleware(...middlewares));
  const store = createStore(reducer, enhancer);
  (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === "development",
});

export default wrapper;
