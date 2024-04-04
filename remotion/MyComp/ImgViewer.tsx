import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Img,
  AbsoluteFill,
  spring,
} from "remotion";

import { cursorImg } from "../../types/constants";
import { calculateTranslation } from "../../lib/utils";
import { useEffect, useState } from "react";

export const ImgViewer = ({ img, i }: { img: any; i: number }) => {
  const frame = useCurrentFrame();
  const [startPoint, setStartPoint] = useState<any>({ x: 0, y: 0 });
  const [endPoint, setEndPoint] = useState<any>({ x: 0, y: 0 });
  const { durationInFrames, fps } = useVideoConfig();

  const transformOrigin = "top left";

  const scale = spring({
    frame,
    fps,
    config: {
      damping: 18,
      mass: 1.5,
      stiffness: 36,
    },
    overshootClamping: true,
    durationInFrames: 160,
    from: i === 0 ? 1 : 1.6,
    to: 1.6,
  });

  const movementProgress = spring({
    frame: frame, // This could be the current frame or another counter
    fps: fps,
    config: { damping: 18, mass: 1.5, stiffness: 36 },
    from: 0,
    to: 1,
    durationInFrames,
  });

  useEffect(() => {
    const sp: any = calculateTranslation(1.6, {
      x: img.start.x,
      y: img.start.y,
    });

    const ep: any = calculateTranslation(1.6, {
      x: img.end.x,
      y: img.end.y,
    });

    setStartPoint(sp);
    setEndPoint(ep);
  }, [img]);

  const positionX = interpolate(
    movementProgress,
    [0, 1],
    [startPoint.x, endPoint.x]
  ); // X: 0 -> 500
  const positionY = interpolate(
    movementProgress,
    [0, 1],
    [startPoint.y, endPoint.y]
  ); // Y: 0 -> 500

  return (
    <AbsoluteFill style={{ opacity: 1 }}>
      {/* Using Remotion's Img tag for optimized image rendering */}
      <Img
        src={img.src}
        style={{
          width: "100%",
          height: "100%",
          transformOrigin: transformOrigin,
          // transform: `${scale} ${translate}`,
          transform: `scale(${scale}) translate(${positionX}px, ${positionY}px)`,
        }}
      />
      <MovingDiv img={img} />
    </AbsoluteFill>
  );
};

const MovingDiv = ({ img }: { img: any }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Use the spring function to animate
  const progress = spring({
    frame: frame,
    fps: fps,
    config: {
      damping: 200,
      stiffness: 100,
      mass: 1,
    },
    durationInFrames: 130,
  });

  // Calculate position based on progress
  const positionX = interpolate(progress, [0, 1], [img.start.x, img.end.x]); // X: 0 -> 500
  const positionY = interpolate(progress, [0, 1], [img.start.y, img.end.y]); // Y: 0 -> 500

  return (
    <AbsoluteFill
      style={{
        width: 70,
        height: 84,
        // backgroundColor: "royalblue",
        transform: `translate(${positionX}px, ${positionY}px)`,
      }}
    >
      <Img src={cursorImg} style={{ width: "100%", height: "100%" }}></Img>
    </AbsoluteFill>
  );
};
