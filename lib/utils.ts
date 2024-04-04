import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function calculateTranslation(
  scale: any,
  targetPoint: any,
  imageWidth = 768,
  imageHeight = 432,
  containerWidth = 768,
  containerHeight = 432
): {} {
  // Calculate the scaled image size
  const scaledImageWidth = imageWidth * scale;
  const scaledImageHeight = imageHeight * scale;

  // Find the center of the target rectangle in the scaled image
  const targetCenterX = targetPoint.x * scale; //(targetRect.x + targetRect.width / 2) * scale;
  const targetCenterY = targetPoint.y * scale; //(targetRect.y + targetRect.height / 2) * scale;

  // Find the center of the container
  const containerCenterX = containerWidth / 2;
  const containerCenterY = containerHeight / 2;

  // Calculate the translation needed to align the center of the target rect with the center of the container
  let translateX = containerCenterX - targetCenterX;
  let translateY = containerCenterY - targetCenterY;

  // Ensure the image does not move beyond its container's bounds
  translateX = Math.min(translateX, 0);
  translateY = Math.min(translateY, 0);
  translateX = Math.max(translateX, containerWidth - scaledImageWidth);
  translateY = Math.max(translateY, containerHeight - scaledImageHeight);

  return { x: translateX, y: translateY };
}
