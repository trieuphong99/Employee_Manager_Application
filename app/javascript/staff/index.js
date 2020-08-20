import React from 'react';
import { Router} from "react-router-dom";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './main';
import GlobalLoading from './helpers/globalLoading/index';
import { history } from '../commons/helpers/history/history';

function Staff() {
  return (
    <div className="App">
      <Router history={history}>
        <Main/>
        <ToastContainer/>
        <GlobalLoading/>
      </Router>
    </div>
  );
}

export default Staff;
