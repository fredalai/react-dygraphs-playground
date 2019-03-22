import React from 'react';

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

const GraphCard = ({
  data,
  handleFormatTimestamp,
  index,
  labels,
}) => {
  return (
    <div style={style.cardBlock}>
      <div style={style.cardHeader}>
        Dygraph Graph With React Example! {index}
      </div>
      <DygraphsGraph
        data={data}
        index={index}
        formatTimestamp={handleFormatTimestamp}
        labels={labels}
      />
    </div>
  );
};

export default GraphCard;
