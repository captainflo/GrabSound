import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

class Payments extends React.Component {
  render() {
    const musicArray = [];
    for (let i = 0; i < this.props.music.length; i++) {
      const musicId = this.props.music[i].audio.id;
      musicArray.push(musicId);
    }
    const form = {
      total: this.props.total * 100,
      musicId: musicArray,
      userId: this.props.userId,
    };
    console.log(form);

    return (
      <StripeCheckout
        amount={this.props.total * 100}
        token={(token) =>
          this.props.handleToken(token, form, () => {
            this.props.history.push(`/playlist/${form.userId}`);
          })
        }
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
        name="Grab Sound"
        description={`$${this.props.total}`}
      >
        <span className="btn-payment center modal-close ">Payment</span>
      </StripeCheckout>
    );
  }
}

export default compose(withRouter, connect(null, actions))(Payments);
