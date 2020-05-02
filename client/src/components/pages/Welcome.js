import React from 'react';
import '../css/Welcome.css';
import { connect } from 'react-redux';
import '../css/Welcome.css';
import * as actions from '../actions';
import FormSearch from '../utils/FormSearch';
import CarouselWelcome from '../utils/CarouselWelcome';
import SoundBar from '../utils/SoundBar';
import Preload from '../utils/preload';
import M from 'materialize-css/dist/js/materialize.min.js';
import WHY from '../utils/Why';
import BannerPhone from '../utils/BannerPhone';

class Welcome extends React.Component {
  state = {
    audio: [],
  };

  componentDidMount() {
    this.props.getAllMusic();
    const elems = document.querySelectorAll('.parallax');
    M.Parallax.init(elems, { height: '200px' });
  }

  play = (music) => {
    this.setState({ audio: [music] });
  };

  render() {
    return (
      <div>
        <div className="banner-welcome">
          <h2 className="center">Music for everyone.</h2>
          <div className="box-form-search-welcome">
            <FormSearch />
          </div>
        </div>
        {this.props.music ? (
          <CarouselWelcome music={this.props.music} play={this.play} />
        ) : (
          <div className="parallax-container">
            <Preload />
          </div>
        )}
        {this.state.audio.length !== 0 ? (
          <SoundBar audio={this.state.audio} />
        ) : (
          ''
        )}
        <WHY />
        <BannerPhone />
      </div>
    );
  }
}
function mapStateToPros(state) {
  return {
    music: state.music.allMusic,
  };
}

export default connect(mapStateToPros, actions)(Welcome);
