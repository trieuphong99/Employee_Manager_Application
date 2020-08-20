import React from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";
import Header from './components/layouts/header';
import ListAccounts from './components/accounts';
import TimeSheets from './components/timesheets'
import Profile from '../staff/components/profile'
import DayOff from './components/selection/dayOff/dayOff';
import OverTime from './components/selection/overTime/overTime';
import Compensation from './components/selection/compensation/compensation';
import DetailAccount from './components/accounts/detail/index';
import DashBoard from './components/dashboard/dashBoard';

function Main(props) {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/">
          <DashBoard/>
        </Route>
        <Route exact path="/admin/accounts">
          <ListAccounts />
        </Route>
        <Route exact path="/admin/user_timesheets">
          <TimeSheets />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route exact path="/admin/user_dayoffs">
          <DayOff />
        </Route>
        <Route exact path="/admin/user_overtimes">
          <OverTime />
        </Route>
        <Route exact path="/admin/user_compensations">
          <Compensation/>
        </Route>
        <Route path="/admin/users/:id">
          <DetailAccount />
        </Route>
      </Switch>
    </div>
  )
}

export default Main;
