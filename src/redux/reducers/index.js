import themeReducer from './themeReducer';
import sidebarReducer from './sidebarReducer';
import CommitteesReducer from './committees';
import UrbanCoreReducer from './urbancore';
import ProductsReducer from './products';
import AddresstypeReducer from './addresstype';

import {reducer as reduxFormReducer} from 'redux-form';
import {combineReducers} from 'redux';

export default combineReducers({
  form: reduxFormReducer, // mounted under "form",
  theme: themeReducer,
  sidebar: sidebarReducer,
  committees: CommitteesReducer,
  urbancore: UrbanCoreReducer,
  products: ProductsReducer,
  addresstype: AddresstypeReducer
});