import React from 'react';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

import DygraphsGraph from './DygraphsGraph';

const style = {
  cardHeader: {
    height: 32,
    lineHeight: '32px',
  },
  cardBlock: {
    border: '1px solid rgba(34,36,38,.15)',
    boxShadow: '0 1px 2px 0 rgba(34,36,38,.15)',
    margin: 8,
  }
};

function dragSourceCollect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDragSource: connect.dragSource(),
    // You can ask the monitor about the current drag state:
    isDragging: monitor.isDragging(),
  }
}

const dragSourceSpec = {
  beginDrag(props, monitor) {
    return {
      ...props,
    }
  },
};

class GraphCard extends React.Component {
  componentDidMount() {
    const { connectDragPreview } = this.props
    if (connectDragPreview) {
      // Use empty image as a drag preview so browsers don't draw it
      // and we can draw whatever we want on the custom drag layer instead.
      connectDragPreview(getEmptyImage(), {
        // IE fallback: specify that we'd rather screenshot the node
        // when it already knows it's being dragged so we can hide it with CSS.
        captureDraggingState: true,
      })
    }
  }

  render() {
    const {
      connectDragSource,
      data,
      handleFormatTimestamp,
      index,
      isDragging,
      labels,
    } = this.props;

    return connectDragSource(
      <div style={style.cardBlock}>
        <div style={{
          ...style.cardHeader,
          cursor: isDragging ? 'grabbing' : 'pointer',
        }}>
          Dygraph Graph With React Example! {index}
          {isDragging && ' (and I am being dragged now)'}
        </div>
        <DygraphsGraph
          data={data}
          index={index}
          formatTimestamp={handleFormatTimestamp}
          labels={labels}
        />
      </div>
    );
  }
};

export default DragSource('GRAPH', dragSourceSpec, dragSourceCollect)(GraphCard);
