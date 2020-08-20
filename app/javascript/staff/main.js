import React from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";
import Header from './components/layouts/header'
import CheckIn from './components/checkIn';
import CheckOut from './components/checkOut';
import TimeSheets from './components/timesheets'
import Profile from './components/profile'
import DayOffs from './components/dayOffs'
import Overtimes from './components/overtimes/'

const MainStaffs = props => {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/">
          <CheckIn />
        </Route>
        <Route path="/timesheets">
          <TimeSheets />
        </Route>
        <Route path="/checkout">
          <CheckOut />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route exact path="/dayoffs">
          <DayOffs />
        </Route>
        <Route exact path="/overtimes">
          <Overtimes />
        </Route>
      </Switch>
    </div>
  )
}

export default MainStaffs;
