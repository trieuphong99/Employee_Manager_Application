import React from "react";

const CrossBar = (props) => {
  return (
    <div className="row cross-bar">
      <div className="col cross-bar-inlate">
        <div className="row">
          <div className="col-9">In late</div>
          <div className="col-3">{props.inLate}</div>
        </div>
      </div>
      <div className="col cross-bar-leave">
        <div className="row">
          <div className="col-9">Leave early</div>
          <div className="col-3">{props.leaveEarly}</div>
        </div>
      </div>
      <div className="col cross-bar-full">
        <div className="row">
          <div className="col-9">Full day-off</div>
          <div className="col-3">{props.fullDayoff}</div>
        </div>
      </div>
      <div className="col cross-bar-half">
        <div className="row">
          <div className="col-9">Half day-off</div>
          <div className="col-3">{props.halfDayoff}</div>
        </div>
      </div>
    </div>
  );
};
export default CrossBar;
