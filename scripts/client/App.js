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
      data: [],
      url: '',
    }
  }

  componentDidMount() {
  request.get('/data/24')
      .end((err, res) => {
        const data = JSON.parse(res.text);
        this.setState({
          data,
          url: data[0].url,
        });
      });
  }

  handleChartClick(o) {
    if(o.url) {
      this.setState({
        url: o.url,
      });
    }
  }

  render() {
    if(this.state.data.length > 0) {
      return (
        <div className="wrapper">
          <Title title="TemperaturePi"/>
          <Image url={this.state.url}/>
          <Chart data={_.sortBy(this.state.data, ['timestamp'])} handleChartClick={ o => this.handleChartClick(o)} />
        </div>
      );
    }
    else {
      return <div>Loading data</div>
    }
  }
}
