import { combineEpics } from 'redux-observable';
import CommitteeEpics from './committee';
import UrbanCoresEpics from './urbancore';
import ProductsEpics from './products';
import AddressTypeEpics from './addresstype';
import PartnerEpics from './partners';
import BeneficiaryEpics from './beneficiaries';
import PeriodsEpics from './periods';
import RationsEpics from './rations';
import ZonesEpics from './zones';
import DistributionEpics from './distribution';
import IncomesEpics from './incomes';
import OutgoingsEpics from './outgoings';
import UsersEpics from './users';
export default combineEpics(
	CommitteeEpics,
	UrbanCoresEpics,
	ProductsEpics,
	AddressTypeEpics,
	PartnerEpics,
	BeneficiaryEpics,
	PeriodsEpics,
	RationsEpics,
	ZonesEpics,
	DistributionEpics,
	IncomesEpics,
	OutgoingsEpics,
	UsersEpics
)