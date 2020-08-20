import React from 'react';
import './Connection.css';
import ChatWork from '../../../../commons/assets/img/ChatWork.png'
import Slack from '../../../../commons/assets/img/Slack.png'

function Connection() {
  return (
    <div className="connection">
      <div className='title-connection'>Connection</div>
      <div className='chat-work'>
        <img className='img' src={ChatWork} alt='avartar-img' />
        <div className='name-chat'>chat_id</div>
        <div className='status-connect'>Disconnect</div>
      </div>
      <div className='slack'>
        <img className='img' src={Slack} alt='avartar-img' />
        <div className='status-connect' >Connect</div>
      </div>
    </div>
  );
}

export default Connection;