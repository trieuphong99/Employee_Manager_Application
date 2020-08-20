import React, { useState, useEffect } from 'react';
import './Profile.css';
import Avatar from '../../../commons/assets/img/Avatar.png'
import General from './general/index'
import Connection from './connection/index'
import ChangePassword from './changePassword/index'
import { connect } from 'react-redux';
import * as actions from '../../actions/account';

function Profile(props) {
  const [profile, setProfile] = useState('General');

  useEffect(() => {
    props.getInfoCurrentUser();
    // eslint-disable-next-line
  }, []);

  const { currentUser } = props
  return (
    <div>
      {
        currentUser.profile !== undefined ?
          < div className="profile" >
            <div className='profile-left'>
              <div className='img-name-id'>
                <img className='img' src={Avatar} alt='avartar-img' />
                <div className='name-id'>
                  <p>{currentUser.profile.name}</p>
                  <p>{currentUser.code}</p>
                </div>
              </div>
              <div className='menu-profile-left'>
                {
                  _.map(['General', 'Connection', 'Change Password'], (type, index) => (
                    <div className='menu-profile-left-child' onClick={() => setProfile(type)} key={index}>{type}</div>
                  ))
                }
              </div>
            </div>
            <div className='profile-right'>
              {
                profile === 'General' ?
                  <General />
                  :
                  profile === 'Connection' ?
                    <Connection />
                    :
                    profile === 'Change Password' ?
                      <ChangePassword getBack={() => setProfile('General')} />
                      :
                      null
              }
            </div>
          </div >
          : null
      }
    </div>
  );
}
const mapStatetoProps = (state) => {
  return {
    currentUser: state.currentUser,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getInfoCurrentUser: () => { dispatch(actions.getInfoCurrentUser()) }
  }
}
export default connect(mapStatetoProps, mapDispatchToProps)(Profile);
