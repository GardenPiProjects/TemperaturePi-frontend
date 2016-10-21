import React, { PropTypes } from 'react';
import moment from 'moment';

export default function Temp({ temp, time }){

  return (
    <p className="current-temp">{`${temp} ˚C @ ${moment(time).format('ddd, hA')}`}</p>
  );
}
Temp.propTypes = {
  temp: PropTypes.number.isRequired,
  time: PropTypes.number.isRequired,
};
