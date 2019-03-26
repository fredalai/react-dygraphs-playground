import React from 'react';
import { DropTarget } from 'react-dnd';
import GraphCard from './GraphCard';

function dropTargetCollect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDropTarget: connect.dropTarget(),
    // You can ask the monitor about the current drag state:
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType(),
  }
}

const dropTargetSpec = {
  canDrop(props, monitor) {
    const item = monitor.getItem();
    const { index: currentPoistionId } = item;
    const { index: targetPoistionId } = props;

    return currentPoistionId !== targetPoistionId;
  },
  drop(props, monitor, component) {
    if (monitor.didDrop()) {
      // If you want, you can check whether some nested
      // target already handled drop
      return;
    }

    const item = monitor.getItem();
    const { index: currentPoistionId } = item;
    const { handleSortFakeData, index: targetPoistionId } = props;

    // Update data order
    handleSortFakeData(currentPoistionId, targetPoistionId);

    return { moved: true };
  },
}

const width = 800;
const style = {
  block: {
    width,
  },
};

const Graphs = ({
  connectDropTarget,
  data,
  handleFormatTimestamp,
  index,
  labels,
}) => connectDropTarget(
  <div
    key={index}
    style={style.block}
  >
    <GraphCard
      data={data}
      handleFormatTimestamp={handleFormatTimestamp}
      index={index}
      labels={labels}
      width={width - 50}
    />
  </div>
);

export default DropTarget('GRAPH', dropTargetSpec, dropTargetCollect)(Graphs);
