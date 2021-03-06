import React, { Component } from "react";
import { FaAlignRight } from "react-icons/fa";
import "./navbar.css";
import { logOut } from "../../action/auth";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { MemuItems } from "./menu";
import { NavDropdown } from "react-bootstrap";
import {
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBIcon,
} from "mdbreact";
class Navbar extends Component {
  state = {
    isOpen: false,
    // old nav
    clicked: false,
  };
  handleTooggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  // Action
  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  };

  render() {
    return (
      <>
        <nav className="navbar">
          <div className="nav-center" style={{ width: "100%" }}>
            <div className="nav-header">
              <div>
                <h1> HORO </h1>
              </div>
              <div>
                <button
                  type="button"
                  className="nav-btn"
                  onClick={this.handleTooggle}
                >
                  <FaAlignRight className="nav-icon" />
                </button>
              </div>
            </div>
            <ul
              className={this.state.isOpen ? "nav-links show-nav" : "nav-links"}
            >
              {MemuItems.map((item, index) => {
                return (
                  <li key={index}>
                    <a className={item.cName} href={item.url}>
                      {item.title}
                    </a>
                  </li>
                );
              })}
            </ul>

            {this.props.isLoggedIn ? (
              <>
              <a href='/room'>My Place</a>
                <Link to="/">
                  <MDBDropdown>
                    <MDBDropdownToggle nav caret>
                      <MDBIcon icon="user" />
                    </MDBDropdownToggle>
                    <MDBDropdownMenu className="dropdown-default">
                      <MDBDropdownItem href="#!">Action</MDBDropdownItem>
                      <MDBDropdownItem href="#!">
                      <span>User Profile</span>
                      </MDBDropdownItem>
                      <MDBDropdownItem href="#!">
                      <span>Your Bookmark</span>
                      </MDBDropdownItem>
                        <Link to="/" onClick={() => this.props.logOut()}>
                      <MDBDropdownItem href="">
                          <span>Log Out</span>
                      </MDBDropdownItem>
                        </Link>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </Link>
              </>
            ) : (
              <span className='login-span'>
                <Link to="/account">Login</Link>
              </span>
            )}
          </div>
        </nav>
      </>
    );
  }
}
function mapStateToProps(state) {
  return { isLoggedIn: state.isLoggedIn };
}

export default connect(mapStateToProps, { logOut })(Navbar);
