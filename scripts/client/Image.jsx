import React, { PropTypes } from 'react';

export default function Image({ url }){

  return <img className="latest-pic" src={url} />
}

Image.propTypes = {
  url: PropTypes.string.isRequired,
};
