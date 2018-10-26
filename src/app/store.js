import {applyMiddleware, createStore, compose} from 'redux';
import reducer from '../redux/reducers/index';
import rootEpic from '../redux/epics';
import { createEpicMiddleware } from 'redux-observable';
import { createLogger } from 'redux-logger';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const epicMiddleware = createEpicMiddleware();
const getMiddleware = () => {
  if (process.env.NODE_ENV === 'production') {
      return applyMiddleware(epicMiddleware);
  }
  return applyMiddleware(epicMiddleware, createLogger());
};
const store = createStore(reducer,composeEnhancers(getMiddleware()) );

epicMiddleware.run(rootEpic);
export default store;
