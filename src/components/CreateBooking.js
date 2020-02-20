import React from 'react';
import {
  Panel,
  Row,
  Col
} from 'react-bootstrap';

export default class CreateBooking extends React.Component {
  constructor(props) {
    super(props);

    this.renderBookingInfoSection = this.renderBookingInfoSection.bind(this);
  }

  render() {
    return (
      <div className="create-booking clearfix">
        <Row>
          <Col xs={6} md={4}>
            <Panel header="Enter Booking Info">
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
          <Col xs={6} md={4}></Col>
        </Row>
      </div>
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    // todo
  }

  renderBookingInfoSection() {
    // todo
  }
}
