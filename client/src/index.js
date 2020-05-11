import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import FontAwesome from './config/fontawesome';
import * as serviceWorker from './serviceWorker';
import './index.scss';

FontAwesome.buildLibrary();

const render = () => {
  const App = require('./App').default;

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
}

render();

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./App', render);
}

serviceWorker.unregister();
