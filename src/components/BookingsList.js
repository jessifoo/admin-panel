import React from 'react';
import {
  Table
} from 'react-bootstrap';
import apiService from '../services/apiService.js';

export default class BookingsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      showError: false
    };
  }

  render() {
    return (
      <div className="bookings-list">
        <form role="form" onSubmit={this.handleSubmit.bind(this)}>
          <fieldset>
            Search by User ID:&nbsp;
            <input
              ref="id"
              className=""
              placeholder="User ID"
              name="id"
              type="id"
            />
            &nbsp;
            <button type="submit" value="Create" className="btn btn-success">
              Search
            </button>{' '}
            &nbsp;
            {this.state.showError ? this.renderError() : null}
          </fieldset>
        </form>
        {this.renderBookingsTable()}
      </div>
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ showError: false, data: null });

    const id = this.refs.id.value;

    const result = apiService.getBookings(id);
    if (result.code && result.code === 'error') {
      this.setState({ showError: true });
    } else {
      this.setState({ data: result.bookings });
    }
  }

  renderError() {
    return (
      <span className="text-danger">
        <i className="fa fa-times"/> No credit transactions or the user doesn't exist
      </span>
    );
  }

  renderBookingsTable() {
    let { data } = this.state;

    if (!data) {
      data = [];
    }

    return (
      <Table bordered condensed fill>
        <thead>
          <tr>
            <td className="text-nowrap">Booking ID</td>
            <td>Fan</td>
            <td>Talent</td>
            <td>Duration</td>
            <td>Price</td>
            <td>Status</td>
            <td>Date</td>
            <td>Last Modified By</td>
            <td>Date Created</td>
          </tr>
        </thead>
        <tbody>
          {data.map(function(row, i) {
            return (
              <tr key={i}>
                <td key={0}>{row.id}</td>
                <td key={1}>{row.fanId}</td>
                <td key={2}>{row.talentId}</td>
                <td key={3}>{row.duration}</td>
                <td key={4}>{row.price}</td>
                <td key={5}>{row.status}</td>
                <td key={6}>{row.date}</td>
                <td key={7}>{row.lastModifiedBy}</td>
                <td key={8} className="text-nowrap">
                  {row.dateCreated}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }
}
