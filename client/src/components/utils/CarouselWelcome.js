import React, { Component } from 'react';
import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

class CarouselWelcome extends Component {
  componentDidMount() {
    const options = {
      duration: 300,
      numVisible: 14,
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
        <img className="carousel-cover" src={i.cover} alt="cover" />
      </div>
    ));
  };

  render() {
    return (
      <div className="section">
        <h3 className="center">Last Sound</h3>
        <h6 className="center">Listen the last Release</h6>
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

export default CarouselWelcome;
