import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import '../css/Music.css';
import SoundBar from '../utils/SoundBar';
import ListMusic from '../utils/ListMusic';
import FronSearch from '../utils/FormSearch';

class Music extends React.Component {
  state = {
    audio: [],
    playIndex: 0,
  };
  componentDidMount() {
    this.props.getMusicByGenre(this.props.match.params.id);
  }

  selectSound = (idx) => {
    this.setState({ playIndex: idx });
  };

  render() {
    return (
      <div>
        <div className="box-search-form">
          <h4>List Music</h4>
          <FronSearch />
        </div>
        {this.props.sounds.length !== 0 ? (
          <div className="box-list-music">
            <ListMusic
              selectSound={this.selectSound}
              audio={this.props.sounds}
              addItem={this.props.addItem}
            />
            <SoundBar
              audio={this.props.sounds}
              playIndex={this.state.playIndex}
            />
          </div>
        ) : (
          <div className="center">No list found </div>
        )}
      </div>
    );
  }
}

function mapStateToPros(state) {
  return {
    sounds: state.music.musicByGenre,
  };
}

export default connect(mapStateToPros, actions)(Music);
