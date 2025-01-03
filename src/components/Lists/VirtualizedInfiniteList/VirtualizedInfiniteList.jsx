import { memo } from "react";
import PropTypes from "prop-types";

import { useVirtualization, useIntersection } from "../hooks";

import "./VirtualizedInfiniteList.css";

/**
 * VirtualizedInfiniteList.
 *
 * A virtualized infinite list component that renders a list of items with infinite scrolling.
 * The list is virtualized to render only the visible items at a time.
 *
 * The component uses the useVirtualization and useIntersection hooks to achieve virtualization and infinite
 * scrolling respectively.
 *
 * The useVirtualization hook calculates the visible items based on the scroll position and the number of items to render.
 * It also calculates the container height and item height to set the scrollable container's height.
 *
 * The useIntersection hook observes the infinite-scroll element to call the onReachEnd function when the element is intersecting.
 *
 * The component renders the list of items with the renderItem function.
 * The renderItem function is called for each item in the visible items list.
 * It also passes the firstItemRef to the first item in the visible items list to set the scroll position when scrolling.
 *
 * The component also renders the infinite-scroll element at the end of the list to observe the intersection for infinite scrolling.
 * The onReachEnd function is called when the infinite-scroll element is intersecting.
 *
 * @component
 * @param {Array} items - List of items to render.
 * @param {Number} visibleItemsCount - Number of items to render at a time.
 * @param {Boolean} allowSmoothTransition - Whether to allow smooth transition. It adds an extra item to the visible items
 *  list on transitioning between edge items.
 * @param {Function} renderItem - Function to render each item.
 * @param {Function} onReachEnd - Function to call when reaching the end of the list.
 *
 * @returns {JSX.Element}
 */
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
