import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Img,
  AbsoluteFill,
} from "remotion";

import { cursorImg } from "../../types/constants";
import { Trail } from "@remotion/motion-blur";

export const ImgViewer = ({ img }: { img: any }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Assuming each image sequence lasts for 80 frames
  const totalDuration = 160;
  // Calculate position for the moving element
  const startX = interpolate(
    frame,
    [0, totalDuration],
    [parseFloat(img?.start?.x), parseFloat(img?.end?.x)]
  );
  const startY = interpolate(
    frame,
    [0, totalDuration],
    [parseFloat(img?.start?.y), parseFloat(img?.end?.y)]
  );

  // console.log("startx and y", startX, startY);

  return (
    <AbsoluteFill style={{ opacity: 1 }}>
      {/* Using Remotion's Img tag for optimized image rendering */}
      <Img src={img.src} style={{ width: "100%", height: "100%" }} />

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
