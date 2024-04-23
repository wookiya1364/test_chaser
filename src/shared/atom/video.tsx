import { cn } from "@shared/cn";
import React from "react";

export interface VideoProps
  extends React.ObjectHTMLAttributes<HTMLVideoElement> {
  as?: TContainer;
  label?: string;
  poster: string;
}

const VideoComponent = React.forwardRef<HTMLVideoElement, VideoProps>(
  ({ className, children, as, label, poster, ...props }, ref) => {
    return (
      <video
        {...props}
        className={cn("h-full flex-col items-center", className)}
        poster={poster}
        preload={"auto"}
        crossOrigin={"anonymous"}
        controls={true}
        disablePictureInPicture={true}
        ref={ref}
      >
        <track kind="captions"></track>
      </video>
    );
  }
);

VideoComponent.displayName = "VideoComponent";
export { VideoComponent };
