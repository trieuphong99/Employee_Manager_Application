import React from 'react';
import { Router} from "react-router-dom";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './main';
import { history } from '../commons/helpers/history/history';
import GlobalLoading from '../commons/components/globalLoading/index';

function Admin() {
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

export default Admin;
