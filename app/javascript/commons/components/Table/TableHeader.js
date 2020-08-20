import React from 'react';
import IconDow from "../../assets/img/dow.png";
import IconUp from "../../assets/img/up.png";

export default function TableHeader({ content }) {
  return (
    <div className="table-sort">
      <div className="mt-2">{content}</div>
      <div className="ml-2">
        <div className="icon-up">
          <img
            src={IconUp}
            className="icon-dow-up"
            alt="icon_dow"
          ></img>
        </div>
        <div className="icon-dow">
          <img
            src={IconDow}
            className="icon-dow-up"
            alt="icon_up"
          ></img>
        </div>
      </div>
    </div>
  )
}
