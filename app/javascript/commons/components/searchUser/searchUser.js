import React, { useState, useEffect, useRef } from "react";
import { Input } from "reactstrap";
import _ from "lodash";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../../../admin/actions/account";
import '../../../admin/components/timesheets/styles.css';
import moment from "moment";
import Time from "../../const/Time";

const SearchUser = props => {
  //code search
  const [showListStaff, setShowListStaff] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const [all_user, setAll_user] = useState(true);


  useEffect(() => {
    // dispatch(fetchListAccountRequest())
    dispatch(getAllUser(all_user));
  }, [all_user]);
  const list = useSelector(state => state.accountReducer);
  const listStaff = _.filter(list, n =>
    _.includes(_.toLower(n.name), _.toLower(inputValue))
  );
  //code search
  //code show leave
  const [showLeave, setShowLeave] = useState(false);
  const refShowListStaff = useRef();

  const clickOutSide = event => {
    const { target } = event;
    if (refShowLeave.current !== null) {
      if (!refShowLeave.current.contains(target)) {
        setShowLeave(false);
        document.removeEventListener("click", clickOutSide);
      }
    }
  };
  const clickOnListStaffList = () => {
    setShowListStaff(true);
    document.addEventListener("click", clickOutSideList);
  };
  const clickOutSideList = event => {
    const { target } = event;
    if (refShowListStaff.current !== null) {
      if (!refShowListStaff.current.contains(target)) {
        setShowListStaff(false);
        document.removeEventListener("click", clickOutSideList);
      }
    }
  };
  useEffect(() => {
    return () => {
      if (showLeave === true) {
        document.removeEventListener("click", clickOutSide);
      }
    };
    // eslint-disable-next-line
  }, [showLeave]);
  useEffect(() => {
    return () => {
      document.removeEventListener("click", clickOutSide);
    };
    // eslint-disable-next-line
  }, []);
  //code show leave
  const sendData = id => {
    props.onSelectStaff(listStaff[id].id);
  };

  return (
    <div className="saffs-search-content">
      <div
        className="div-outside-input"
        ref={refShowListStaff}
        onClick={clickOnListStaffList}
      >
        <Input
          type='search'
          className="input-search-staff"
          placeholder="Enter the name of the employee"
          onChange={e => setInputValue(e.target.value)}
          value={inputValue}
        />
      </div>
      <div
        id="scrollbar-style"
        className={classNames("div-list-staff", {
          hideThisDiv: showListStaff === false
        })}
      >
        {_.map(listStaff, (item, index) => (
          <div
            className="div-each-staff"
            key={index}
            onClick={() => {
              sendData(index++);
              setInputValue(item.name);
            }}
          >
            <p style={{ cursor: "pointer" }}>{item.name}</p>
            <p
              style={{ cursor: "pointer" }}
            >{`${moment(item.joining_date).format(Time.DMY)}   ${item.position}`}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SearchUser;
