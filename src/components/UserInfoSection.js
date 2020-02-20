import React from 'react';
import {
  Panel,
  Table,
  Button,
  Modal
} from 'react-bootstrap';
import apiService from '../services/apiService.js';

export default class UserInfoSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showDeleteModal: false
    };

    this.handleDeleteUser = this.handleDeleteUser.bind(this);
  }

  render() {
    const data = JSON.parse(this.props.data);

    // var data = {
    //   'socialProfiles': [],
    //   'user': {
    //     'blockedUsers': [],
    //     'media': {},
    //     'tags': [],
    //     'id': '3',
    //     'availabilities': '',
    //     'bio': '',
    //     'email': 'jess@test.com',
    //     'fullName': 'Jess Jo',
    //     'hasEmailLogin': true,
    //     'isTalent': false,
    //     'location': '',
    //     'websiteUrl': ''
    //   },
    //   'features': [],
    //   'isEmailVerified': false,
    //   'isVerified': false,
    //   'totalFanCount': 0
    // };

    const isShowDeleteButton = this.props.showDelete === true;
    return (
      <div className="user-info-section">
        <Panel defaultExpanded header={data.user.fullName}>
          <Table responsive fill>
            <tbody>
              <tr>
                <td>User ID</td>
                <td>{data.user.id}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{data.user.email}</td>
              </tr>
              <tr>
                <td>Is Talent</td>
                <td>{data.user.isTalent === true ? 'True' : 'False'}</td>
              </tr>
              <tr>
                <td>Follower Count</td>
                <td>{data.totalFanCount}</td>
              </tr>
              <tr>
                <td>Availabiltiies</td>
                <td>{data.totalFanCount}</td>
              </tr>
            </tbody>
          </Table>
          {isShowDeleteButton ? this.renderDeleteButton() : null}
        </Panel>

        <Modal
          show={this.state.showDeleteModal}
          onHide={this.hideModal.bind(this)}
          dialogClassName="custom-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">Delete User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Are you sure?</h4>
            <p>You are about to delete the account for {data.user.fullName}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="danger" onClick={this.handleDeleteUser.bind(this)}>
              Delete
            </Button>
            <Button onClick={this.hideModal.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }

  handleDeleteUser(e) {
    e.preventDefault();

    const data = JSON.parse(this.props.data);

    apiService.deleteUser(data.user.id);
    // todo handle error and success states

    this.hideModal();
  }

  renderDeleteButton() {
    return (
      <Button bsStyle="danger" onClick={this.showModal.bind(this)} block>
        <i className="fa fa-user-times fa-fw"/> Delete User
      </Button>
    );
  }

  showModal() {
    this.setState({ showDeleteModal: true });
  }

  hideModal() {
    this.setState({ showDeleteModal: false });
  }
}

UserInfoSection.propTypes = {
  data: React.PropTypes.string,
  showDelete: React.PropTypes.bool
};
