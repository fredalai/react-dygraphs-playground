import React from 'react';
import DygraphsGraph from './DygraphsGraph';
import GridDraggable, { Section } from 'grid-draggable';
import './App.css';

import helper from './helper';
import fakeData from './fakeData';
const labels = fakeData.labels;
const data = fakeData.values;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.dragStart = this.dragStart.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.dragStop = this.dragStop.bind(this);
  }

  dragStart(e, data) {
    console.log('start: ', data);
  }

  onDrag(e, data, match) {
    console.log('drag: ', data, match);
  }

  dragStop(e, data) {
    console.log('stop: ', data);
  }

  render() {
    return (
      <div className="App">
        <GridDraggable
          dragStart={this.dragStart}
          onDrag={this.onDrag}
          dragStop={this.dragStop}
          lg={5}
          md={3}
          xs={6}
          rowClassName="row-test"
          colClassName="col-test"
        >
          <Section key="N1">
            <DygraphsGraph
              data={data}
              index="N1"
              formatTimestamp={helper.formatTimestamp}
              labels={labels}
            />
          </Section>
          <Section key="N2">
            <DygraphsGraph
              data={data}
              index="N2"
              formatTimestamp={helper.formatTimestamp}
              labels={labels}
            />
          </Section>
          <Section key="N3">
            <DygraphsGraph
              data={data}
              index="N3"
              formatTimestamp={helper.formatTimestamp}
              labels={labels}
            />
          </Section>
          <Section key="N4">
            <DygraphsGraph
              data={data}
              index="N4"
              formatTimestamp={helper.formatTimestamp}
              labels={labels}
            />
          </Section>
        </GridDraggable>
      </div>
    );
  }
}

export default App;
