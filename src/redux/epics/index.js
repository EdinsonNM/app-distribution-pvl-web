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
import ProgramationEpics from './programation';
import IncomesEpics from './incomes';
import OutgoingsEpics from './outgoings';
import UsersEpics from './users';
import ProgramationDetailEpics from './programationdetail';
import DocumentTypeEpics from './documenttype';
import ReportsEpics from './reports';
import BenefitTypeEpics from './benefittype';
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
	IncomesEpics,
	OutgoingsEpics,
	UsersEpics,
	ProgramationEpics,
	ProgramationDetailEpics,
	DocumentTypeEpics,
	ReportsEpics,
	BenefitTypeEpics
)