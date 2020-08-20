import React, {useState} from 'react';
import {Tooltip} from 'reactstrap';

export const TooltipItem = (props) => {
  const {item} = props;
  const [isOpenTool, setIsOpen] = useState(false);
  const openTooltip = () => setIsOpen(!isOpenTool);
  return (
    <span>
      <p id={"reason-" + item.id}>
        {item.reason.substring(0,8)}...
      </p>
      <Tooltip style={{backgroundColor: '#FFFFFF', color: '#000000'}} placement="bottom" isOpen={isOpenTool} target={"reason-" + item.id} toggle={openTooltip}>
        {item.reason}
      </Tooltip>
    </span>
  )
}