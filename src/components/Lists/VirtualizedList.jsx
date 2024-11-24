import { memo } from "react";
import PropTypes from "prop-types";

import { useVirtualization } from "./hooks";

export const VirtualizedList = memo(function VirtualizedList({
  items = [],
  visibleItemsCount = 5,
  allowSmoothTransition = true,
  renderItem,
}) {
  const {
    firstItemRef,
    containerHeight,
    itemHeight,
    visibleStartIndex,
    visibleItems,
    handleScroll,
  } = useVirtualization({
    items,
    visibleItemsCount,
    allowSmoothTransition,
  });

  return (
    <div
      style={{ height: `${containerHeight}px`, overflowY: "scroll" }}
      onScroll={handleScroll}
    >
      <div style={{ height: `${items.length * itemHeight}px` }}>
        <div
          style={{
            position: "relative",
            height: `${visibleItems.length * itemHeight}px`,
            top: `${visibleStartIndex * itemHeight}px`,
          }}
        >
          {visibleItems.map((item, index) => {
            return renderItem(item, index === 0 ? firstItemRef : null, index);
          })}
        </div>
      </div>
    </div>
  );
});

VirtualizedList.propTypes = {
  items: PropTypes.array.isRequired,
  visibleItemsCount: PropTypes.number,
  allowSmoothTransition: PropTypes.bool,
  renderItem: PropTypes.func.isRequired,
};
