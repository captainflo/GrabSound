import React from 'react';
import '../css/Welcome.css';
import { connect } from 'react-redux';
import * as actions from '../actions';
import FormSearch from '../utils/FormSearch';
import CarouselWelcome from '../utils/CarouselWelcome';
import SoundBar from '../utils/SoundBar';

class Welcome extends React.Component {
  state = {
    audio: [],
  };

  componentDidMount() {
    this.props.getAllMusic();
  }

  play = (music) => {
    this.setState({ audio: [music] });
  };

  render() {
    console.log(this.state.audio);
    return (
      <div>
        <div className="banner-welcome">
          <h4 className="center">Listen live and Download it</h4>
          <div className="box-form-search-welcome">
            <FormSearch />
          </div>
        </div>
        {this.props.music ? (
          <CarouselWelcome music={this.props.music} play={this.play} />
        ) : (
          <div className="preloader-wrapper big active">
            <div className="spinner-layer spinner-blue">
              <div className="circle-clipper left">
                <div className="circle"></div>
              </div>
              <div className="gap-patch">
                <div className="circle"></div>
              </div>
              <div className="circle-clipper right">
                <div className="circle"></div>
              </div>
            </div>
          </div>
        )}
        {this.state.audio.length !== 0 ? (
          <SoundBar audio={this.state.audio} />
        ) : (
          ''
        )}
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
