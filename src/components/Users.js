import React from 'react';
import {
  Table,
  Col
} from 'react-bootstrap';
import SearchUser from './SearchUser.js';
import apiService from '../services/apiService.js';

require('styles/Users.css');

export default class Users extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      lastPasswordResetEmailSentTo: null
    };

    this.handleProfileLoaded = this.handleProfileLoaded.bind(this);
    this.renderUserInfoSection = this.renderUserInfoSection.bind(this);
  }

  render() {
    return (
      <div className="users clearfix">
        <Col xs={6} md={4}>
          <SearchUser onProfileLoaded={this.handleProfileLoaded} />
        </Col>
        {this.renderUserInfoSection()}
      </div>
    );
  }

  handleProfileLoaded(profile) {
    this.setState({ data: profile });
  }

  renderUserInfoSection() {
    let { data } = this.state;

    if (!data) {
      return;
    }

    const talentLabel = data.user.isTalent ? <strong>Talent</strong> : <i>Fan</i>;

    const userLocalTime = new Date().toLocaleString('en-US', {
      timeZone: data.user.timezone
    });

    return (
      <Table bordered condensed fill>
        <tbody>
          <tr>
            <td>
              <a target={'_blank'} href={data.user.media.profilePictureUrl}>
                <img
                  style={{ width: 100, height: 100 }}
                  src={data.user.media.profilePictureThumbnailUrl}
                />
              </a>
            </td>
            <td>
              <div style={{ fontSize: 24 }}>
                {data.user.fullName} (ID {data.user.id})
              </div>
              {talentLabel}
            </td>
          </tr>

          <tr>
            <td className="td-width">Email</td>
            <td>
              {data.user.email}
              {data.isEmailVerified || !data.user.email || (
                <em style={{ color: 'red', marginLeft: '10px' }}>
                  Not verified!
                </em>
              )}
            </td>
          </tr>

          <tr>
            <td className="td-width">Credits</td>
            <td>{data.credits}</td>
          </tr>

          <tr>
            <td className="td-width">Social Profiles</td>
            <td>
              Total Followers: {data.totalFanCount}
              {!data.socialProfiles.length && <div>None</div>}
              {data.socialProfiles.map(function(row, i) {
                return (
                  <div>
                    {row.type}: {row.username ? row.username : row.fullName}
                  </div>
                );
              })}
            </td>
          </tr>

          {data.user.timezone && (
            <tr>
              <td className="td-width">
                {'User\'s Local Time'}
                <br />({data.user.timezone})
              </td>
              <td>{userLocalTime}</td>
            </tr>
          )}

          {data.user.isTalent && (
            <tr>
              <td className="td-width">
                Schedule
                <br />({data.schedule.timezone})
              </td>
              <td>
                <table>
                  <tbody>
                    <tr>
                      <td className="schedule-border">
                        <div>Monday</div>
                        <div>
                          {data.schedule.schedule[1]
                            ? `${data.schedule.schedule[1][0].start} to ${data.schedule.schedule[1][0].end}`
                            : 'none'}
                        </div>
                      </td>
                      <td className="schedule-border">
                        <div>Tuesday</div>
                        <div>
                          {data.schedule.schedule[2]
                            ? `${data.schedule.schedule[2][0].start} to ${data.schedule.schedule[2][0].end}`
                            : 'none'}
                        </div>
                      </td>
                      <td className="schedule-border">
                        <div>Wednesday</div>
                        <div>
                          {data.schedule.schedule[3]
                            ? `${data.schedule.schedule[3][0].start} to ${data.schedule.schedule[3][0].end}`
                            : 'none'}
                        </div>
                      </td>
                      <td className="schedule-border">
                        <div>Thursday</div>
                        <div>
                          {data.schedule.schedule[4]
                            ? `${data.schedule.schedule[4][0].start} to ${data.schedule.schedule[4][0].end}`
                            : 'none'}
                        </div>
                      </td>
                      <td className="schedule-border">
                        <div>Friday</div>
                        <div>
                          {data.schedule.schedule[5]
                            ? `${data.schedule.schedule[5][0].start} to ${data.schedule.schedule[5][0].end}`
                            : 'none'}
                        </div>
                      </td>
                      <td className="schedule-border">
                        <div>Saturday</div>
                        <div>
                          {data.schedule.schedule[6]
                            ? `${data.schedule.schedule[6][0].start} to ${data.schedule.schedule[6][0].end}`
                            : 'none'}
                        </div>
                      </td>
                      <td className="schedule-border">
                        <div>Sunday</div>
                        <div>
                          {data.schedule.schedule[7]
                            ? `${data.schedule.schedule[7][0].start} to ${data.schedule.schedule[7][0].end}`
                            : 'none'}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          )}

          {this.renderEmailActions(data.user)}
        </tbody>
      </Table>
    );
  }

  renderEmailActions(user) {
    const isPasswordResetSent =
      user.email && this.state.lastPasswordResetEmailSentTo === user.email;
    return (
      <tr>
        <td className="td-width">Email actions</td>
        <td>
          <div>
            <button
              onClick={() => this.requestPasswordReset(user.email)}
              type="button"
            >
              Send password-reset email
            </button>{' '}
            {isPasswordResetSent && <span>Sent!</span>}
          </div>
        </td>
      </tr>
    );
  }

  /**
   * @param {String} userEmail
   */
  requestPasswordReset(userEmail) {
    if (!confirm(`Send password reset email to ${userEmail}?`)) {
      return;
    }
    const result = apiService.sendPasswordResetEmail(userEmail);
    if (result.code === 'error') {
      alert(
        `Password reset failed: ${result.message || JSON.stringify(result)}`
      );
      return;
    }
    this.setState({ lastPasswordResetEmailSentTo: userEmail });
  }
}
