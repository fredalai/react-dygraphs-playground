import React from 'react';
import Dygraph from 'dygraphs';

const style = {
  graphBlock: {
    border: '1px solid rgba(34,36,38,.15)',
    boxShadow: '0 1px 2px 0 rgba(34,36,38,.15)',
    margin: 16,
    paddingBottom: 24,
    paddingLeft: 16,
    width: 750,
  },
  legend: {
    fontSize: '0.8em',
    paddingLeft: 56,
    paddingTop: 5,
    textAlign: 'left',
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
          height: 280,
          highlightSeriesOpts: { strokeWidth: 2 },
          includeZero: true,
          labels: this.props.labels,
          labelsDiv: this.legendDiv,
          legend: 'always',
          legendFormatter: this.legendFormatter,
          showRangeSelector: true,
          width: 700,
          ylabel: 'Value',
        }
      );
    } catch (e) {
      console.log('try new Dygraph Error: ', e);
    }
  }

  componentWillUnmount() {
    // TODO(fredalai): Should add dygraphs destroy
  }

  render() {
    return (
      <div>
        <div style={style.graphBlock}>
          <p>Dygraph Graph With React Example! {this.props.index}</p>
          <div ref={el => this.legendDiv = el} style={style.legend} />
          <div ref={el => this.dygraphsDiv = el} />
        </div>
      </div>
    );
  }
}

export default GraphExample;
