import React from 'react';
import {
  Panel,
  Row,
  Col
} from 'react-bootstrap';
import apiService from '../services/apiService.js';
import UserInfoSection from './UserInfoSection.js';

export default class CreateUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showUserInfo: false,
      data: null
    };

    this.renderUserInfoSection = this.renderUserInfoSection.bind(this);
  }

  render() {
    const isSuccess = this.state.showUserInfo === true;

    return (
      <div className="create-user clearfix">
        <Row>
          <Col xs={6} md={4}>
            <Panel header="Enter User Info">
              <form role="form" onSubmit={this.handleSubmit.bind(this)}>
                <fieldset>
                  <div className="form-group">
                    <input
                      ref="name"
                      className="form-control"
                      placeholder="Full name"
                      name="name"
                      type="name"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      ref="email"
                      className="form-control"
                      placeholder="E-mail"
                      name="email"
                      type="email"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      ref="password"
                      className="form-control"
                      placeholder="Password"
                      name="password"
                      type="password"
                    />
                  </div>
                  <button
                    type="submit"
                    value="Create"
                    className="btn btn-lg btn-success btn-block"
                  >
                    Create
                  </button>
                </fieldset>
              </form>
            </Panel>
          </Col>
          <Col xs={6} md={4}>
            <div
              className="-success"
              style={isSuccess ? null : { display: 'none' }}
            >
              {this.renderUserInfoSection()}
            </div>
          </Col>
        </Row>
      </div>
    );
  }

  handleSubmit(e) {
    e.preventDefault();

    const name = this.refs.name.value;
    const email = this.refs.email.value;
    const password = this.refs.password.value;

    const result = apiService.createUser(name, email, password);

    this.setState({ data: result, showUserInfo: true });
    // todo handle error or success
  }

  renderUserInfoSection() {
    if (this.state.showUserInfo === false) {
      return;
    }
    return (
      <UserInfoSection
        data={JSON.stringify(this.state.data)}
        showDelete={true}
      />
    );
  }
}
