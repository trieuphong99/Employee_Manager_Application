import React from 'react';
import { connect } from 'react-redux';
import {compose } from 'redux';
import LoadingIcon from '../../../admin/asset/img/loading.gif';

function GlobalLoading(props) {
  const {showLoading} = props;
    let xhtml = null;
    if(showLoading){
      xhtml = (
        <div className="globalLoading">
          <img src={LoadingIcon} alt="loading" className="icon-loading"/>
        </div>
      );
    }
  return xhtml;
}

const mapStateToProps = state => {
  return {
    showLoading: state.loadingReducer.showLoading,
  };
};

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(
  withConnect
)
(GlobalLoading);
