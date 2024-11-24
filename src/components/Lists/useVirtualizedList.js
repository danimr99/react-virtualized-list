import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";

export const useVirtualizedList = ({
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
    visibleItems,
    handleScroll,
  };
};
