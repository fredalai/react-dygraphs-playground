import React from 'react';
import './App.css';
import Graphs from './Graphs';

import helper from './helper';
import fakeData from './fakeData';

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
        <Graphs
          graphData={fakeData}
          handleDragStart={this.dragStart}
          handleDragStop={this.dragStop}
          handleFormatTimestamp={helper.formatTimestamp}
          handleOnDrag={this.onDrag}
        />
      </div>
    );
  }
}

export default App;
