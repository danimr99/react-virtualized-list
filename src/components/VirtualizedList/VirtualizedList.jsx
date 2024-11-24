import { useCallback, useLayoutEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

export const VirtualizedList = ({
  items = [],
  visibleItemsCount = 5,
  allowSmoothTransition = true,
  renderItem,
}) => {
  const [scrollTop, setScrollTop] = useState(0);
  const [itemHeight, setItemHeight] = useState(1);
  const itemRef = useRef(null);

  const containerHeight = itemHeight * visibleItemsCount;
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    startIndex + visibleItemsCount + (allowSmoothTransition ? 1 : 0),
    items.length
  );

  const visibleItems = items.slice(startIndex, endIndex);

  const handleScroll = useCallback((event) => {
    setScrollTop(event.target.scrollTop);
  }, []);

  useLayoutEffect(() => {
    if (itemRef.current) {
      setItemHeight(itemRef.current.clientHeight);
    }
  }, [itemRef]);

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
            top: `${startIndex * itemHeight}px`,
          }}
        >
          {visibleItems.map((item, index) => {
            return renderItem(item, index === 0 ? itemRef : null, index);
          })}
        </div>
      </div>
    </div>
  );
};

VirtualizedList.propTypes = {
  items: PropTypes.array.isRequired,
  visibleItemsCount: PropTypes.number,
  allowSmoothTransition: PropTypes.bool,
  renderItem: PropTypes.func.isRequired,
};
