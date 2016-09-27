import React, { Component } from 'react';
import Title from './title.jsx';
import Chart from './charts.jsx';
import Image from './Image.jsx';
import request from 'superagent';
import _ from 'lodash';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount() {
  request.get('/data/7')
      .end((err, res) => {
        const data = JSON.parse(res.text);
        this.setState({
          data,
        });
      });
  }

  render() {
    console.log(this.state.data)
    if(this.state.data.length > 0) {
      return (
        <div className="wrapper">
          <Title title="TemperaturePi"/>
          <Image url={this.state.data[0].url}/>
          <Chart data={_.sortBy(this.state.data, ['timestamp'])} />
        </div>
      );
    }
    else {
      return <div>Loading data</div>
    }
  }
}
