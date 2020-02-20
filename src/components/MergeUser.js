import React from 'react';
import {
  Panel,
  Row,
  Col,
  Button,
  OverlayTrigger,
  Tooltip
} from 'react-bootstrap';
import apiService from '../services/apiService.js';
import SearchUser from './SearchUser.js';
import UserInfoSection from './UserInfoSection.js';

require('styles/MergeUser.css');

export default class MergeUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      merge: 'right',
      showUserInfoLeft: false,
      showUserInfoRight: false,
      userLeftData: null,
      userRightData: null,
      showError: false,
      errorMessage: '',
      showSuccess: false
    };

    this.searchUserSubmitLeft = this.searchUserSubmitLeft.bind(this);
    this.searchUserSubmitRight = this.searchUserSubmitRight.bind(this);
    this.handleMergeClick = this.handleMergeClick.bind(this);
    this.handleMergeChangeClick = this.handleMergeChangeClick.bind(this);
  }

  render() {
    const tooltip = (
      <Tooltip id="tooltip">
        Merge {this.state.merge === 'left' ? 'right' : 'left'} into{' '}
        {this.state.merge}
      </Tooltip>
    );

    return (
      <div className="merge-user clearfix">
        <Panel>
          <Row className="row">
            <Col xs={6} md={4}>
              <SearchUser onProfileLoaded={this.searchUserSubmitLeft} />
            </Col>
            <Col xs={6} md={4}></Col>
            <Col xs={6} md={4}>
              <SearchUser onProfileLoaded={this.searchUserSubmitRight} />
            </Col>
          </Row>
          <Row className="row">
            <Col xs={6} md={4}>
              {this.renderUserInfoSectionLeft()}
            </Col>
            <Col xs={6} md={4}>
              <Panel header="Merge Direction" className="text-center">
                <OverlayTrigger placement="top" overlay={tooltip}>
                  <Button onClick={this.handleMergeChangeClick}>
                    <i
                      className={
                        this.state.merge === 'left'
                          ? 'fa fa-arrow-left fa-fw'
                          : 'fa fa-arrow-right fa-fw'
                      }
                    ></i>
                  </Button>
                </OverlayTrigger>
              </Panel>
              {this.renderMergeButton()}
              {this.state.showError ? this.renderError() : null}
              {this.state.showSuccess ? this.renderSuccess() : null}
            </Col>
            <Col xs={6} md={4}>
              {this.renderUserInfoSectionRight()}
            </Col>
          </Row>
        </Panel>
      </div>
    );
  }

  searchUserSubmitLeft(result) {
    this.setState({
      userLeftData: result,
      showUserInfoLeft: true,
      showError: false,
      showSuccess: false
    });
  }

  searchUserSubmitRight(result) {
    this.setState({
      userRightData: result,
      showUserInfoRight: true,
      showError: false,
      showSuccess: false
    });
  }

  handleMergeChangeClick() {
    const direction = this.state.merge === 'left' ? 'right' : 'left';
    this.setState({ merge: direction });
  }

  renderUserInfoSectionLeft() {
    if (this.state.showUserInfoLeft === false) {
      return;
    }
    return (
      <UserInfoSection
        data={JSON.stringify(this.state.userLeftData)}
        showDelete={false}
      />
    );
  }

  renderUserInfoSectionRight() {
    if (this.state.showUserInfoRight === false) {
      return;
    }
    return (
      <UserInfoSection
        data={JSON.stringify(this.state.userRightData)}
        showDelete={false}
      />
    );
  }

  renderMergeButton() {
    return (
      <Panel className="text-center">
        <Button onClick={this.handleMergeClick}>Merge</Button>
      </Panel>
    );
  }

  renderError() {
    return (
      <span className="text-danger">
        <i className="fa fa-times"></i> {this.state.errorMessage}
      </span>
    );
  }

  renderSuccess() {
    return (
      <span className="text-success">
        <i className="fa fa-check"></i> Users Merged!
      </span>
    );
  }

  handleMergeClick() {
    const direction = this.state.merge;
    const userLeftId = this.state.userLeftData.user.id;
    const userRightId = this.state.userRightData.user.id;

    let toId = userRightId;
    let fromId = userLeftId;

    if (direction === 'left') {
      toId = userLeftId;
      fromId = userRightId;
    }

    const result = apiService.mergeUser(fromId, toId);
    if (result.code && result.code === 'error') {
      this.setState({
        showError: true,
        errorMessage: JSON.parse(result.message).message
      });
      return;
    }
    this.setState({
      showSuccess: true,
      showUserInfoLeft: false,
      showUserInfoRight: false
    });
  }
}
