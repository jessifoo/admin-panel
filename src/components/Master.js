import React from 'react';
import DocumentTitle from 'react-document-title';

import Header from './Header.js';
import Sidebar from './Sidebar.js';

require('../styles/Master.css');

export default class Master extends React.Component {
  render() {
    return (
      <DocumentTitle title="Veri Admin Panel">
        <div className="master">
          <Header />
          <Sidebar />
          <div className="main">{this.props.children}</div>
        </div>
      </DocumentTitle>
    );
  }
}
