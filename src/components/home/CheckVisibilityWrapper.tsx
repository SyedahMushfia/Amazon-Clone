import { useState, useEffect, useRef, ReactNode } from "react";
import LoadingCircle from "./LoadingCircle";

interface Props {
  children: ReactNode;
}

function CheckVisibilityWrapper({ children }: Props) {
  //State to track whether the target element is visible on the screen.
  const [isVisible, setIsVisible] = useState(false);

  // Reference to the target element.
  const targetRef = useRef<HTMLDivElement | null>(null);

  let options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.3,
  };

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];

      setIsVisible(entry.isIntersecting);
    };

    let observer = new IntersectionObserver(handleIntersection, options);

    // To track the visibility of the target element and stop tracking once the element is visible.
    if (isVisible) {
      observer.disconnect();
      return;
    }

    if (targetRef.current && !isVisible) observer.observe(targetRef.current);

    return () => observer.disconnect();
  }, [isVisible]);

  return <div ref={targetRef}>{isVisible ? children : <LoadingCircle />}</div>;
}

export default CheckVisibilityWrapper;
