import {applyMiddleware, createStore} from 'redux';
import reducer from '../redux/reducers/index';
import rootEpic from '../redux/epics';
import { createEpicMiddleware } from 'redux-observable';
import { createLogger } from 'redux-logger';
import { ajax } from 'rxjs/observable/dom/ajax';

const epicMiddleware = createEpicMiddleware();
const getMiddleware = () => {
  if (process.env.NODE_ENV === 'production') {
      return applyMiddleware(epicMiddleware);
  }
  return applyMiddleware(epicMiddleware, createLogger());
};
const store = createStore(reducer, getMiddleware());

epicMiddleware.run(rootEpic);
export default store;
