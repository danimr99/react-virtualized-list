import { memo } from "react";
import PropTypes from "prop-types";

import { useVirtualization, useIntersection } from "../hooks";

import "./VirtualizedInfiniteList.css";

export const VirtualizedInfiniteList = memo(function VirtualizedInfiniteList({
  items = [],
  visibleItemsCount = 5,
  allowSmoothTransition = true,
  renderItem,
  onReachEnd,
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

  const observerRef = useIntersection({
    callback: onReachEnd,
    options: { rootMargin: "100px" },
  });

  return (
    <>
      <div
        style={{ height: `${containerHeight + 1}px`, overflowY: "scroll" }}
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

        <div ref={observerRef} className="infinite-scroll" />
      </div>
    </>
  );
});

VirtualizedInfiniteList.propTypes = {
  items: PropTypes.array.isRequired,
  visibleItemsCount: PropTypes.number,
  allowSmoothTransition: PropTypes.bool,
  renderItem: PropTypes.func.isRequired,
  onReachEnd: PropTypes.func,
};
