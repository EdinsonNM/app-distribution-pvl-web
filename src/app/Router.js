import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Layout from '../containers/_layout/Layout';
import MainWrapper from './MainWrapper';

import LogIn from '../containers/log_in/LogIn';
import Committees from '../containers/committees/committees';
import Partners from '../containers/partners/Partners';
import Committee from '../containers/committees/committee';
import PartnersList from '../containers/partners/PartnersList';
import Beneficiaries from '../containers/beneficiaries/Beneficiaries';
import BeneficiariesList from '../containers/beneficiaries/Beneficiaries-list';
import Beneficiary from '../containers/beneficiaries/Beneficiary';
import Products from '../containers/products/Products';
import Rations from '../containers/rations/Rations';
import RationsList from '../containers/rations/RationsList';
import Ration from '../containers/rations/Ration';
import Zones from '../containers/zones/Zones';
import ProgramationNew from '../containers/programation/ProgramationNew';
import Incomes from '../containers/incomes/Incomes';
import Income from '../containers/incomes/Income';
import ProductNew from '../containers/products/ProductNew';
import programation from '../containers/programation/programation';
import programationGroupDetail from '../containers/programation/programation-group-detail';
import ProductEdit from '../containers/products/ProductEdit';
import PartnerNew from '../containers/partners/PartnerNew';
import ReportInputOutput from '../containers/reports/input-output';

const Router = () => (
  <MainWrapper>
    <main>
      <Switch>
        <Route exact path='/' component={LogIn}/>
        <Route exact path='/log_in' component={LogIn}/>
        <Route path='/' component={wrappedRoutes}/>
      </Switch>
    </main>
  </MainWrapper>
);

const wrappedRoutes = () => (
  <div>
    <Layout/>
    <div className='container__wrap'>
      <Route path='/pages' component={Pages}/>
    </div>
  </div>
);

const Pages = () => (
  <Switch>
    <Route path='/pages/comites' component={Committees}/>
    <Route exact path='/pages/productos' component={Products}/>
    <Route exact path='/pages/productos/new' component={ProductNew}/>
    <Route exact path='/pages/productos/edit/:id' component={ProductEdit}/>
    <Route exact path='/pages/ingresos' component={Incomes}/>
    <Route exact path='/pages/ingresos/new' component={Income}/>
    <Route path='/pages/raciones/dashboard' component={Rations}/>
    <Route exact path='/pages/raciones/periodo' component={RationsList}/>
    <Route exact path='/pages/raciones/periodo/new' component={Ration}/>
    <Route path='/pages/comite/:id' component={Committee}/>
    <Route path='/pages/socios/dashboard' component={Partners}/>
    <Route path='/pages/socios/lista/:id' component={PartnersList}/>
    <Route exact path='/pages/socios/new' component={PartnerNew}/>
    <Route path='/pages/beneficiarios/dashboard' component={Beneficiaries}/>
    <Route path='/pages/beneficiarios/lista/:id' component={BeneficiariesList}/>
    <Route path='/pages/beneficiarios/new' component={Beneficiary}/>
    <Route path='/pages/zonas' component={Zones}/>
    <Route exact path='/pages/programacion' component={programation}/>
    <Route exact path='/pages/programacion/detalle/:month' component={programationGroupDetail}/>
    <Route exact path='/pages/programacion/new' component={ProgramationNew}/>
    <Route exact path='/pages/reports/input-output' component={ReportInputOutput}/>
  </Switch>
);

export default Router;
