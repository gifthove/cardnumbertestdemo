import fetch from "isomorphic-fetch";
/* eslint-disable no-console */
/* eslint-disable no-debugger */

export class RefundCardSvc {
  constructor() {
    this.url = "/api/Refund/";
  }

  get Url() {
    return this.url;
  }

  set Url(newUrl) {
    this.url = newUrl;
  }

  Update(cardNumber) {
    this.Card = {
      CardNumber: cardNumber
    };

    return fetch(this.url, {
      method: "POST",
      body: JSON.stringify(this.Card),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(this.OnSuccess, this.OnError);
  }

  OnSuccess(response) {
    if (response.status === 200) {
      return response.json();
    } else {
      console.log(
        "Error trying to update 'cardNumber' logged from OnSuccess" + response
      );
      throw response;
    }
  }

  OnError(error) {
    console.log(
      "Error trying to update 'cardNumber' logged from OnError. Error: " + error
    );
    return {
      error: {
        code: 500,
        message: error
      }
    };
  }
}
