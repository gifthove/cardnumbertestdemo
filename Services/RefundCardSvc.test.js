import { expect } from "chai";
import { RefundCardSvc } from "./RefundCardSvc";
import nock from "nock";

describe("Testing RefundCardSvc API with a mocked backend", function() {
  let cardNumber;
  let response;
  let svc;

  beforeEach(() => {
    svc = new RefundCardSvc();
    svc.Url = "http://localhost:4247/api/Refund/";
    cardNumber = "0864566536090";
  });

  it("Posts and returns the CardNumber Posted", done => {
    // Arrange
    //setting up the expected response
    response = {
      result: {
        cards: [
          {
            cardNumber: cardNumber
          }
        ]
      }
    };

    //Mock the call by hijacking the call using nock
    nock("http://localhost:4247/api/Refund/")
      .post("/", { CardNumber: cardNumber })
      .reply(200, response);

    // Act
    svc
      .Update(cardNumber)
      .then(resp => {
        // Assert
        expect(resp.result.cards[0].cardNumber).to.equal("0864566536090");
      })
      .then(done, done);
  });

  it("Posts and returns an Error for internal Server ", done => {
    // Arrange
    response = {
      error: {
        code: 500,
        message: "Internal server error occurred"
      }
    };

    //Mock the call by hijacking the call using nock
    nock("http://localhost:4247/api/Refund/")
      .post("/", { CardNumber: cardNumber })
      .reply(200, response);

    //Act
    svc
      .Update(cardNumber)
      .then(resp => {
        // Assert
        expect(resp.error.code).to.equal(500);
      })
      .then(done, done);
  });
});
