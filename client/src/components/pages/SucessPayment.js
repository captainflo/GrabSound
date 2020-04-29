import React from 'react';
import '../css/Welcome.css';
import { connect } from 'react-redux';
import * as actions from '../actions';

class SucessPayment extends React.Component {
  renderMusicDownload = () => {
    return this.props.music.map((sound, idx) => {
      const str = sound.audio.musicSrc;
      const music = str.replace('upload/', 'upload/fl_attachment/');
      return (
        <div key={idx} className="list-audio">
          <img className="cover-audio" src={sound.audio.cover} alt="cover" />
          <div>
            {sound.audio.name} <br></br>
            {sound.audio.singer}
          </div>
          <a className="download-sound" href={music}>
            <i className="fas fa-download"></i>
          </a>
        </div>
      );
    });
  };

  render() {
    console.log(this.props.music);
    return (
      <div className="container">
        <h4>Congratulation!</h4>
        <p>Download your sounds</p>
        {this.props.payment
          ? this.renderMusicDownload()
          : 'you can have sucess payment you did not pay me'}
      </div>
    );
  }
}

export default connect(null, actions)(SucessPayment);
