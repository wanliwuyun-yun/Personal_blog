"use client";

import { cn } from "@/lib/utils";
import { forwardRef, useRef } from "react";

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  pauseOnHover?: boolean;
  direction?: "horizontal" | "vertical";
  reverse?: boolean;
}

const Marquee = forwardRef<HTMLDivElement, MarqueeProps>(
  (
    {
      children,
      pauseOnHover = false,
      direction = "horizontal",
      reverse = false,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        {...props}
        className={cn(
          "group flex gap-4 overflow-hidden",
          direction === "vertical" && "flex-col",
          className
        )}
      >
        <div
          className={cn(
            "flex shrink-0 justify-around gap-4",
            direction === "horizontal" && "animate-marquee flex-row",
            direction === "vertical" && "animate-marquee-vertical flex-col",
            pauseOnHover && "group-hover:[animation-play-state:paused]",
            reverse && direction === "horizontal" && "[animation-direction:reverse]",
            reverse && direction === "vertical" && "[animation-direction:reverse]"
          )}
        >
          {children}
        </div>
        <div
          className={cn(
            "flex shrink-0 justify-around gap-4",
            direction === "horizontal" && "animate-marquee flex-row",
            direction === "vertical" && "animate-marquee-vertical flex-col",
            pauseOnHover && "group-hover:[animation-play-state:paused]",
            reverse && direction === "horizontal" && "[animation-direction:reverse]",
            reverse && direction === "vertical" && "[animation-direction:reverse]"
          )}
          aria-hidden="true"
        >
          {children}
        </div>
      </div>
    );
  }
);

Marquee.displayName = "Marquee";

export default Marquee;
