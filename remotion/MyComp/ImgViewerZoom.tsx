import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Img,
  AbsoluteFill,
  spring,
} from "remotion";

import { cursorImg } from "../../types/constants";
import { Trail } from "@remotion/motion-blur";

export const ImgViewerZoom = ({ img }: { img: any }) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  // Example zoom levels and focus points for two images
  const zoomStart = 1; // Starting zoom level (e.g., no zoom)
  const zoomEnd = 1.3; // Ending zoom level (130%)
  const focusStart = { x: img.start.focusX, y: img.start.focusY };
  const focusEnd = { x: img.end.focusX, y: img.end.focusY };

  // Spring configurations
  const springConfig = {
    stiffness: 100,
    damping: 20,
  };

  // Calculate spring animations
  const zoom = spring({
    frame,
    fps,
    config: springConfig,
    from: zoomStart,
    to: zoomEnd,
    durationInFrames,
  });

  // Calculate pan positions with spring
  const panX = spring({
    frame,
    fps,
    config: springConfig,
    from: -focusStart.x * (zoomStart - 1),
    to: -focusEnd.x * (zoomEnd - 1),
    durationInFrames,
  });

  const panY = spring({
    frame,
    fps,
    config: springConfig,
    from: -focusStart.y * (zoomStart - 1),
    to: -focusEnd.y * (zoomEnd - 1),
    durationInFrames,
  });

  // Ensure the pan does not go beyond the image edges
  // This requires knowing the dimensions of your container and images
  // For simplicity, let's assume a 1000x1000px image in a 1000x1000px container for this example
  const maxPanX = (1000 * zoom - 1000) / 2;
  const maxPanY = (1000 * zoom - 1000) / 2;

  const safePanX = Math.min(maxPanX, Math.max(panX, -maxPanX));
  const safePanY = Math.min(maxPanY, Math.max(panY, -maxPanY));

  const startX = spring({
    frame: frame,
    fps: fps,
    config: springConfig,
    from: parseFloat(img?.start?.x),
    to: parseFloat(img?.end?.x),
    durationInFrames: durationInFrames,
  });

  const startY = spring({
    frame: frame,
    fps: fps,
    config: springConfig,
    from: parseFloat(img?.start?.y),
    to: parseFloat(img?.end?.y),
    durationInFrames: durationInFrames,
  });

  return (
    <AbsoluteFill style={{ opacity: 1 }}>
      {/* Using Remotion's Img tag for optimized image rendering */}
      <Img
        src={img.src}
        style={{
          width: "100%",
          height: "100%",
          transform: `translate(${safePanX}px, ${safePanY}px)`,
        }}
      />

      <AbsoluteFill
        style={{
          width: "50px",
          height: "60px",
          // top: `${10}px`,
          // left: `${100}px`,
          top: `${startY}px`,
          left: `${startX}px`,
          backgroundColor: "blue",
        }}
      >
        <Img src={cursorImg} style={{ width: "100%", height: "100%" }}></Img>
        {/* You can place any content or just leave it empty if you want to move a dot */}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
