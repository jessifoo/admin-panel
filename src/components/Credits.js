import React from 'react';
import {
  Table,
  Button,
  Col,
  Form,
  FormGroup,
  FormControl,
  ControlLabel
} from 'react-bootstrap';
import apiService from '../services/apiService.js';

export default class Credits extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      userId: null,
      credits: null,
      type: 'GIFT',
      notes: null,
      showError: false,
      showAddCreditError: false
    };
  }

  render() {
    return (
      <div className="credits">
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
        {this.renderCreditTransactionTable()}
        <Col xs={6} md={4}>
          Add Credit Transaction:&nbsp;
          <Form
            role="form"
            ref="form"
            onSubmit={this.handleAddTransactionSubmit.bind(this)}
          >
            <FormGroup>
              <ControlLabel>Credits</ControlLabel>
              <FormControl
                type="credits"
                placeholder="Credits"
                onChange={this.handleCreditsChange.bind(this)}
                ref="credits"
                value={this.state.credits}
              />
              <FormControl.Feedback />
            </FormGroup>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Type</ControlLabel>
              <FormControl
                componentClass="select"
                placeholder="select"
                onChange={this.handleTypeChange.bind(this)}
                ref="type"
              >
                <option value="gift">GIFT</option>
                <option value="adjustment">ADJUSTMENT</option>
              </FormControl>
            </FormGroup>
            <FormGroup controlId="formControlsTextarea">
              <ControlLabel>Notes</ControlLabel>
              <FormControl
                componentClass="textarea"
                placeholder="Notes..."
                onChange={this.handleNotesChange.bind(this)}
                ref="notes"
                value={this.state.notes}
              />
            </FormGroup>
            <div className="" style={{ display: 'none' }}>
              {this.renderError()}
            </div>
            <Button type="submit" bsStyle="success" bsSize="large" block>
              Add
            </Button>
          </Form>
          {this.state.showAddCreditError ? this.renderAddCreditError() : null}
        </Col>
      </div>
    );
  }

  handleCreditsChange(e) {
    this.setState({ credits: e.target.value });
  }

  handleTypeChange(e) {
    this.setState({ type: e.target.value.toUpperCase() });
  }

  handleNotesChange(e) {
    this.setState({ notes: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ showError: false, data: '' });

    const id = this.refs.id.value;

    const result = apiService.getCreditTransactions(id);
    if (result.transactions && result.transactions.length === 0) {
      this.setState({ showError: true, userId: id });
    } else {
      this.setState({ data: result.transactions, userId: id });
    }
  }

  clearForm() {
    this.setState({ credits: '', notes: '' });
  }

  handleAddTransactionSubmit(e) {
    e.preventDefault();
    this.setState({ showAddCreditError: false });

    const { userId, credits, type, notes } = this.state;

    const result = apiService.postCreditTransactions(userId, credits, type, notes);

    if (result.code && result.code === 'error') {
      this.setState({ showAddCreditError: true });
      return;
    }
    const data = this.state.data || [];
    data.push(result);

    this.clearForm();

    this.refs.credits.value = '';
    this.refs.notes.value = '';

    this.setState({ data });
  }

  renderError() {
    return (
      <span className="text-danger">
        <i className="fa fa-times"></i> No credit transactions or the user
        doesn't exist
      </span>
    );
  }

  renderAddCreditError() {
    return (
      <span className="text-danger">
        <i className="fa fa-times"></i> Can't add credit transaction
      </span>
    );
  }

  renderCreditTransactionTable() {
    let { data } = this.state;

    if (!data) {
      data = [];
    }

    return (
      <Table bordered condensed fill>
        <thead>
          <tr>
            <td>Date Created</td>
            <td>Type</td>
            <td>Credits</td>
            <td className="text-nowrap">Booking ID</td>
            <td>Notes</td>
            <td>Provider</td>
            <td>Provider Transaction ID</td>
          </tr>
        </thead>
        <tbody>
          {data.map(function(row, i) {
            return (
              <tr key={i}>
                <td key={0} className="text-nowrap">
                  {row.dateCreated}
                </td>
                <td key={1}>{row.type}</td>
                <td key={2}>{row.credits}</td>
                <td key={3}>{row.bookingId}</td>
                <td key={4}>{row.notes}</td>
                <td key={5}>{row.provider}</td>
                <td key={6}>{row.providerTransactionId}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }
}
