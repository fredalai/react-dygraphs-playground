import React from 'react';
import DygraphsGraph from './DygraphsGraph';

import helper from './helper';
import fakeDataA from './fakeData';
import fakeDataB from './fakeData0';
import fakeDataC from './fakeData1';
import fakeDataD from './fakeData2';

class Graphs extends React.PureComponent {
  render() {
    return [fakeDataA, fakeDataB, fakeDataC, fakeDataD].map(
      ({ labels, values }, i) => {
      return (
        <div key={i}>
          <DygraphsGraph
            data={values}
            index="N1"
            formatTimestamp={helper.formatTimestamp}
            labels={labels}
          />
        </div>
      );
    });
  }
}

export default Graphs;
