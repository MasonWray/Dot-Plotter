import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createReduxStore } from './redux/store';

import App from './components/App';

import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import './styles.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={createReduxStore()}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);