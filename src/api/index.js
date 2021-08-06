/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import axios from 'axios';
import endpoints from './endpoints';

// auth Token Variable
let authToken;
// Base URL Variable
let baseUrl;

/**
 * Axios request Class
 * Implement app global setted Auth token, and baseURl
 *
 * @export
 * @class Axios
 */
export default class Axios {
  /**
   *
   * set Axios baseUrl
   * @static
   * @memberof Axios
   */
  static set baseUrl(url) {
    baseUrl = url;
  }

  /**
   *
   * set Axios token
   * @static
   * @memberof Axios
   */
  static set authToken(token) {
    authToken = token;
  }

  /**
   *Creates an instance of Axios.
   * @param {*} [{ endpointName = '', ...AxiosRegularOptions }={}]
   * @memberof Axios
   */
  constructor(endpoint = '', options = {}) {
    this.endpoint = endpoint;
    this.options = options;
    this.axios = this.createAxiosInstance();
    this.cancelToken = this.createCancelToken();
    this.setDefaultAxiosConfigs();
  }

  /**
   * create Axios instance with model
   *
   * @memberof Axios
   */
  createAxiosInstance() {
    return axios.create({
      validateStatus: (status) => status >= 200 && status < 300,
    });
  }

  /**
   * Create axios cancel token to make the request cancelable
   *
   * @memberof Axios
   */
  createCancelToken() {
    const { CancelToken } = axios;
    return CancelToken.source();
  }

  /**
   * Set Axios default custom configs
   *
   * @memberof Axios
   */

  setDefaultAxiosConfigs() {
    // set axios base url
    this.axios.defaults.baseURL = baseUrl;
    // set axios Accept header
    this.axios.defaults.headers.common['Content-Type'] = 'application/json';
    // set cancel token
    this.axios.defaults.cancelToken = this.cancelToken.token;

    // set axios response intereceptor to receive server response on errors
    this.axios.interceptors.response.use(
      (response) => response.data,
      ({ response }) => {
        const { data } = response;
        return Promise.reject(data);
      },
    );
    // set axios request interceptor to send authorization token on request
    this.axios.interceptors.request.use(
      (configs) => {
        if (authToken) {
          configs.headers.Authorization = authToken;
        }
        return configs;
      },
      (error) => Promise.reject(error),
    );
  }

  /**
   * Make Axios request promise
   *
   * @returns {promise}
   * @memberof Axios
   */
  send(uriVariable = null) {
    const reqOptions = {
      ...this.options,
      ...endpoints[this.endpoint],
    };
    return this.axios.request({
      ...reqOptions,
      ...(uriVariable && {
        url: `${reqOptions.url}/${uriVariable}`,
      }),
    });
  }

  /**
   * Cancel Axios request
   *
   * @memberof Axios
   */
  abort() {
    return this.cancelToken.cancel('Request Cancelled by Client');
  }
}
