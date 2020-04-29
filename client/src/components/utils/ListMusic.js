import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import '../css/Music.css';
import ModalPlan from './ModalPlan';

class Music extends React.Component {
  renderList = () => {
    return this.props.audio.map((sound, idx) => {
      return (
        <div key={idx} className="list-audio">
          <button
            className="btn-play hoverable"
            onClick={() => this.props.selectSound(idx)}
          >
            <i className="far fa-play-circle"></i>
          </button>
          <img className="cover-audio" src={sound.cover} alt="cover" />
          <div>
            {sound.name} <br></br>
            {sound.singer}
          </div>
          <div className="add-cart">
            <ModalPlan
              name={sound.name}
              singer={sound.singer}
              cover={sound.cover}
              musicSrc={sound.musicSrc}
              addItem={this.props.addItem}
            />
          </div>
        </div>
      );
    });
  };

  render() {
    return <div>{this.renderList()}</div>;
  }
}

export default connect(null, actions)(Music);
