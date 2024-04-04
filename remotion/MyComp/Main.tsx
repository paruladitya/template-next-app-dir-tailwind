import { z } from "zod";
import {
  AbsoluteFill,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { CompositionProps } from "../../types/constants";
import { NextLogo } from "./NextLogo";
import { loadFont, fontFamily } from "@remotion/google-fonts/Inter";
import React from "react";
import { Rings } from "./Rings";
import { TextFade } from "./TextFade";
import { ImgViewer } from "./ImgViewer";
import { ImgViewerBlur } from "./ImgViewerBlur";

loadFont();

let imgArr = [
  {
    src: "https://ximg.20paths.com/a45eaa8b-3ddf-4218-954d-97851d5dc2aa/af679e64-c186-4915-842b-c730ccc141eb.jpeg",
    start: { x: 100, y: 50 },
    end: { x: 405.1134, y: 93.6453 },
  },
  {
    src: "https://ximg.20paths.com/a45eaa8b-3ddf-4218-954d-97851d5dc2aa/77fd3bc1-1a95-4a25-8020-3fc34d96714c.jpeg",
    start: { x: 405.1134, y: 93.6453 },
    end: { x: 707, y: 242 },
  },
  {
    src: "https://ximg.20paths.com/a45eaa8b-3ddf-4218-954d-97851d5dc2aa/12adc038-8701-4331-aa51-27c26e7aadd3.jpeg",
    start: { x: 707, y: 242 },
    end: { x: 787, y: 336 },
  },
  {
    src: "https://ximg.20paths.com/a45eaa8b-3ddf-4218-954d-97851d5dc2aa/4b6094ff-f8ed-4700-80b2-82e060b6d8cc.jpeg",
    start: { x: 787, y: 336 },
    end: { x: 1248, y: 653 },
  },
  {
    src: "https://ximg.20paths.com/a45eaa8b-3ddf-4218-954d-97851d5dc2aa/9ef767ae-3f4a-464e-9c55-f80aa51c7d3f.jpeg",
    end: { x: 1248, y: 653 },
    end: { x: 1178, y: 101 },
  },
];

export const Main = ({ title }: z.infer<typeof CompositionProps>) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const transitionStart = 2 * fps;
  const transitionDuration = 1 * fps;

  const logoOut = spring({
    fps,
    frame,
    config: {
      damping: 200,
    },
    durationInFrames: transitionDuration,
    delay: transitionStart,
  });
  console.log(
    "transitions",
    transitionStart,
    transitionDuration,
    transitionStart + transitionDuration,
    transitionStart + transitionDuration / 2,
    (transitionStart + transitionDuration) * 2
  );

  return (
    <AbsoluteFill className="bg-white">
      <Sequence durationInFrames={transitionStart + transitionDuration}>
        <Rings outProgress={logoOut}></Rings>
        <AbsoluteFill className="justify-center items-center">
          <NextLogo outProgress={logoOut}></NextLogo>
        </AbsoluteFill>
      </Sequence>
      {imgArr.map((img, i) => (
        <Sequence
          from={
            i === 0
              ? transitionStart + transitionDuration
              : transitionStart + transitionDuration + i * 160
          }
          durationInFrames={160}
          key={i}
        >
          <ImgViewer img={img}></ImgViewer>
          {/* <ImgViewerBlur img={img}></ImgViewerBlur> */}
        </Sequence>
      ))}
      {/* <Sequence from={transitionStart + transitionDuration / 2}>
        <TextFade>
          <h1
            className="text-[70px] font-bold"
            style={{
              fontFamily,
            }}
          >
            {title}
          </h1>
        </TextFade>
      </Sequence> */}
    </AbsoluteFill>
  );
};
