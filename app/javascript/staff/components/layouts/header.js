import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  Dropdown,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavLink
} from 'reactstrap';
import Logo from '../../asset/img/Logo_Bunbu 1.png';
import LogoUser from '../../asset/img/user.png';

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(prevState => !prevState);
  const toggle = () => setIsOpen(!isOpen);
  const setTitle = (text) => {
    document.title = text;
  }
  return (
    <div>
      <Navbar color="light" light expand="md">
        <img src={Logo} id="logo" alt="Logo_Bunbu" />
        <Link className="navbar-brand" to="/timesheets" title="Timesheets">BUNBU TIMESHEETS</Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/" title="Checkin" onClick={() => setTitle("Bunbu Timesheets")}>Checkin</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/timesheets" title="Timesheets" onClick={() => setTitle("Timesheets - Bunbusoft")}>Timesheets</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/overtimes" title="Overtime" onClick={() => setTitle("Overtime - Bunbusoft")}>Overtime</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/dayoffs" title="Day-off" onClick={() => setTitle("Day-off - Bunbusoft")}>Day-off</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/checkout" title="Checkout" onClick={() => setTitle("Checkout - Bunbusoft")}>Checkout</Link>
              </li>
            </ul>
          </Nav>
          <div className='div-dropdown'>
            <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
              <DropdownToggle>
                <img src={LogoUser} id="logouser" alt="Logo_Bunbu" />
              </DropdownToggle>
              <DropdownMenu right>
                <Link to="/profile" className="nav-link-item" title="Profile"  onClick={() => setTitle("Profile - Bunbusoft")}>
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
}

export default Header;