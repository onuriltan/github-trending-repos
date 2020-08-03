import React from 'react';
import { Navbar } from "react-bootstrap";
import Logo from '../../assets/github-logo.svg';

const NavBar = () => {
  return (
    <Navbar className="bg-primary justify-content-between" expand="lg">
      <Navbar.Brand className="text-light d-flex align-items-center" >
        <img alt="icon" src={Logo} width="40" height="40" className="d-inline-block align-top mr-3"/>
        <div>Trending Repos</div>
      </Navbar.Brand>
    </Navbar>
  );
};
export default NavBar;
