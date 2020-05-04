import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import '../css/Music.css';
import ModalPlan from './ModalPlan';
import { Toast } from 'react-materialize';

class Music extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  renderList = () => {
    return this.props.audio.map((sound, idx) => {
      return (
        <div key={idx} className="list-audio">
          <div className="btn-play" onClick={() => this.props.selectSound(idx)}>
            <i className="far fa-play-circle"></i>
          </div>
          <img className="cover-audio" src={sound.cover} alt="cover" />
          <div>
            {sound.name} <br></br>
            <span className="grey-text text-darken-3 lighten-3">
              {sound.singer}
            </span>
          </div>
          {this.props.auth.unlimited ? (
            <div
              onClick={() =>
                this.props.addMyPlaylist(sound, this.props.auth._id)
              }
              className="add-playlist"
            >
              <Toast
                className="toast-overwrite hoverable"
                options={{
                  html: 'Sound add to your playlist!',
                }}
              >
                <svg
                  height="20px"
                  width="20px"
                  fill="#FFFFFF"
                  viewBox="0 0 32 32"
                  x="0px"
                  y="0px"
                >
                  <path d="M10,22.68A4.87,4.87,0,0,0,7.5,22,4.27,4.27,0,0,0,3,26a4.27,4.27,0,0,0,4.5,4A4.27,4.27,0,0,0,12,26V14H10ZM7.5,28A2.3,2.3,0,0,1,5,26a2.3,2.3,0,0,1,2.5-2A2.3,2.3,0,0,1,10,26,2.3,2.3,0,0,1,7.5,28ZM17.82,4.22l.4,2,9.78-2V19.68A4.87,4.87,0,0,0,25.5,19,4.27,4.27,0,0,0,21,23a4.27,4.27,0,0,0,4.5,4A4.27,4.27,0,0,0,30,23V1.78ZM25.5,25A2.3,2.3,0,0,1,23,23a2.3,2.3,0,0,1,2.5-2A2.3,2.3,0,0,1,28,23,2.3,2.3,0,0,1,25.5,25ZM11,1a6,6,0,1,0,6,6A6,6,0,0,0,11,1Zm0,10a4,4,0,1,1,4-4A4,4,0,0,1,11,11Zm1-5h2V8H12v2H10V8H8V6h2V4h2Z" />
                </svg>
              </Toast>
            </div>
          ) : (
            <div className="add-cart">
              <ModalPlan
                id={sound._id}
                name={sound.name}
                singer={sound.singer}
                cover={sound.cover}
                musicSrc={sound.musicSrc}
                addItem={this.props.addItem}
              />
            </div>
          )}
        </div>
      );
    });
  };

  render() {
    return <div>{this.renderList()}</div>;
  }
}

function mapStateToPros(state) {
  return {
    auth: state.auth.authenticated,
  };
}

export default connect(mapStateToPros, actions)(Music);
