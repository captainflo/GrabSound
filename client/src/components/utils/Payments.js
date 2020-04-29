import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

class Payments extends React.Component {
  render() {
    const form = {
      total: this.props.total * 100,
    };
    return (
      <StripeCheckout
        amount={this.props.total * 100}
        token={(token) =>
          this.props.handleToken(token, form, () => {
            this.props.paymentSucces();
            this.props.history.push(`/succes/payment`);
          })
        }
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
        name="Dead Poet Records"
        description={`$${this.props.total}`}
      >
        <span className="btn-payment center modal-close ">Payment</span>
      </StripeCheckout>
    );
  }
}

export default compose(withRouter, connect(null, actions))(Payments);
