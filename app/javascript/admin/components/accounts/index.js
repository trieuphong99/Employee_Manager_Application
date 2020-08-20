import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Breadcrumb, BreadcrumbItem, Table, Badge } from "reactstrap";
import * as accountActions from "../../actions/account";
import IconSearch from "../../asset/img/search.png";
import { DeleteModal } from "../../../commons/components/modal/";
import Pagination from "../../../commons/components/pagination";
import AccountForm from "./accountForm";
import TableHeader from '../../../commons/components/Table/TableHeader';
import SortTarget from "../../../commons/components/sortTarget";

const ListAccounts = props => {
  const [currentPage, setCurrentPage] = useState(1);
  const [ftext, setText] = useState("");
  const [sortField, setSortField] = useState("status");
  const [sortType, setSortType] = useState("DESC");
  const { listAccount, totalPage, accountActions } = props;

  //------------------LIST ACCOUNT--------------
  useEffect(() => {
    accountActions.fetchListAccountRequest({ currentPage, sortType, sortField });
    // eslint-disable-next-line
  }, [currentPage, sortType, sortField]);

  //------------------SEARCH ACCOUNT--------------
  const isOnchange = e => {
    setText(e.target.value);
  };
  const sumbmitSearchAccount = e => {
    e.preventDefault();
    const { searchAccountRequest } = props.accountActions;
    searchAccountRequest(ftext);
  };

  //------------------DELETE ACCOUNT--------------
  const handleDeleteAccount = item => {
    const { deleteAccountRequest } = props.accountActions;
    deleteAccountRequest(item.id);
  };

  //------------------ONCLICK DETAIL ACCOUNT--------------
  let history = useHistory();

  const onClickDetailAccount = id => {
    history.push(`/admin/users/${id}`);
  };
  const letSort = field => {
    setSortType(sortType === "ASC" ? "DESC" : "ASC");
    setSortField(field);
  };
  return (
    <div className="container-fluid">
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to="/">Home</Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>Accounts</BreadcrumbItem>
      </Breadcrumb>
      <div className="saffs-search">
        <div style={{ display: "flex" }}>
          <AccountForm buttonLabel="Add" title="Add new account" />
          <div className="saffs-search-content">
            <form onSubmit={sumbmitSearchAccount} className="form-inline">
              <input
                name="ftext"
                onChange={isOnchange}
                className="form-control mr-sm-2"
                type="search"
                placeholder="input name or email"
                aria-label="Search"
              />
              <button className="btn btn-search my-2 my-sm-0" type="submit">
                <img src={IconSearch}></img>
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="table-content">
        <Table hover>
          <thead>
            <tr>
              <SortTarget type="code" value="Staff ID" sortType={sortType} sortField={sortField} letSort={() => letSort("code")} />
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <SortTarget type="status" value="Status" sortType={sortType} sortField={sortField} letSort={() => letSort("status")} />
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              listAccount === undefined || listAccount.length === 0 ?
                <tr>
                  <td colSpan={6}><p style={{ color: 'red', fontSize: '80%' }}>This account doesn't exist.</p></td>
                </tr>
                :
                listAccount !== undefined &&
                listAccount.map((value, key) => {
                  const status =
                    value.status === true
                      ? { name: "Active", color: "success" }
                      : { name: "Deactive", color: "danger" };
                  return (
                    <tr key={key}>
                      <th
                        onClick={() => onClickDetailAccount(value.id)}
                        scope="row"
                      >
                        {value.code}
                      </th>
                      <td onClick={() => onClickDetailAccount(value.id)}>
                        {value.profile.name}
                      </td>
                      <td>{value.email}</td>
                      <td>{value.roles[0].name}</td>
                      <td>
                        <Badge href="#" color={status.color}>
                          {status.name}
                        </Badge>
                      </td>
                      <td className="setting-button">
                        <AccountForm
                          buttonLabel="Edit"
                          title="Edit account"
                          item={value}
                          id={value.id}
                        />
                        <DeleteModal
                          item={value}
                          deleteAccount={handleDeleteAccount}
                        />
                      </td>
                    </tr>
                  );
                })
            }

          </tbody>
        </Table>

      </div>
      <div>
        <Pagination totalPage={totalPage} pageChange={setCurrentPage} />
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    listAccount: state.accountReducer.data,
    totalPage: state.accountReducer.total_page
  };
};

const mapDispatchToProps = dispatch => {
  return {
    accountActions: bindActionCreators(accountActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListAccounts);
