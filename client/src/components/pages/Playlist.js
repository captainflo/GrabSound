import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import SoundBar from '../utils/SoundBar';

class Playlist extends React.Component {
  state = {
    audio: [],
    playIndex: 0,
  };
  componentDidMount() {
    this.props.getSoundPlaylist(this.props.match.params.id);
  }

  Download = (audioSrc) => {
    console.log(audioSrc);
    let str = audioSrc;
    const music = str.replace('upload/', 'upload/fl_attachment/');
    window.open(music);
  };

  selectSound = (idx) => {
    this.setState({ playIndex: idx });
  };

  renderMusicDownload = () => {
    return this.props.music.map((sound, idx) => {
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
          <div
            onClick={() => this.Download(sound.musicSrc)}
            className="download-sound"
          >
            <i className="fas fa-download"></i>
          </div>
        </div>
      );
    });
  };

  render() {
    return (
      <div>
        {this.props.music ? (
          <div>
            <div className="hearder-playlist">
              <h2 className="center">My Playlist Sound</h2>
              <div className="center icon">
                <i className="fas fa-compact-disc"></i>{' '}
                <i className="fas fa-headphones-alt"></i>
                <i className="fas fa-music"></i>
              </div>
            </div>
            {this.renderMusicDownload()}{' '}
            <SoundBar
              audio={this.props.music}
              playIndex={this.state.playIndex}
            />
          </div>
        ) : (
          <div style={{ padding: '10px' }} className="center">
            <h2>You don't have Playlist...</h2>
            <p>Go to Music Store and grab your sound </p>
            <div style={{ fontSize: '45px' }}>
              <i className="fas fa-compact-disc"></i>{' '}
              <i className="fas fa-headphones-alt"></i>
              <i className="fas fa-music"></i>
            </div>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToPros(state) {
  return {
    authenticated: state.auth.authenticated,
    music: state.playlist.listAudio.sounds,
  };
}

export default connect(mapStateToPros, actions)(Playlist);
