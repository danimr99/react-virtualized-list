import { useEffect, useRef } from "react";

/**
 * Custom hook to observe an element's intersection with the viewport
 *
 * @function useIntersection
 *
 * @param {Function} callback - Function to be called when the element is intersecting.
 * @param {Object} options - Options for the IntersectionObserver.
 * @param {Element} options.root - The element that is used as the viewport for checking visibility of the target.
 *  Must be the ancestor of the target. Defaults to the browser viewport if not specified or if null.
 * @param {String} options.rootMargin - Margin around the root. Values are similar to CSS property margin
 * @param {Number} options.threshold - A number between 0 and 1 which indicates at what percentage of the target's visibility
 *  the observer's callback should be executed.
 *
 * @returns {Object} Ref object to be attached to the element to be observed.
 */
export const useIntersection = ({
  callback,
  options: { root = null, rootMargin = "0px", threshold = 0 },
}) => {
  const observerRef = useRef(null);

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (callback) {
            callback();
          }
        }
      },
      { root, rootMargin, threshold }
    );

    const currentRef = observerRef.current;

    if (currentRef) {
      intersectionObserver.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        intersectionObserver.unobserve(currentRef);
      }
    };
  }, [callback, root, rootMargin, threshold]);

  return observerRef;
};
