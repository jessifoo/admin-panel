import React from 'react';
import { Button } from 'react-bootstrap';
import apiService from '../services/apiService.js';

require('../styles/Header.css');

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  render() {
    return (
      <div className="header navbar navbar-default navbar-static-top">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="index.html">
            Veri Admin
          </a>
          <Button className="logoutButton" onClick={this.handleLogoutClick}>
            Logout
          </Button>
        </div>
      </div>
    );
  }

  handleLogoutClick() {
    apiService.logout();
  }
}

