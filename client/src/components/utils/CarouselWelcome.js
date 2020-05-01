import React, { Component } from 'react';
import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

class Carousel extends Component {
  componentDidMount() {
    const options = {
      duration: 300,
    };
    M.Carousel.init(this.Carousel, options);
    console.log(this.props.music);
  }

  renderThis = () => {
    return this.props.music.map((i) => (
      <div
        onClick={() => this.props.play(i)}
        key={i.cover}
        className="carousel-item"
      >
        <img src={i.cover} alt="cover" />
      </div>
    ));
  };

  render() {
    return (
      <div>
        <h2>Last Sound</h2>
        <div
          ref={(Carousel) => {
            this.Carousel = Carousel;
          }}
          className="carousel"
        >
          {this.renderThis()}
        </div>
      </div>
    );
  }
}

export default Carousel;
