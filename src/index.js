import React from 'react';
import ReactDOM from 'react-dom';
import {ConfigProvider } from 'antd'
import App from './App'
import esES from 'antd/lib/locale/es_ES';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import reducer from './reducers';
import moment from 'moment';

moment.locale('es')

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(reducer, composeEnhancers());

ReactDOM.render(
  <ConfigProvider locale={esES}>
    <Provider store={store}>
      <App />
    </Provider>
  </ConfigProvider>
  , document.getElementById('App'),
  );

  export default App;