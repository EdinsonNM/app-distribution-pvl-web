import React from 'react';
import App from './app/App';
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {HashRouter} from 'react-router-dom';
import store from './app/store';
import ScrollToTop from './app/ScrollToTop';
import 'react-toastify/dist/ReactToastify.css';
render(
  <Provider store={store}>
    <HashRouter >
      <ScrollToTop>
        <App/>
      </ScrollToTop>
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);
