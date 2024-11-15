// src/utils/estimateFacesLoop.ts
import { FaceLandmarksDetector } from '@tensorflow-models/face-landmarks-detection';
import { calculateFilterPosition } from './calculate-filter-position';
import { loadDetectionModel } from '../utils/load-detection-model';
import { applyEnhancedLensDistortion,applyEnhancedMouthDistortion,stretchForehead } from './distortionFilter';

// interface VideoSize {
//     width: number;
//     height: number;
// }

// 얼굴 위치와 함께 이미지 애니메이션 추가
const IMG_WIDTH = 200;
const IMG_HEIGHT = 120;

interface Filter {
    yPosition: number;
    image: HTMLImageElement;
    filterType: string;
}

const activeFilters: Filter[] = [];

// 기존 필터 함수와 별개로 애니메이션을 위한 함수
function animateImage(ctx: CanvasRenderingContext2D,image: HTMLImageElement, x:number, yPosition:number) {
    ctx.drawImage(image, x - IMG_WIDTH / 2, yPosition, IMG_WIDTH, IMG_HEIGHT);
}

// 필터 추가 함수
export const handleStartPenaltyFilter = (filter: { image: HTMLImageElement; filterType: string }) => {
    const existingFilterIndex = activeFilters.findIndex((f) => f.filterType === filter.filterType);

    if (existingFilterIndex !== -1) {
        // 필터가 이미 활성화된 경우 제거
        activeFilters.splice(existingFilterIndex, 1);
    } else {
        // 필터가 활성화되지 않은 경우 추가
        const newFilter = { ...filter, yPosition: -IMG_HEIGHT };
        activeFilters.push(newFilter);
    }
};

export const startFilter = (
    ctx: CanvasRenderingContext2D,
    video: HTMLVideoElement,
) => {
    loadDetectionModel().then((model: FaceLandmarksDetector) => {
        const estimateFacesLoop = () => {
            model.estimateFaces(video).then((faces) => {
                // 필터가 적용된 영상은 `compositeCanvas`에 그리기
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                ctx.drawImage(video, 0, 0, ctx.canvas.width, ctx.canvas.height);

                if (faces[0]) {
                    activeFilters.forEach((filter) => {
                        const { x, y, width, height, angle } = calculateFilterPosition(filter.filterType, faces[0].keypoints);

                        switch (filter.filterType) {
                        case 'eyeFilter':
                        case 'mustacheFilter':
                        case 'baldFilter':
                        case 'mouthFilter':
                            // 기존 필터의 위치 계산
                            ctx.save();
                            ctx.translate(x + width / 2, y + height / 2);
                            ctx.rotate(angle);
                            ctx.drawImage(filter.image, -width / 2, -height / 2, width, height);
                            ctx.restore();
                            break;

                        case 'fallingImage':{
                            // 떨어지는 이미지 애니메이션
                            const fallPosition = faces[0].keypoints[10];
                            if (filter.yPosition < (fallPosition.y + 20))  {
                                filter.yPosition += 5; // 떨어지는 속도 조절
                            }
                            animateImage(ctx,filter.image, fallPosition.x, filter.yPosition);
                            break;
                        }

                        case 'faceOutlineFilter':
                            ctx.drawImage(filter.image,x,y,width,height);
                            break;

                        case 'noseEnlarge':
                            applyEnhancedLensDistortion(ctx,faces[0].keypoints);
                            break;

                        case 'smile':
                            applyEnhancedMouthDistortion(ctx,faces[0].keypoints);
                            break;

                        case 'foreHead':
                            stretchForehead(ctx,faces[0].keypoints);
                            break;

                        default:
                            console.warn(`Unknown filter type: ${filter.type}`);
                        }
                    });
                }

                requestAnimationFrame(estimateFacesLoop);
            });
        };
        requestAnimationFrame(estimateFacesLoop);
    });
};