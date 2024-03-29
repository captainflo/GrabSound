import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import * as actions from './actions';
import { connect } from 'react-redux';
import M from 'materialize-css/dist/js/materialize.min.js';
import './App.css';

import Header from './utils/Header';
import Welcome from './pages/Welcome';
import Footer from './utils/Footer';

import Signout from './auth/Signout';
import Signin from './auth/Signin';
import Signup from './auth/Signup';
import UserShow from './user/UserShow';
import UserEdit from './user/UserEdit';
import Music from './pages/Music';
import RegisterMusic from './pages/RegisterMusic';
import ModalAgreement from './utils/ModalAgreement';
import Playlist from './pages/Playlist';

class App extends React.Component {
  state = {
    quantity: 0,
    total: 0,
    music: [],
  };

  componentDidMount() {
    this.props.fetchUser();
    // Sidebar
    const elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems, {});
    // Sidebar Ecom
    const elemside = document.querySelectorAll('.sidenavEcom');
    M.Sidenav.init(elemside, { edge: 'right' });
  }

  addItem = (price, audio, plan) => {
    this.setState({
      quantity: this.state.quantity + 1,
      total: this.state.total + price,
      music: [
        ...this.state.music,
        {
          audio,
          plan,
          price,
        },
      ],
    });
    const elem = document.querySelector('.sidenavEcom');
    const instance = new M.Sidenav(elem, { edge: 'right' });
    instance.open();
  };

  addMyPlaylist = (sound, userId) => {
    const form = {
      userId: userId,
      musicId: sound._id,
    };

    this.props.addPlaylist(form, () =>
      this.props.history.push(`/playlist/${form.userId}`)
    );
  };

  deleteItem = (idx, price) => {
    this.state.music.splice(idx, idx + 1);
    this.forceUpdate();
    this.setState({
      total: this.state.total - price,
      quantity: this.state.quantity - 1,
    });
  };

  closeSidebar = () => {
    const elem = document.querySelector('.sidenav');
    const instance = new M.Sidenav(elem, {});
    instance.close();
  };

  closeSidebarEcom = () => {
    const elem = document.querySelector('.sidenavEcom');
    const instance = new M.Sidenav(elem, { edge: 'right' });
    instance.close();
  };

  render() {
    return (
      <div>
        <BrowserRouter>
          <Header
            quantity={this.state.quantity}
            total={this.state.total}
            music={this.state.music}
            deleteItem={this.deleteItem}
            closeSidebar={this.closeSidebar}
            closeSidebarEcom={this.closeSidebarEcom}
          />
          <Route exact path="/" component={Welcome} />
          <Route exact path="/signout" component={Signout} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/signup" component={Signup} />
          <Route
            exact
            path="/music/list/:id"
            render={(props) => (
              <Music
                {...props}
                addItem={this.addItem}
                addMyPlaylist={this.addMyPlaylist}
              />
            )}
          />
          {this.props.authenticated ? (
            <div>
              <Route exact path="/user/:id" component={UserShow} />
              <Route exact path="/user/edit/:id" component={UserEdit} />
              <Route exact path="/register/music" component={RegisterMusic} />
              <Route exact path="/playlist/:id" component={Playlist} />
              <ModalAgreement
                userId={this.props.authenticated._id}
                music={this.state.music}
                total={this.state.total}
              />
            </div>
          ) : (
            <ModalAgreement music={this.state.music} total={this.state.total} />
          )}
          <Footer />
        </BrowserRouter>
      </div>
    );
  }
}

function mapStateToPros(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToPros, actions)(App);
