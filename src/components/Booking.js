import React from 'react';

import {
  Panel,
  Table,
  Button
} from 'react-bootstrap';

import apiService from '../services/apiService.js';

import moment from 'moment-timezone';

import { DateField } from 'react-date-picker';
import 'react-date-picker/index.css';

import Select from 'react-select';
import 'react-select/dist/react-select.css';

export default class Booking extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: null,
      selectValue: null,
      updateError: false,
      showResult: false,
      errorMessage: '',
      statusSelectValue: null
    };
  }

  // Duration of call (in minutes) dropdown
  options = [
    { value: '5', label: '5' },
    { value: '10', label: '10' },
    { value: '15', label: '15' },
    { value: '20', label: '20' },
    { value: '25', label: '25' },
    { value: '30', label: '30' },
    { value: '35', label: '35' },
    { value: '40', label: '40' },
    { value: '45', label: '45' },
    { value: '50', label: '50' },
    { value: '55', label: '55' },
    { value: '60', label: '60' }
  ];

  // Status of call dropdown
  statusOptions = [
    { value: 'accept', label: 'accept' },
    { value: 'cancel', label: 'cancel' },
    { value: 'request', label: 'request' }
  ];

  render() {
    const data = JSON.parse(this.props.data);

    const { talentId, fanId } = data.booking;

    const talent = data.entities.users[talentId];
    const fan = data.entities.users[fanId];

    return (
      <div className="booking">
        <Panel defaultExpanded header="Booking">
          <Table bordered condensed fill>
            <tbody>
              <tr>
                <td>ID</td>
                <td>{data.booking.id}</td>
              </tr>
              <tr>
                <td>Talent</td>
                <td>
                  {talent.fullName} ({data.booking.talentId})
                </td>
              </tr>
              <tr>
                <td>Fan</td>
                <td>
                  {fan.fullName} ({data.booking.fanId})
                </td>
              </tr>
              <tr>
                <td>Date</td>
                <td>{this.renderDateField()}</td>
              </tr>
              <tr>
                <td>Duration</td>
                <td>
                  Current: {data.booking.duration} <br />
                  New:{' '}
                  <Select
                    name="selectDuration"
                    value={this.state.selectValue}
                    options={this.options}
                    onChange={this.updateValue.bind(this)}
                    backspaceRemoves={false}
                    searchable={false}
                    clearable={false}
                    deleteRemoves={false}
                  />
                </td>
              </tr>
              <tr>
                <td>Status</td>
                <td>
                  Current: {data.booking.status} <br />
                  New:{' '}
                  <Select
                    name="selectStatus"
                    value={this.state.statusSelectValue}
                    options={this.statusOptions}
                    onChange={this.updateStatusValue.bind(this)}
                    backspaceRemoves={false}
                    searchable={false}
                    clearable={false}
                    deleteRemoves={false}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <Button
                    bsStyle="primary"
                    onClick={this.updateBooking.bind(this)}
                  >
                    <i className="fa fa-wrench fa-fw"></i> Update Booking
                  </Button>
                </td>
                <td>{this.state.showResult ? this.renderResult() : null}</td>
              </tr>
            </tbody>
          </Table>
        </Panel>
        <Panel defaultExpanded header="Event Log">
          <Table bordered condensed fill>
            <thead>
              <tr>
                <td className="text-nowrap">Modified By (User ID)</td>
                <td>Duration</td>
                <td>Event Type</td>
                <td>Price</td>
                <td>Date</td>
                <td>Date Created</td>
              </tr>
            </thead>
            <tbody>
              {data.eventLog.map(function(row, i) {
                return (
                  <tr key={i}>
                    <td key={1}>{row.userId}</td>
                    <td key={2}>{row.duration}</td>
                    <td key={3}>{row.eventType}</td>
                    <td key={4}>{row.price}</td>
                    <td key={5}>{row.date}</td>
                    <td key={6}>{row.dateCreated}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Panel>
      </div>
    );
  }

  updateDate(newValue) {
    this.setState({
      date: moment(newValue)
        .tz('America/Toronto')
        .toISOString()
    });
  }

  updateValue(newValue) {
    this.setState({ selectValue: newValue.value });
  }

  updateStatusValue(newValue) {
    this.setState({ statusSelectValue: newValue.value });
  }

  renderDateField() {
    const data = JSON.parse(this.props.data);
    const estDate = moment(data.booking.date).format(
      'YYYY-MM-DD HH:mm',
      'America/Toronto'
    );

    return (
      <div>
        <DateField
          defaultValue={estDate}
          dateFormat="YYYY-MM-DD HH:mm"
          onChange={this.updateDate.bind(this)} // date => this.setState({date: date})
        />{' '}
        ({moment.tz('America/Toronto').zoneAbbr()})
      </div>
    );
  }

  updateBooking() {
    const bookingData = JSON.parse(this.props.data);
    const data = {
      date: this.state.date
    };

    if (this.state.selectValue) {
      data.duration = this.state.selectValue;
    }
    data.status = this.state.statusSelectValue
      ? this.state.statusSelectValue
      : bookingData.booking.status;

    const result = apiService.updateBookingById(bookingData.booking.id, data);

    if (result.code && result.code === 'error') {
      this.setState({
        updateError: true,
        errorMessage: JSON.parse(result.message).message
      });
    } else {
      this.setState({ updateError: false });
    }

    this.setState({ showResult: true });
  }

  renderResult() {
    if (this.state.updateError === true) {
      return (
        <span className="text-danger">
          <i className="fa fa-times"></i> {this.state.errorMessage}
        </span>
      );
    }
    return (
      <span className="text-success">
        <i className="fa fa-check"></i> Booking Updated!
      </span>
    );
  }
}

Booking.propTypes = {
  data: React.PropTypes.string
};
