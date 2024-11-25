import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";

/**
 * Custom hook for a list virtualization.
 *
 * @function useVirtualization
 *
 * @param {Object} options - Options object.
 * @param {Array} options.items - List of items.
 * @param {Number} options.visibleItemsCount - Number of visible items.
 * @param {Boolean} options.allowSmoothTransition - Allow smooth transition.
 *
 * @returns {Object} Object with virtualization props.
 * - {Object} firstItemRef - Reference to the first item.
 * - {number} containerHeight - Height of the container.
 * - {number} itemHeight - Height of the item.
 * - {number} visibleStartIndex - Start index of the visible items.
 * - {number} visibleEndIndex - End index of the visible items.
 * - {Array} visibleItems - List of visible items.
 * - {Function} handleScroll - Scroll event handler.
 */
export const useVirtualization = ({
  items = [],
  visibleItemsCount,
  allowSmoothTransition,
}) => {
  const [scrollTop, setScrollTop] = useState(0);
  const [itemHeight, setItemHeight] = useState(1);
  const firstItemRef = useRef(null);

  const containerHeight = useMemo(
    () => itemHeight * visibleItemsCount,
    [itemHeight, visibleItemsCount]
  );

  const visibleStartIndex = useMemo(
    () => Math.floor(scrollTop / itemHeight),
    [scrollTop, itemHeight]
  );

  const visibleEndIndex = useMemo(
    () =>
      Math.min(
        visibleStartIndex + visibleItemsCount + (allowSmoothTransition ? 1 : 0),
        items.length
      ),
    [visibleStartIndex, visibleItemsCount, items.length, allowSmoothTransition]
  );

  const visibleItems = useMemo(
    () => items.slice(visibleStartIndex, visibleEndIndex),
    [items, visibleStartIndex, visibleEndIndex]
  );

  const handleScroll = useCallback((event) => {
    setScrollTop(event.target.scrollTop);
  }, []);

  useLayoutEffect(() => {
    if (firstItemRef.current) {
      setItemHeight(firstItemRef.current.clientHeight);
    }
  }, []);

  return {
    firstItemRef,
    containerHeight,
    itemHeight,
    visibleStartIndex,
    visibleEndIndex,
    visibleItems,
    handleScroll,
  };
};
