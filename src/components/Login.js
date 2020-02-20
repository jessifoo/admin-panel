import React from 'react';
import {
  Panel,
  Row,
  Col,
  Button,
  FormControl
} from 'react-bootstrap';
import apiService from '../services/apiService.js';

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: null,
      password: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  render() {
    return (
      <div className="login">
        <Row>
          <Col xs={6} md={4} xsOffset={4}>
            <Panel header="Please Sign In" className="text-center">
              <form role="form" onSubmit={this.handleSubmit}>
                <FormControl
                  type="email"
                  placeholder="Email"
                  onChange={this.handleEmailChange}
                />
                <FormControl
                  type="password"
                  placeholder="Password"
                  onChange={this.handlePasswordChange}
                />
                <Button type="submit" bsStyle="success" bsSize="large" block>
                  Login
                </Button>
              </form>
            </Panel>
          </Col>
        </Row>
      </div>
    );
  }

  handleSubmit(e) {
    e.preventDefault();

    const { email, password } = this.state;

    apiService.login(email, password);
    // todo handle error
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }
}
