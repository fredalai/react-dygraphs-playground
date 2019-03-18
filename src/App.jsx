import React from 'react';
import GraphExample from './GraphExample';
import './App.css';

import helper from './helper';
import fakeData from './fakeData';
const labels = fakeData.labels;
const data = fakeData.values;

const App = () => (
  <div className="App">
    <GraphExample
      data={data}
      formatTimestamp={helper.formatTimestamp}
      labels={labels}
    />
  </div>
);

export default App;
