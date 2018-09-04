import themeReducer from './themeReducer';
import sidebarReducer from './sidebarReducer';
import CommitteesReducer from './committees';
import UrbanCoreReducer from './urbancore';
import ProductsReducer from './products';
import AddresstypeReducer from './addresstype';
import PartnersReducer from './partners';
import BeneficiariesReducer from './beneficiaries';
import PeriodsReducer from './periods';
import RationsReducer from './rations';
import ZonesReducer from './zones';


import {reducer as reduxFormReducer} from 'redux-form';
import {combineReducers} from 'redux';

export default combineReducers({
  form: reduxFormReducer, // mounted under "form",
  theme: themeReducer,
  sidebar: sidebarReducer,
  committees: CommitteesReducer,
  urbancore: UrbanCoreReducer,
  products: ProductsReducer,
  addresstype: AddresstypeReducer,
  partners: PartnersReducer,
  beneficiaries: BeneficiariesReducer,
  periods: PeriodsReducer,
  rations: RationsReducer,
  zones: ZonesReducer
});