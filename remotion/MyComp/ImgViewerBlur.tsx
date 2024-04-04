import { useCurrentFrame, interpolate, Img, AbsoluteFill } from "remotion";
import { cursorImg } from "../../types/constants";

export const ImgViewerBlur = ({ img }) => {
  const frame = useCurrentFrame();
  const totalDuration = 160; // Updated total duration

  // Updated interpolation for position with the new duration
  const startX = interpolate(
    frame,
    [0, totalDuration],
    [parseFloat(img.start.x), parseFloat(img.end.x)]
  );
  const startY = interpolate(
    frame,
    [0, totalDuration],
    [parseFloat(img.start.y), parseFloat(img.end.y)]
  );

  // Updated opacity interpolation for fade in/out over 160 frames
  const fadeInEnd = totalDuration * 0.1;
  const fadeOutStart = totalDuration * 0.9;
  const opacity = interpolate(
    frame,
    [0, fadeInEnd, fadeOutStart, totalDuration],
    [0, 1, 1, 0]
  );

  // Adjusting the trail effect or any other custom animation effect to the new duration
  const trailLength = 10; // For the trail effect
  const trail = Array.from({ length: trailLength }).map((_, index) => {
    const delay = index * (160 / trailLength); // Adjust delay based on new duration
    const trailFrame = frame - delay;

    const trailX = interpolate(
      trailFrame,
      [0, totalDuration],
      [parseFloat(img.start.x), parseFloat(img.end.x)]
    );
    const trailY = interpolate(
      trailFrame,
      [0, totalDuration],
      [parseFloat(img.start.y), parseFloat(img.end.y)]
    );
    const trailOpacity = interpolate(trailFrame, [0, totalDuration], [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

    return (
      <AbsoluteFill
        key={index}
        style={{
          opacity: trailOpacity,
          filter: `blur(${index * (totalDuration / 160)}px)`,
        }}
      >
        <AbsoluteFill
          style={{
            width: "10px",
            height: "10px",
            top: `${trailY}px`,
            left: `${trailX}px`,
            backgroundColor: "red",
          }}
        >
          <Img src={cursorImg} style={{ width: "100%", height: "100%" }}></Img>
        </AbsoluteFill>
      </AbsoluteFill>
    );
  });

  return (
    <AbsoluteFill>
      <Img src={img.src} style={{ width: "100%", height: "100%" }} />
      {trail}
    </AbsoluteFill>
  );
};
