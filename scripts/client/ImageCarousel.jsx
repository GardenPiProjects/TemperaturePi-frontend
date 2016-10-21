import React, { Component, PropTypes } from 'react';
import ReactSwipe from 'react-swipe';
import Temp from './Temp.jsx';

export default class ImageCarousel extends Component {
  right() {
    this.refs.reactSwipe.next();
  }

  left() {
    this.refs.reactSwipe.prev();
  }

  image(url, temp, time) {
    return (
      <div key={time} className="latest-pic">
        <img src={url} alt="garden"/>
        <Temp temp={temp} time={time}/>
        <div className="swipe-left" onClick={()=> {
          this.right()
        }}></div>
        <div className="swipe-right" onClick={()=> {
          this.left()
        }}></div>
      </div>
    );
  }

  render() {
    return (
      <ReactSwipe ref="reactSwipe" className="carousel" swipeOptions={{ speed: 300, auto: 0 }}>
        {this.props.data.map(point=> {
          return this.image(point.url, point.temperature, point.timestamp);
        })}
      </ReactSwipe>
    );
  }
}

ImageCarousel.propTypes = {
  data: PropTypes.array.isRequired,
};
