import React from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

import DygraphsGraph from './DygraphsGraph';

const style = {
  cardBlock: {
    border: '1px solid rgba(34,36,38,.15)',
    boxShadow: '0 1px 2px 0 rgba(34,36,38,.15)',
    margin: 8,
  },
  cardHeader: {
    alignItems: 'center',
    display: 'flex',
    height: 32,
    justifyContent: 'space-between',
  },
  cardHeaderTitle: {
    flexGrow: 1,
  },
  cardHeaderTool: {
    height: 32,
    position: 'relative',
    width: 48,
  },
  infoButton: {
    backgroundColor: '#dededf',
    borderWidth: 0,
    height: '100%',
    width: '100%',
  },
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

    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick() {
    const node = findDOMNode(this.graph);
    const parentNode = node.parentNode;
    const parentBoundClientRect = parentNode.getBoundingClientRect();
    const { x = 0, y = 0 } = parentBoundClientRect;
    const data = {
      node,
      // lastX + deltaX === x
      x,
      y,
      deltaX: 0,
      deltaY: 0,
      lastX: x,
      lastY: y,
    };

    console.log(data);
  }

  render() {
    const {
      connectDragSource,
      data,
      handleFormatTimestamp,
      index,
      isDragging,
      labels,
      width,
    } = this.props;

    return connectDragSource(
      <div
        ref={graph => this.graph = graph}
        style={style.cardBlock}
      >
        <div
          style={{
            ...style.cardHeader,
            cursor: isDragging ? 'grabbing' : 'move',
          }}
        >
          <div style={style.cardHeaderTitle}>
            Dygraph Graph With React Example! {index}
            {isDragging && ' (and I am being dragged now)'}
          </div>
          <div style={style.cardHeaderTool}>
            <button
              onClick={this.handleOnClick}
              style={style.infoButton}
              type="button"
            >
              Info
            </button>
          </div>
        </div>
        <DygraphsGraph
          data={data}
          index={index}
          formatTimestamp={handleFormatTimestamp}
          labels={labels}
          width={width}
        />
      </div>
    );
  }
};

export default DragSource('GRAPH', dragSourceSpec, dragSourceCollect)(GraphCard);
