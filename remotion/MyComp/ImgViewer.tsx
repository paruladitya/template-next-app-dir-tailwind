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

export const ImgViewer = ({ img, i }: { img: any; i: number }) => {
  const frame = useCurrentFrame();
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

  const { translateX, translateY }: any = calculateTranslation(1.6, {
    x: img.end.x,
    y: img.end.y,
  });

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
          transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`,
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
