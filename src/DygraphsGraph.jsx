import React from 'react';
import Dygraph from 'dygraphs';

const style = {
  graphBlock: {
    borderTopColor: '#22242626',
    borderTopStyle: 'solid',
    borderTopWidth: 1,
    marginBottom: 16,
    paddingBottom: 24,
    paddingLeft: 16,
  },
  legend: {
    fontSize: '0.8em',
    paddingLeft: 56,
    paddingTop: 5,
    textAlign: 'left',
  },
};

class DygraphsGraph extends React.Component {
  constructor(props) {
    super(props);

    this.formatValue = this.formatValue.bind(this);
    this.legendFormatter = this.legendFormatter.bind(this);
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
          height: 280,
          highlightSeriesOpts: { strokeWidth: 2 },
          includeZero: true,
          labels: this.props.labels,
          labelsDiv: this.legendDiv,
          legend: 'always',
          legendFormatter: this.legendFormatter,
          showRangeSelector: true,
          width: this.props.width,
          ylabel: 'Value',
        }
      );
    } catch (e) {
      console.log('try new Dygraph Error: ', e);
    }
  }

  formatValue(timestamp) {
    return this.props.formatTimestamp(timestamp);
  }

  legendFormatter(data) {
    if (data.x === undefined) {
      const defaultLegend = data.series.map((series) => `${series.dashHTML} ${series.labelHTML}`).join(' ');

      return `<br/> ${defaultLegend}`;
    }

    let html = `Time: ${this.formatValue(data.xHTML)}<br/>`;
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

  componentWillUnmount() {
    // TODO(fredalai): Should add dygraphs destroy
  }

  render() {
    return (
      <div style={style.graphBlock} key={this.props.index}>
        <div ref={el => this.legendDiv = el} style={style.legend} />
        <div ref={el => this.dygraphsDiv = el} />
      </div>
    );
  }
}

export default DygraphsGraph;
