import React from 'react';
import apiService from '../services/apiService.js';

export default class DeleteUser extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div className="row delete-user clearfix">
        <div className="col-md-3 col-md-offset-3">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">Enter user info</h3>
            </div>
            <div className="panel-body">
              <form role="form" onSubmit={this.handleSubmit}>
                <fieldset>
                  <div className="form-group">
                    <input
                      ref="name"
                      className="form-control"
                      placeholder="Full name"
                      name="name"
                      type="name"
                      autoFocus
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
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleSubmit(e) {
    e.preventDefault();

    apiService.deleteUser(this.refs.name.value);
    // todo handle error or success
  }
}
