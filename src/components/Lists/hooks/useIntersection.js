import { useEffect, useRef } from "react";

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
