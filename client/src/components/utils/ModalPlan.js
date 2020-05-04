import React from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';

class ModalPlan extends React.Component {
  componentDidMount() {
    var elemModal = document.querySelectorAll('.modal');
    M.Modal.init(elemModal, {});
  }
  render() {
    const audio = {
      id: this.props.id,
      name: this.props.name,
      singer: this.props.singer,
      cover: this.props.cover,
      musicSrc: this.props.musicSrc,
    };
    return (
      <div>
        <a
          className="modal-trigger btn-cart hoverable"
          href={`#${this.props.name}`}
        >
          <i className="fas fa-cart-arrow-down"></i>
        </a>

        <div id={this.props.name} className="modal">
          <div className="modal-content">
            <div>
              <h5 className="center title-plan">
                Choose how you want to listen.
              </h5>
              <p className=" grey-text center">
                {this.props.name} - {this.props.singer}
              </p>
              <div className="row">
                <div className="col s12 m6">
                  <div className="box-plan">
                    <div className="header-plan">
                      <h6 className="center">Sound Gab Individual $0.99</h6>
                      <i className="fas fa-headphones-alt logo"></i>
                    </div>
                    <div className="content-plan">
                      <p className="grey-text">
                        <i className="fas fa-check"></i> Download Your MP3 sound
                      </p>
                      <p className="grey-text">
                        <i className="fas fa-check"></i> Add to your library
                      </p>
                      <p className="grey-text">
                        <i className="fas fa-check"></i> High quality audio
                      </p>
                    </div>
                    <div
                      onClick={() =>
                        this.props.addItem(0.99, audio, 'Indivual')
                      }
                      className="btn-add center modal-close"
                    >
                      Add Cart
                    </div>
                  </div>
                </div>
                <div className="col s12 m6">
                  <div className="box-plan">
                    <div className="header-plan">
                      <h6 className="center">Sound Gab Unlimited $5/Month</h6>
                      <i className="fas fa-headphones-alt logo"></i>
                    </div>
                    <div className="content-plan">
                      <p className="grey-text">
                        <i className="fas fa-check"></i> Download Unlimited MP3
                        sound
                      </p>
                      <p className="grey-text">
                        <i className="fas fa-check"></i> Add to your library
                      </p>
                      <p className="grey-text">
                        <i className="fas fa-check"></i> High quality audio
                      </p>
                    </div>
                    <div
                      onClick={() =>
                        this.props.addItem(5.0, audio, 'Unlimited')
                      }
                      className="btn-add center modal-close"
                    >
                      Add Cart
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ModalPlan;
