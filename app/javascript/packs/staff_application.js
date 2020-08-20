/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb


// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)

// console.log('Hello World from Webpacker')
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import myReducer from '../staff/reducer';
import Staff from '../staff';
import "bootstrap/dist/css/bootstrap.css";
import Push from 'push.js';

import '../commons/assets/css';
import '../commons/assets/css/breadcrumb.css';
import '../commons/assets/css/header.css';
import '../commons/assets/css/loading';
import '../admin/asset/css/account.css';

import './interceptor'

const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
axios.defaults.headers.common['X-CSRF-Token'] = token;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const configureStore = () => {
  const middlewares = [thunk];
  const enhancers = [applyMiddleware(...middlewares)];
  const store = createStore(myReducer, composeWithDevTools(...enhancers));
  return store;
};

App.staff = App.cable.subscriptions.create('StaffChannel', {
  received: data => {
    Push.create("Bunbu notification", {
      body: data.notification,
      timeout: 7000,
      onClick: function () {
        window.focus();
        this.close();
      }
    });
  },
});

const store = configureStore();

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <Staff />
    </Provider>,
    document.body.appendChild(document.createElement('div')),
  )
})
