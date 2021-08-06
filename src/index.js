/* eslint-disable react/jsx-filename-extension */
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'index.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import Axios from 'api';
import store from 'redux/store';
import App from './App';

const apiUrlEnvVariables = {
  development: process.env.REACT_APP_DEV_API_BASE_URL,
  production: process.env.REACT_APP_PROD_API_BASE_URL,
  test: process.env.REACT_APP_TEST_API_BASE_URL,
};

Axios.baseUrl = apiUrlEnvVariables[process.env.NODE_ENV];

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root'),
);
