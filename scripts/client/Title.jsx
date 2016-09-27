import React, {Component} from 'react';

export default function Title({ title }){
  return (
      <div className="panel-title">
       <img id="fadein" src="/images/Beach.svg" />
        <h1>{title}</h1>
<img id="fadein" src="/images/Pool.svg" />
      </div>
        );
}
