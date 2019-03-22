import React from 'react';
import GridDraggable, { Section } from 'grid-draggable';
import DygraphsGraph from './DygraphsGraph';


class Graphs extends React.PureComponent {
  render() {
    const {
      graphData,
      handleDragStart,
      handleDragStop,
      handleFormatTimestamp,
      handleOnDrag,
    } = this.props;

    return (
      <GridDraggable
        dragStart={handleDragStart}
        onDrag={handleOnDrag}
        dragStop={handleDragStop}
        lg={6}
        md={3}
        xs={6}
        rowClassName="row-test"
        colClassName="col-test"
      >
        {
          graphData.map(
            ({ labels, values }, i) => {
            return (
              <Section key={i}>
                <DygraphsGraph
                  data={values}
                  index={`N${i}`}
                  formatTimestamp={handleFormatTimestamp}
                  labels={labels}
                />
              </Section>
            );
          })
        }
      </GridDraggable>
    );
  }
}

export default Graphs;
