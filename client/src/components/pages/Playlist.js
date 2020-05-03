import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import SoundBar from '../utils/SoundBar';
import Preload from '../utils/preload';

class Playlist extends React.Component {
  state = {
    audio: [],
    playIndex: 0,
  };
  componentDidMount() {
    this.props.getSoundPlaylist(this.props.match.params.id);
  }

  selectSound = (idx) => {
    this.setState({ playIndex: idx });
  };

  renderMusicDownload = () => {
    return this.props.music.map((sound, idx) => {
      // const str = sound.musicSrc;
      // const music = str.replace('upload/', 'upload/fl_attachment/');
      return (
        <div key={idx} className="list-audio">
          <div className="btn-play" onClick={() => this.selectSound(idx)}>
            <i className="far fa-play-circle"></i>
          </div>
          <img className="cover-audio" src={sound.cover} alt="cover" />
          <div>
            {sound.name} <br></br>
            {sound.singer}
          </div>
          <a className="download-sound" href={sound.musicSrc} download>
            <i className="fas fa-download"></i>
          </a>
        </div>
      );
    });
  };

  render() {
    return (
      <div>
        {this.props.music ? (
          <div>
            {this.renderMusicDownload()}{' '}
            <SoundBar
              audio={this.props.music}
              playIndex={this.state.playIndex}
            />
          </div>
        ) : (
          <Preload />
        )}
      </div>
    );
  }
}

function mapStateToPros(state) {
  console.log(state);
  return {
    authenticated: state.auth.authenticated,
    music: state.playlist.listAudio.sounds,
  };
}

export default connect(mapStateToPros, actions)(Playlist);
