import config from 'config';
import store from 'store';

/**
 * @class ApiService
 */
module.exports = {
  loggedIn() {
    if (!store.enabled) {
      console.log(
        'Local storage is not supported by your browser. Please disable "Private Mode", or upgrade to a modern browser.'
      );
    }
    if (store.get('token')) {
      return true;
    }
    return false;
  },

  logout() {
    store.remove('token');
    window.location.href = '/';
  },

  createUser(fullName, email, password) {
    const data = {
      fullName,
      email,
      password
    };
    return this._sendRequest('POST', 'signup/email', data, true);
  },

  searchProfiles(query) {
    const result = this._sendRequest(
      'POST',
      'profiles/search',
      { query },
      true
    );
    return result;
  },

  deleteUser(userId) {
    const result = this._sendRequest(
      'DELETE',
      `profiles/${encodeURIComponent(userId)}`,
      null,
      true
    );
    return result;
  },

  mergeUser(fromId, toId) {
    const data = {
      fromId,
      toId
    };

    const result = this._sendRequest(
      'POST',
      'admin/profiles/merge',
      data,
      true
    );
    return result;
  },

  sendPasswordResetEmail(email) {
    const result = this._sendRequest(
      'GET',
      `settings/password?email=${encodeURIComponent(email)}`,
      null,
      true
    );
    return result;
  },

  getBookings(userId) {
    const result = this._sendRequest(
      'GET',
      `bookings?userId=${encodeURIComponent(userId)}`,
      null,
      true
    );
    return result;
  },

  searchBookingsById(id) {
    const result = this._sendRequest(
      'GET',
      `bookings/${encodeURIComponent(id)}`,
      null,
      true
    );
    return result;
  },

  updateBookingById(id, values) {
    const data = {
      id
    };
    if (values.duration) {
      data.duration = values.duration;
    }
    if (values.date) {
      data.date = values.date;
    }
    if (values.status) {
      data.status = values.status;
    } else {
      data.status = 'request';
    }
    const result = this._sendRequest(
      'POST',
      `bookings/${encodeURIComponent(id)}`,
      data,
      true
    );
    return result;
  },

  getCreditTransactions(userId) {
    const result = this._sendRequest(
      'GET',
      `credit-transactions?userId=${encodeURIComponent(userId)}`,
      null,
      true
    );

    // var result = {'transactions': [
    //   {
    //     'id': '1',
    //     'userId': '1',
    //     'type': 'PURCHASE_CREDIT',
    //     'credits': 500,
    //     'provider': 'APPLE_IAP',
    //     'providerTransactionId': '1000000297993434',
    //     'dateCreated': '2017-06-07T01:14:30.000Z'
    //   },
    //   {
    //     'id': '2',
    //     'userId': '1',
    //     'type': 'PURCHASE_CREDIT',
    //     'credits': 1000,
    //     'provider': 'APPLE_IAP',
    //     'providerTransactionId': '1000000298332365',
    //     'dateCreated': '2017-06-07T01:14:30.000Z'
    //   },
    //   {
    //     'id': '3',
    //     'userId': '1',
    //     'type': 'REQUEST_MEETING',
    //     'credits': -300,
    //     'bookingId': '1',
    //     'dateCreated': '2017-06-07T01:14:30.000Z'
    //   }
    // ]};

    return result;
  },

  postCreditTransactions(userId, credits, type, notes = '') {
    const data = {
      userId,
      credits,
      transactionType: type,
      notes
    };

    const result = this._sendRequest('POST', 'credit-transactions', data, true);
    // var result = {
    //     "id": "4",
    //     "userId": "1",
    //     "type": "REQUEST_MEETING",
    //     "credits": -300,
    //     "bookingId": "1",
    //     "dateCreated": "2017-06-07T01:14:30.000Z"
    //   };
    return result;
  },

  login(email, password) {
    // NmV9DN_e15h18ycMSM8eEf5FSpcRFKV-aZBy_m_vCIa8GBFBmjGsbcqbfornPGPo
    const credentials = btoa(`${email}:${password}`);
    const data = {
      credentials
    };

    const result = this._sendRequest('POST', 'login/email', data, false, true);
    if (result && result.accessToken) {
      store.set('token', result.accessToken.token);
      window.location.href = '/';
      return result;
    }
    return 'error';
  },

  /**
   * @todo use promises
   * @param method
   * @param endpoint
   * @param data
   * @param isAuth
   * @param isLogin
   * @returns {object}
   * @private
   */
  _sendRequest(method, endpoint, data, isAuth, isLogin) {
    const xhr = new XMLHttpRequest();

    xhr.open(method, `${config.apiUrl}/${endpoint}`, false); // Prod

    if (isAuth) {
      xhr.setRequestHeader('authorization', `bearer ${store.get('token')}`);
    } else if (isLogin) {
      xhr.setRequestHeader(
        'authorization',
        `bearer ${config.appToken}`
      );
    }

    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.setRequestHeader('x-veriapi-version', '20170518');

    if (data !== null) {
      xhr.send(JSON.stringify(data));
    } else {
      xhr.send();
    }

    const { status } = xhr;
    const response = xhr.responseText;

    if (status == '204') {
      return { code: '204' };
    }
    if (status == '200') {
      const result = JSON.parse(response);
      if (result) {
        return result;
      }
      return { code: '200' };
    }
    return {
      code: 'error',
      status,
      message: response
    };
  }
};
