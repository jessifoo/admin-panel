import React from 'react';

import Booking from './Booking.js';
import apiService from '../services/apiService.js';

class ModifyBookings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showUserInfo: false,
      showError: false,
      data: null
    };
  }

  render() {
    const isSuccess = this.state.showUserInfo === true;

    return (
      <div className="modify-booking">
        <form role="form" onSubmit={this.handleSubmit.bind(this)}>
          <fieldset>
            Find Booking:&nbsp;
            <input
              ref="id"
              className=""
              placeholder="Booking ID"
              name="id"
              type="id"
            />
            &nbsp;
            <button type="submit" value="Create" className="btn btn-success">
              Find
            </button>{' '}
            &nbsp;
            {this.state.showError ? this.renderError() : null}
          </fieldset>
        </form>
        <div
          className="-success"
          style={isSuccess ? null : { display: 'none' }}
        >
          {this.renderBookingInfoSection()}
        </div>
      </div>
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ showError: false, showUserInfo: false, data: null });

    const id = this.refs.id.value;

    const result = apiService.searchBookingsById(id);
    if (result.code && result.code === 'error') {
      this.setState({ showError: true, showUserInfo: false });
    } else {
      this.setState({ data: result, showUserInfo: true });
    }
  }

  renderError() {
    return (
      <span className="text-danger">
        <i className="fa fa-times"></i> Can't find booking
      </span>
    );
  }

  renderBookingInfoSection() {
    return this.state.showUserInfo ? (
      <Booking data={JSON.stringify(this.state.data)} />
    ) : (
      <div>loading</div>
    );
  }
}

export default ModifyBookings;
