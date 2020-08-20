import React, {useState} from 'react';
import classnames from 'classnames';
import { Nav, NavItem, NavLink, TabContent, TabPane, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import ListTimesheets from './tabTimesheet/index';
import ListRequest from './tabRequest/listRequest';
import "./styles.css";
import "./staffTimeSheet.scss";
import {Link} from 'react-router-dom';

const Timesheets = (props) => {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }
  return (
    <div className="container-fluid">
      {/* breadcrumb */}
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to="/">Home</Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>Timesheets</BreadcrumbItem>
      </Breadcrumb>
      {/* breadcrumb end */}
      <Nav style={{marginBottom: '1em'}} tabs >
        <NavItem>
          <NavLink
            className={classnames({active: activeTab === '1'})}
            onClick={() => toggle('1')}
          >
            Timesheets
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({active: activeTab === '2'})}
            onClick={() => toggle('2')}
          >
            Request
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <ListTimesheets />
        </TabPane>
        <TabPane tabId="2">
          <ListRequest />
        </TabPane>
      </TabContent>
    </div>
  )
}
export default Timesheets;