import React from 'react';
import { Link } from 'react-router';

require('styles/Sidebar.css');

export default class Sidebar extends React.Component {
  render() {
    return (
      <div
        className="sidebar navbar-default"
        role="navigation"
      >
        <div className="sidebar-nav">
          <ul className="nav" id="side-menu">
            <li>
              <Link to="/">
                <i className="fa fa-dashboard fa-fw"/> Dashboard
              </Link>
            </li>
            <li>
              <Link to="/createuser">
                <i className="fa fa-user-plus fa-fw"/> Create new user
              </Link>
            </li>
            <li>
              <Link to="/edituser">
                <i className="fa fa-user-o fa-fw"/> Search for a user
              </Link>
            </li>
            <li>
              <Link to="/mergeuser">
                <i className="fa fa-user fa-fw"/>
                <i className="fa fa-exchange fa-fw"/>
                <i className="fa fa-user fa-fw"/> Merge users
              </Link>
            </li>
            <li>
              <Link to="/bookings">
                <i className="fa fa-calendar fa-fw"/> Bookings
              </Link>
            </li>
            <li>
              <Link to="/modify-booking">
                <i className="fa fa-pencil-square-o fa-fw"/> Modify Booking
              </Link>
            </li>
            <li>
              <Link to="/credits">
                <i className="fa fa-money fa-fw"/> Credits
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
