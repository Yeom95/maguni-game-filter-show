// src/utils/estimateFacesLoop.ts
import { FaceLandmarksDetector } from '@tensorflow-models/face-landmarks-detection';
import { calculateFilterPosition } from './calculate-filter-position';
import { RefObject } from 'react';
import Webcam from 'react-webcam';

interface VideoSize {
    width: number;
    height: number;
}

export const estimateFacesLoop = (
    model: FaceLandmarksDetector,
    image: HTMLImageElement,
    ctx: CanvasRenderingContext2D,
    webcamRef: RefObject<Webcam>,
    videoSize: VideoSize,
) => {
    const video = webcamRef.current?.video;

    if (!video) {return;}

    model.estimateFaces(video).then((face) => {
        ctx.clearRect(0, 0, videoSize.width, videoSize.height);

        if (face[0]) {
            const { x, y, width, height } = calculateFilterPosition(face[0].keypoints);
            ctx.drawImage(image, x, y, width, height);
        }

        requestAnimationFrame(() => estimateFacesLoop(model, image, ctx, webcamRef, videoSize));
    });
};