import { combineEpics } from 'redux-observable';
import CommitteeEpics from './committee';
import UrbanCoresEpics from './urbancore';
import ProductsEpics from './products';
import AddressTypeEpics from './addresstype';
export default combineEpics(
	CommitteeEpics,
	UrbanCoresEpics,
	ProductsEpics,
	AddressTypeEpics
)