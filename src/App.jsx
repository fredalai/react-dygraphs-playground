import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import './App.css';
import Graphs from './Graphs';

import helper from './helper';
import fakeData from './fakeData';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fakeData,
    }

    this.updateFakeDataSort = this.updateFakeDataSort.bind(this);
  }

  updateFakeDataSort(currentPoistionId, targetPoistionId) {
    const { fakeData } = this.state;
    console.log(currentPoistionId, targetPoistionId);
    const currentIndex = fakeData.findIndex(g => g.index === currentPoistionId);
    const targetIndex = fakeData.findIndex(g => g.index === targetPoistionId);
    const temp = fakeData[currentIndex];
    fakeData.splice(currentIndex, 1, fakeData[targetIndex]);
    fakeData.splice(targetIndex, 1, temp);

    this.setState({ fakeData });
  }

  render() {
    return (
      <div className="App">
        {this.state.fakeData.map(
          ({ labels, values, index }, i) => {
          return (
            <Graphs
              data={values}
              handleFormatTimestamp={helper.formatTimestamp}
              handleSortFakeData={this.updateFakeDataSort}
              index={index}
              key={index}
              labels={labels}
            />
          );
        })}
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
