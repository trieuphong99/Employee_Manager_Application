import React from 'react';
import './General.css';
import { connect } from 'react-redux';
import * as actions from '../../../actions/account';

function General(props) {
  const currentUser = props.currentUser
  return (
    <div>
      <div className="general">
        <div className='title-general'>General Account Settings</div>
        <div className='private-information'>
          <div className='title-information'>Private informations</div>
          <div className="row">
            <div className="col content-information">
              <div className="row">
                <div className="col-4 text-item-ganeral">
                  Name:
                </div>
                <div className="col-8">
                  {currentUser.profile.name}
                </div>
              </div>
              <div className="row">
                <div className="col-4 text-item-ganeral">
                  Gender:
                </div>
                <div className="col-8">
                  {currentUser.profile.sex}
                </div>
              </div>
              <div className="row">
                <div className="col-4 text-item-ganeral">
                  Birthday:
                </div>
                <div className="col-8">
                  {currentUser.profile.date_of_birth}
                </div>
              </div>
            </div>
            <div className="col content-information">
              <div className="row">
                <div className="col-4 text-item-ganeral">
                  Email:
                </div>
                <div className="col-8">
                  {currentUser.email}
                </div>
              </div>
              <div className="row">
                <div className="col-4 text-item-ganeral">
                  Phone:
                </div>
                <div className="col-8">
                  {currentUser.profile.phone_number}
                </div>
              </div>
              <div className="row">
                <div className="col-4 text-item-ganeral">
                  Address:
                </div>
                <div className="col-8">
                  {currentUser.profile.address}
                </div>
              </div>
            </div>
          </div>
          
        </div>
        <div className='staff-information'>
          <div className='title-information'>Staff information</div>
          <div className="row">
            <div className="col content-information">
              <div className="row">
                <div className="col-4 text-item-ganeral">
                  Staff ID:
                </div>
                <div className="col-8">
                  {currentUser.code}
                </div>
              </div>
              <div className="row">
                <div className="col-4 text-item-ganeral">
                  Position:
                </div>
                <div className="col-8">
                  {currentUser.position}
                </div>
              </div>
              <div className="row">
                <div className="col-4 text-item-ganeral">
                  ID Card:
                </div>
                <div className="col-8">
                  {currentUser.id_card}
                </div>
              </div>
            </div>
            <div className="col content-information">
              <div className="row">
                <div className="col-4 text-item-ganeral">
                  Contract Type:
                </div>
                <div className="col-8">
                  {currentUser.contract_type !== null ? currentUser.contract_type : <>Updating ...</>}
                </div>
              </div>
              <div className="row">
                <div className="col-4 text-item-ganeral">
                  Join Date:
                </div>
                <div className="col-8">
                  {currentUser.joining_date}
                </div>
              </div>
              <div className="row">
                <div className="col-4 text-item-ganeral">
                  Official Date:
                </div>
                <div className="col-8">
                  {currentUser.official_date !== null ? currentUser.official_date : <>Updating ...</>}
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

const mapStatetoProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getInfoCurrentUser: () => { dispatch(actions.getInfoCurrentUser()) }
  }
}
export default connect(mapStatetoProps, mapDispatchToProps)(General);