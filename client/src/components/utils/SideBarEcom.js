import React from 'react';
import { connect } from 'react-redux';

class SidebarEcom extends React.Component {
  renderMusic = () => {
    return this.props.music.map((music, idx) => {
      return (
        <div key={idx} className="card-product hoverable">
          <img src={music.audio.cover} alt="cover" />

          <div className="card-product-infos">
            <div
              className="trash right hoverable"
              onClick={() => this.props.deleteItem(idx, music.price)}
            >
              <i className="far fa-trash-alt"></i>
            </div>
            <h2>{music.audio.name}</h2>
            <p>{music.audio.singer}</p>
            {music.plan} - ${music.price}
          </div>
        </div>
      );
    });
  };

  render() {
    return (
      <ul id="slide-ecom" className="sidenav sidenavEcom">
        <li onClick={() => this.props.closeSidebarEcom()}>
          <i className="far fa-times-circle right close-side"></i>
        </li>
        <li className=" title-shop center">Shopping Cart </li>
        <li>
          <div className="divider"></div>
        </li>
        <div className="sum">
          <p>
            items <span>{this.props.quantity}</span>
          </p>
          <p>
            Total <span>${this.props.total}</span>
          </p>
          {this.props.quantity === 0 ? (
            ''
          ) : (
            <a
              onClick={() => this.props.closeSidebarEcom()}
              className="modal-trigger  hoverable"
              href="#modalPayment"
            >
              <button>Check Out Now</button>
            </a>
          )}
        </div>
        <div className="box-render-audio">{this.renderMusic()}</div>
      </ul>
    );
  }
}

function mapStateToPros(state) {
  return {
    authenticated: state.auth.authenticated,
  };
}

export default connect(mapStateToPros)(SidebarEcom);
