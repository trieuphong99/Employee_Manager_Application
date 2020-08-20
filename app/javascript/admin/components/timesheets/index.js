import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, UncontrolledPopover, Nav, NavItem, NavLink, TabContent, TabPane, Badge } from "reactstrap";
import "./styles.css";
import _ from "lodash";

import classnames from 'classnames';
import TabTimesheets from "./tabTimesheets";
import TabRequestEdit from "./tabRequestEdit";

function Timesheets(props) {
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
      {/*tables-saffs  */}
      <div className="tables-saffs-wrapper">
        <div>
          <div>
          
            <div>
              <Nav style={{marginBottom: '1em'}} tabs>
                <NavItem>
                  <NavLink
                    className={classnames({active: activeTab === '1' })}
                    onClick={() => {toggle('1'); }}
                  >
                    Timesheets
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({active: activeTab === '2' })}
                    onClick={() => {toggle('2'); }}
                  >
                    Request edit
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={activeTab} >
                <TabPane tabId="1" >
                  <TabTimesheets />
                </TabPane>
                <TabPane tabId="2" >
                  <TabRequestEdit />
                </TabPane>
              </TabContent>
            </div>

          </div>
        </div>
      </div>
      {/*tables-saffs end */}
    </div>
  );
}

export default Timesheets;
