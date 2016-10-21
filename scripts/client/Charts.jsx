import Highcharts from 'highcharts';
import React, { Component, PropTypes } from 'react';
import moment from 'moment';
export default class Chart extends Component {
// When the DOM is ready, create the chart.
  componentDidMount() {
    Highcharts.setOptions(this.getChartStyle());
    const temp = [];
    const timestamp = [];
    this.props.data.forEach(doc => {
      temp.push(doc.temperature);
      const time = moment(doc.timestamp).format('ddd, hA')
      timestamp.push(time);
    });
    this.setState({ temp });
    this.setState({ timestamp }, ()=>{
      this.chart =  Highcharts.chart('highcharts', this.getChartDetails());
    });
  }

  //Destroy chart before unmount.
  componentWillUnmount() {
    this.chart.destroy();
  }
  getChartStyle() {
    return {
      colors: ["#514F78", "#42A07B", "#9B5E4A", "#72727F", "#1F949A", "#82914E", "#86777F", "#42A07B"],
      chart: {
        className: 'skies',
        borderWidth: 0,
        plotShadow: true,
        plotBackgroundImage: 'http://www.highcharts.com/demo/gfx/skies.jpg',
        plotBackgroundColor: {
          linearGradient: [0, 0, 250, 500],
          stops: [
            [0, 'rgba(255, 255, 255, 1)'],
            [1, 'rgba(255, 255, 255, 0)']
          ]
        },
        plotBorderWidth: 1
      },
      title: {
        style: {
          color: '#3E576F',
          font: '16px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
        }
      },
      subtitle: {
        style: {
          color: '#6D869F',
          font: '12px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
        }
      },
      xAxis: {
        gridLineWidth: 0,
        lineColor: '#C0D0E0',
        tickColor: '#C0D0E0',
        labels: {
          style: {
            color: '#666',
            fontWeight: 'bold'
          }
        },
        title: {
          style: {
            color: '#666',
            font: '12px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
          }
        }
      },
      yAxis: {
        alternateGridColor: 'rgba(255, 255, 255, .5)',
        lineColor: '#C0D0E0',
        tickColor: '#C0D0E0',
        tickWidth: 1,
        labels: {
          style: {
            color: '#666',
            fontWeight: 'bold'
          }
        },
        title: {
          style: {
            color: '#666',
            font: '12px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
          }
        }
      },
      legend: {
        itemStyle: {
          font: '9pt Trebuchet MS, Verdana, sans-serif',
          color: '#3E576F'
        },
        itemHoverStyle: {
          color: 'black'
        },
        itemHiddenStyle: {
          color: 'silver'
        }
      },
      labels: {
        style: {
          color: '#3E576F'
        }
      }
    }}
  getChartDetails() {
    let self = this;
    return {
      chart: {
        renderTo: 'highcharts',
        type: 'line',
      },
      title: {
        text: 'Indoor temperature'
      },
      xAxis: {
        categories: this.state.timestamp,
      },
      series: [{
        data: this.state.temp,
        step: 'right',
        name: '˚C',
      }],
      plotOptions: {
        series: {
          cursor: 'pointer',
          point: {
            events: {
              click(e) {
                const o = self.props.data.filter((obj) => {
                  if(moment(obj.timestamp).format('ddd, hA') === e.point.category) {
                  return obj;
                }
                });
                self.props.handleChartClick(o[0]);
              },
            },
          },
        },
      },
      };
  }

//Create the div which the chart will be rendered to.
  render() {
    return <div id="highcharts"></div>;
  }
}

Chart.propTypes = {
  data: PropTypes.array.isRequired,
  handleChartClick: PropTypes.func.isRequired,
}
