import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  Dropdown,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import Logo from "../../asset/img/Logo_Bunbu 1.png";
import LogoUser from "../../asset/img/user.png";

const Header = props => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(prevState => !prevState);
  const toggle = () => setIsOpen(!isOpen);
  const setTitle = (text) => {
    document.title = text;
  }
  return (
    <div>
      <Navbar color="light" light expand="md" style={{ padding: "10px 30px" }}>
        <img src={Logo} id="logo" alt="Logo_Bunbu" />
        <Link className="navbar-brand" to="/">
          BUNBU TIMESHEETS
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={() => setTitle("Bunbu Timesheets")} >
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/accounts" onClick={() => setTitle("Accounts - Bunbusoft")} >
                  Accounts
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/user_timesheets" onClick={() => setTitle("Timesheets - Bunbusoft")} >
                  Timesheets
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/user_overtimes" onClick={() => setTitle("Overtime - Bunbusoft")} >
                  Overtime
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/user_dayoffs" onClick={() => setTitle("Day-off - Bunbusoft")} >
                  Day-off
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/user_compensations" onClick={() => setTitle("Compensation - Bunbusoft")} >
                  Compensation
                </Link>
              </li>
            </ul>
          </Nav>
          <div className='div-dropdown'>
            <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
              <DropdownToggle>
                <img src={LogoUser} id="logouser" alt="Logo_Bunbu" />
              </DropdownToggle>
              <DropdownMenu right>
                <Link to="/profile" className="item nav-link-item" onClick={() => setTitle("Profile - Bunbusoft")} >
                  <DropdownItem>
                    Profile
                  </DropdownItem>
                </Link>
                <NavLink href='/logout' data-method='delete'>
                  <DropdownItem>
                    Logout
                  </DropdownItem>
                </NavLink>
              </DropdownMenu>
            </Dropdown>
          </div>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
