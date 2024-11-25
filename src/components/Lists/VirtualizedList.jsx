import { memo } from "react";
import PropTypes from "prop-types";

import { useVirtualization } from "./hooks";

/**
 * VirtualizedList.
 *
 * A virtualized list component that renders a list of items.
 * The list is virtualized to render only the visible items at a time.
 *
 * The component uses the useVirtualization hook to achieve virtualization.
 *
 * The useVirtualization hook calculates the visible items based on the scroll position and the number of items to render.
 * It also calculates the container height and item height to set the scrollable container's height.
 *
 * The component renders the list of items with the renderItem function.
 * The renderItem function is called for each item in the visible items list.
 * It also passes the firstItemRef to the first item in the visible items list to set the scroll position when scrolling.
 *
 * @component
 * @param {Array} items - List of items to render.
 * @param {Number} visibleItemsCount - Number of items to render at a time.
 * @param {Boolean} allowSmoothTransition - Whether to allow smooth transition.
 * @param {Function} renderItem - Function to render each item.
 *
 * @returns {JSX.Element}
 */
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
