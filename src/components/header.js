import React from "react";
import { Navbar, NavLink } from "reactstrap";

const Header = () => {
  return (
    <Navbar
      light
      expand="md"
      style={{
        background: "#2980B9",
        fontSize: "3em",
        fontFamily: "Arial, Helvetica, sans-serif "
      }}
    >
      <NavLink to="/" className="navbar-brand">
        My Notes
      </NavLink>
    </Navbar>
  );
};

export default Header;
