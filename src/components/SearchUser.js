import React from 'react';
import {
  Alert,
  Panel,
  Button,
  Row,
  FormGroup,
  FormControl
} from 'react-bootstrap';
import apiService from '../services/apiService.js';

export default class SearchUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: '',
      errorMessage: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div className="search-user">
        <Row>
          <Panel header="Search for Users">
            <form role="form" onSubmit={this.handleSubmit}>
              <FormGroup>
                <FormControl
                  type="id"
                  placeholder="id, email, social profile link or handle"
                  onChange={this.handleChange}
                />
                <FormControl.Feedback />
              </FormGroup>
              {this.renderError()}
              <Button type="submit" bsStyle="success" bsSize="large" block>
                Search
              </Button>
            </form>
          </Panel>
        </Row>
      </div>
    );
  }

  handleChange(ev) {
    this.setState({ searchQuery: ev.target.value });
  }

  handleSubmit(ev) {
    ev.preventDefault();

    const response = apiService.searchProfiles(this.state.searchQuery);

    // @TODO We need to revamp XHR layer to use async APIs and return promises that either succeed or fail
    if (Array.isArray(response)) {
      if (response.length === 0) {
        this.setState({ errorMessage: 'User not found' });
      } else if (response.length === 1) {
        this.setState({ errorMessage: null });
        this.props.onProfileLoaded(response[0]);
      } else {
        this.setState({ errorMessage: 'Too many users found' });
      }
    } else if (response.status === 404) {
      this.setState({ errorMessage: 'User not found' });
    } else {
      this.setState({
        errorMessage:
          response.message || `Unknown error (status ${response.status})`
      });
    }
  }

  renderError() {
    return (
      this.state.errorMessage && <Alert bsStyle="danger">User not found</Alert>
    );
  }
}

SearchUser.propTypes = {
  onProfileLoaded: React.PropTypes.func.isRequired
};
