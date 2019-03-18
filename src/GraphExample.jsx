import React from 'react';
import Dygraph from 'dygraphs';

const style = {
  legend: {
    fontSize: '0.8em',
    paddingTop: 5,
    width: 700,
  },
};

class GraphExample extends React.Component {
  constructor(props) {
    super(props);
    this.formatValue = this.formatValue.bind(this);
    this.legendFormatter = this.legendFormatter.bind(this);

  }

  legendFormatter(data) {
    if (data.x === undefined) {
      const defaultLegend = data.series.map((series) => `${series.dashHTML} ${series.labelHTML}`).join(' ');

      return `<br/> ${defaultLegend}`;
    }

    let html = `Time: ${data.xHTML}<br/>`;
    data.series.map(series => {
      if (!series.isVisible) return null;

      let labeledData = `${series.labelHTML}: ${series.yHTML}`;
      if (series.isHighlighted) {
        labeledData = `<b>${labeledData}</b>`;
      }

      html += ` ${series.dashHTML} ${labeledData}`;
      return null;
    });

    return html;
  }

  formatValue(timestamp) {
    return this.props.formatTimestamp(timestamp);
  }


  componentDidMount() {
    try {
      this.dygraph = new Dygraph(
        this.dygraphsDiv,
        this.props.data,
        {
          axes: {
            x: {
              axisLabelFormatter: this.formatValue,
            }
          },
          colors: ['#66c2a5', '#fc8d62', '#8da0cb', '#e78ac3'],
          height: 480,
          highlightSeriesOpts: { strokeWidth: 2 },
          includeZero: true,
          labels: this.props.labels,
          labelsDiv: this.legendDiv,
          legend: 'always',
          legendFormatter: this.legendFormatter,
          showRangeSelector: true,
          width: 900,
          ylabel: 'Value',
        }
      );
    } catch (e) {
      console.log('try new Dygraph Error: ', e);
    }
  }

  componentWillUnmount() {
    // destroy
  }

  render() {
    return (
      <div>
        <p>Dygraph Graph With React Example!</p>
        <div ref={el => this.legendDiv = el} style={style.legend} />
        <div ref={el => this.dygraphsDiv = el} />
      </div>
    );
  }
}

export default GraphExample;
