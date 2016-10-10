import React, { PropTypes } from 'react';
import Temp from './Temp.jsx';
export default function Image({ url, time, temp }){
  return (
    <div className="latest-pic">
      <img src={url} />
      <Temp temp={temp} time={time} />
    </div>
  );
}

Image.propTypes = {
  url: PropTypes.string.isRequired,
};
