import React, { Component } from 'react';
import Chart from './charts.jsx';
import ImageCarousel from './ImageCarousel.jsx';
import request from 'superagent';
import _ from 'lodash';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      url: '',
      time:'',
      temp:'',
    }
  }

  componentDidMount() {
  request.get('/data/24')
      .end((err, res) => {
        const data = JSON.parse(res.text);
        this.setState({
          data,
          url: data[0].url,
          time: data[0].timestamp,
          temp: data[0].temperature,
        });
      });
  }

  handleChartClick(o) {
    if(o.url) {
      this.setState({
        url: o.url,
        time: o.timestamp,
        temp: o.temperature
      });
    }
  }

  render() {
    if(this.state.data.length > 0) {
      //noinspection Eslint
      return (
        <div className="wrapper">
          <ImageCarousel data={this.state.data} />
          <Chart data={_.sortBy(this.state.data, ['timestamp'])} handleChartClick={ o => this.handleChartClick(o)} />
        </div>
      );
    }
    else {
      return <div>Loading data</div>
    }
  }
}
