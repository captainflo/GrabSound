import React, { Component } from 'react';

class BannerPhone extends Component {
  render() {
    return (
      <div className="section">
        <div className="container">
          <div className="row">
            <div className="col m6">
              <img
                className="iphone"
                src={process.env.PUBLIC_URL + '/images/1.png'}
              />
            </div>
            <div className="col m6">
              <div className="box-text-device">
                <h4>Listen anytime, anywhere.</h4>
                <p>Take your music with you wherever you go.</p>
                <p>Listen to Sound Grab on mobile devices, desktop, tablet</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BannerPhone;
