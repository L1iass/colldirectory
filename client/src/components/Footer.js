import React from "react";
import {
  MDBFooter,
  MDBDropdown,
  MDBDropdownLink,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdownToggle,
} from "mdb-react-ui-kit";

const Footer = () => {
  return (
    <MDBFooter
      className="text-center text-white fixed-bottom"
      style={{ backgroundColor: "#355c7d" }}
    >
      <div className="text-center p-3">
        © 2022 Copyright:{" "}
        <a
          className="text-white"
          href="https://www.linkedin.com/in/aliaksei-shurko-026ba0200/"
        >
          Aliaksei Shurko
        </a>
      </div>
    </MDBFooter>
  );
};
export default Footer;
