import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Breadcrumb, BreadcrumbItem, Badge } from "reactstrap";
import Time from '../../../../commons/const/Time';
import * as accountActions from "../../../actions/account";
import { DeleteModal } from "../../../../commons/components/modal/";
import _ from 'lodash';
import AccountForm from '../accountForm'
import moment from "moment";

const DetailAccount = props => {
  const { data, accountActions } = props;
  const { id } = useParams()
  //------------------DETAIL ACCOUNT--------------
  useEffect(() => {
    accountActions.fetchAccountItemRequest(id);
    // eslint-disable-next-line
  }, []);
  //------------------DELETE ACCOUNT--------------
  const handleDeleteAccount = item => {
    accountActions.deleteAccountRequest(item.id);
  };

  return (
    <div className="container-fluid p-0">
      <Breadcrumb style={{ padding: "0 20px" }}>
        <BreadcrumbItem>
          <Link to="/">Home</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link to="/">Accounts</Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>detail</BreadcrumbItem>
      </Breadcrumb>
      {!_.isEqual(data, {}) && data !== undefined && (
        <div className="general">
          <div>
            <h3 style={{ margin: "10px 0 20px 0" }}>Private informations</h3>
          </div>
          <div className="private-information">
            <div className="row">
              <div className="col-sm">
                <div className="row">
                  <div className="col-3" style={{ fontWeight: 'bold' }}>Name</div>
                  <div className="col-9">{data.profile.name}</div>
                </div>
              </div>
              <div className="col-sm">
                <div className="row">
                  <div className="col-4" style={{ fontWeight: 'bold' }}>Phone number</div>
                  <div className="col-8">{data.profile.phone_number}</div>
                </div>
              </div>
              <div className="col-sm">
                <div className="row">
                  <div className="col-3" style={{ fontWeight: 'bold' }}>Address</div>
                  <div className="col-9">{data.profile.address}</div>
                </div>
              </div>
            </div>
            <div className="row" style={{ marginTop: "1em" }}>
              <div className="col-sm">
                <div className="row">
                  <div className="col-3" style={{ fontWeight: 'bold' }}>Gender</div>
                  <div className="col-9">{data.profile.sex}</div>
                </div>
              </div>
              <div className="col-sm">
                <div className="row">
                  <div className="col-4" style={{ fontWeight: 'bold' }}>Date of birth</div>
                  <div className="col-8">{moment(data.profile.date_of_birth).format(Time.DMY)}</div>
                </div>
              </div>
              <div className="col-sm">
                <div className="row">
                  <div className="col-3" style={{ fontWeight: 'bold' }}>Email</div>
                  <div className="col-9">{data.email}</div>
                </div>
              </div>
            </div>
            <div className="row" style={{ marginTop: "1em" }}>
              <div className="col-sm">
                <div className="row">
                  <div className="col-3" style={{ fontWeight: 'bold' }}>ID card</div>
                  <div className="col-9">{data.id_card}</div>
                </div>
              </div>
              <div className="col-sm">
                <div className="row">
                  <div className="col-4" style={{ fontWeight: 'bold' }}>Contract type</div>
                  <div className="col-8">{data.contract_type}</div>
                </div>
              </div>
              <div className="col-sm">
                <div className="row">
                  <div className="col-3" style={{ fontWeight: 'bold' }}>Position</div>
                  <div className="col-9">{data.position}</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 style={{ margin: "10px 0 20px 0" }}>Staff information</h3>
          </div>
          <div className="staff-information">
            <div className="row">
              <div className="col-sm">
                <div className="row">
                  <div className="col-4" style={{ fontWeight: 'bold' }}>Joined date</div>
                  <div className="col-8">{moment(data.joining_date).format(Time.DMY)}</div>
                </div>
              </div>
              <div className="col-sm">
                <div className="row">
                  <div className="col-3" style={{ fontWeight: 'bold' }}>Status</div>
                  <div className="col-9">
                    {data.status ? (
                      <Badge href="#" color="success">
                        Active
                      </Badge>
                    ) : (
                        <Badge href="#" color="danger">
                          Deactive
                      </Badge>
                      )}
                  </div>
                </div>
              </div>
              <div className="col-sm"></div>
            </div>
            <div className="row" style={{ marginTop: "1em" }}>
              <div className="col-sm">
                <div className="row">
                  <div className="col-4" style={{ fontWeight: 'bold' }}>Official date</div>
                  <div className="col-8">{data.official_date !==null ? moment(data.official_date).format(Time.DMY) : ""}</div>
                </div>
              </div>
              <div className="col-sm">
                <div className="row">
                  <div className="col-3" style={{ fontWeight: 'bold' }}>Roles</div>
                  <div className="col-9">{data.roles[0].name}</div>
                </div>
              </div>
              <div className="col-sm"></div>
            </div>
          </div>
          <div className="d-flex justify-content-center pt-4">
            <AccountForm
              buttonLabel="Edit"
              title="Edit account"
              item={data}
              id={data.id}
            />
            <DeleteModal item={data} deleteAccount={handleDeleteAccount} />
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    data: state.accountReducer.detail
  };
};

const mapDispatchToProps = dispatch => {
  return {
    accountActions: bindActionCreators(accountActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailAccount);
