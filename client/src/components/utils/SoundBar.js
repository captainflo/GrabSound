import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import ReactJkMusicPlayer from 'react-jinke-music-player';
import '../css/SoundBar.css';

class SoundBar extends React.Component {
  constructor() {
    super();
    this.audioInstance = null;
  }
  render() {
    return (
      <div>
        <>
          <ReactJkMusicPlayer
            playIndex={this.props.playIndex}
            audioLists={this.props.audio}
            autoPlayInitLoadPlayList={false}
            showDownload={false}
            showReload={false}
            clearPriorAudioLists={true}
            mode={'full'}
            getAudioInstance={(instance) => (this.audioInstance = instance)}
          />
        </>
      </div>
    );
  }
}

export default connect(null, actions)(SoundBar);
