import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Sidebar from '../utils/Sidebar';
import SideBarEcom from './SideBarEcom';

class Header extends React.Component {
  renderLinks() {
    if (this.props.authenticated) {
      return (
        <div>
          <li>
            <Link to="/signout">Signout</Link>
          </li>
          <li>
            <Link to="/register/music">Add Music</Link>
          </li>
          <li>
            <Link to="/music/list/All">Music</Link>
          </li>
          <li>
            <p data-target="slide-ecom" className="sidenav-trigger" to={''}>
              {this.props.quantity >= 1 && this.props.quantity}
              <i className="fas fa-shopping-cart"></i>
            </p>
          </li>
          <li>
            <Link to={`/user/${this.props.authenticated._id}`}>
              <img
                className="avatar"
                src={
                  this.props.authenticated.avatar ||
                  process.env.PUBLIC_URL + '/images/background.jpg'
                }
                alt="background"
              />
            </Link>
          </li>
        </div>
      );
    } else {
      return (
        <div>
          <li>
            <Link to="/music/list/All">Music</Link>
          </li>
          <li>
            <p data-target="slide-ecom" className="sidenav-trigger" to={''}>
              {this.props.quantity >= 1 && this.props.quantity}
              <i className="fas fa-shopping-cart"></i>
            </p>
          </li>
          <li>
            <Link to="/signin">login</Link>
          </li>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <Link className="brand-logo" to="/">
              <span className="title-logo">
                <img
                  className="logo-img"
                  src={
                    process.env.PUBLIC_URL + '/images/DeadPoetRecords-logo.png'
                  }
                  alt="logo"
                />
                Dead Poet Records
              </span>
            </Link>
            <a href="#/" data-target="slide-out" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              {this.renderLinks()}
            </ul>
          </div>
        </nav>
        <SideBarEcom
          total={this.props.total}
          quantity={this.props.quantity}
          music={this.props.music}
          deleteItem={this.props.deleteItem}
          closeSidebarEcom={this.props.closeSidebarEcom}
        />
        <Sidebar
          total={this.props.total}
          quantity={this.props.quantity}
          music={this.props.music}
          deleteItem={this.props.deleteItem}
          closeSidebar={this.props.closeSidebar}
        />
      </div>
    );
  }
}

function mapStateToPros(state) {
  return {
    authenticated: state.auth.authenticated,
  };
}

export default connect(mapStateToPros)(Header);
