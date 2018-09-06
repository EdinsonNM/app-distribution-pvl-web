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
import Distribution from '../containers/distribution/distibution';
import Products from '../containers/products/Products';
import Rations from '../containers/rations/Rations';
import RationsList from '../containers/rations/RationsList';
import Ration from '../containers/rations/Ration';
import Zones from '../containers/zones/Zones';
import DistributionNew from '../containers/distribution/DistributionNew';

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
    <Route path='/pages/productos' component={Products}/>
    <Route path='/pages/raciones/dashboard' component={Rations}/>
    <Route exact path='/pages/raciones/periodo/:id' component={RationsList}/>
    <Route exact path='/pages/raciones/periodo/:id/new' component={Ration}/>
    <Route path='/pages/comite/:id' component={Committee}/>
    <Route path='/pages/socios/dashboard' component={Partners}/>
    <Route path='/pages/socios/lista/:id' component={PartnersList}/>
    <Route path='/pages/beneficiarios/dashboard' component={Beneficiaries}/>
    <Route path='/pages/beneficiarios/lista' component={BeneficiariesList}/>
    <Route path='/pages/beneficiarios/new' component={Beneficiary}/>
    <Route path='/pages/zonas' component={Zones}/>
    <Route exact path='/pages/distribucion' component={Distribution}/>
    <Route exact path='/pages/distribucion/new' component={DistributionNew}/>
  </Switch>
);

export default Router;
