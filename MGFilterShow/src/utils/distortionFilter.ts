import { Keypoint } from '@tensorflow-models/face-landmarks-detection/dist/shared/calculators/interfaces/common_interfaces';
function applyEnhancedMouthDistortion(ctx:CanvasRenderingContext2D, keypoints:Keypoint[]) {
    const mouthCenter = keypoints[13]; // 입 중심 좌표 (입을 나타내는 키포인트)
    const radius = 50; // 입 주변의 효과 범위 조정 반경
    const strength = 0.5; // 왜곡 강도 (값을 높일수록 왜곡이 강해짐)

    // 입 주변의 픽셀 데이터를 가져옵니다.
    const imageData = ctx.getImageData(
        mouthCenter.x - radius,
        mouthCenter.y - radius,
        radius * 2,
        radius * 2,
    );

    const data = imageData.data;
    const width = imageData.width;
    const height = imageData.height;
    const centerX = radius;
    const centerY = radius;

    // 왜곡된 픽셀 데이터를 저장할 새로운 버퍼 생성
    const outputData = new Uint8ClampedArray(data);

    // 왜곡 효과 적용
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const dx = x - centerX;
            const dy = y - centerY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < radius) {
                // 중심에서의 거리에 따라 왜곡 강도 계산
                const factor = 1 + strength * (1 - dist / radius);
                const newX = Math.floor(centerX + dx * factor);
                const newY = Math.floor(centerY + dy * factor);

                // 새 좌표가 이미지 경계를 벗어나지 않도록 제한
                if (newX >= 0 && newX < width && newY >= 0 && newY < height) {
                    const idx = (y * width + x) * 4;
                    const newIdx = (newY * width + newX) * 4;

                    // 왜곡된 위치로 색상 값을 이동 (outputData에 저장)
                    outputData[newIdx] = data[idx];
                    outputData[newIdx + 1] = data[idx + 1];
                    outputData[newIdx + 2] = data[idx + 2];
                    outputData[newIdx + 3] = data[idx + 3];
                }
            }
        }
    }

    // 왜곡된 데이터를 원본 imageData에 복사
    for (let i = 0; i < data.length; i++) {
        data[i] = outputData[i];
    }

    // 왜곡된 이미지 데이터를 캔버스에 다시 그립니다.
    ctx.putImageData(imageData, mouthCenter.x - radius, mouthCenter.y - radius);
}

function applyEnhancedLensDistortion(ctx:CanvasRenderingContext2D, keypoints:Keypoint[]) {
    const noseCenter = keypoints[4]; // 코 중심 좌표
    const radius = 80; // 효과 범위를 조정하는 반경
    const strength = 0.5; // 왜곡 강도 (값을 높일수록 왜곡이 강해짐)

    // 코 주변의 픽셀 데이터를 가져옵니다.
    const imageData = ctx.getImageData(
        noseCenter.x - radius,
        noseCenter.y - radius,
        radius * 2,
        radius * 2,
    );

    const data = imageData.data;
    const width = imageData.width;
    const height = imageData.height;
    const centerX = radius;
    const centerY = radius;

    // 왜곡된 픽셀 데이터를 저장할 새로운 버퍼 생성
    const outputData = new Uint8ClampedArray(data);

    // 왜곡 효과 적용
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const dx = x - centerX;
            const dy = y - centerY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < radius) {
                // 중심에서의 거리에 따라 왜곡 강도 계산
                const factor = 1 + strength * (1 - dist / radius);
                const newX = Math.floor(centerX + dx * factor);
                const newY = Math.floor(centerY + dy * factor);

                // 새 좌표가 이미지 경계를 벗어나지 않도록 제한
                if (newX >= 0 && newX < width && newY >= 0 && newY < height) {
                    const idx = (y * width + x) * 4;
                    const newIdx = (newY * width + newX) * 4;

                    // 왜곡된 위치로 색상 값을 이동 (outputData에 저장)
                    outputData[newIdx] = data[idx];
                    outputData[newIdx + 1] = data[idx + 1];
                    outputData[newIdx + 2] = data[idx + 2];
                    outputData[newIdx + 3] = data[idx + 3];
                }
            }
        }
    }

    // 왜곡된 데이터를 원본 imageData에 복사
    for (let i = 0; i < data.length; i++) {
        data[i] = outputData[i];
    }

    // 왜곡된 이미지 데이터를 캔버스에 다시 그립니다.
    ctx.putImageData(imageData, noseCenter.x - radius, noseCenter.y - radius);
}

function stretchForehead(ctx:CanvasRenderingContext2D, keypoints:Keypoint[]) {
    const foreheadCenter = keypoints[10]; // 이마 중심 좌표 (이마를 나타내는 키포인트)
    const radius = 60; // 이마 주변의 효과 범위 조정 반경
    const stretchFactor = 1.3; // 이마를 위쪽으로 늘리는 강도 (값을 높일수록 늘어남)

    // 이마 주변의 픽셀 데이터를 가져옵니다.
    const imageData = ctx.getImageData(
        foreheadCenter.x - radius,
        foreheadCenter.y - radius,
        radius * 2,
        radius * 2,
    );

    const data = imageData.data;
    const width = imageData.width;
    const height = imageData.height;
    const centerX = radius;
    const centerY = radius;

    // 왜곡된 픽셀 데이터를 저장할 새로운 버퍼 생성
    const outputData = new Uint8ClampedArray(data);

    // 이마를 위쪽으로 늘리는 왜곡 효과 적용
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const dx = x - centerX;
            const dy = y - centerY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < radius) {
                // 중심에서의 거리와 y 위치에 따라 위쪽으로 늘리는 강도 계산
                const factor = 1 + stretchFactor * (1 - dist / radius);
                const newX = Math.floor(centerX + dx);
                const newY = Math.floor(centerY + dy * factor);

                // 새 좌표가 이미지 경계를 벗어나지 않도록 제한
                if (newX >= 0 && newX < width && newY >= 0 && newY < height) {
                    const idx = (y * width + x) * 4;
                    const newIdx = (newY * width + newX) * 4;

                    // 왜곡된 위치로 색상 값을 이동 (outputData에 저장)
                    outputData[newIdx] = data[idx];
                    outputData[newIdx + 1] = data[idx + 1];
                    outputData[newIdx + 2] = data[idx + 2];
                    outputData[newIdx + 3] = data[idx + 3];
                }
            }
        }
    }

    // 왜곡된 데이터를 원본 imageData에 복사
    for (let i = 0; i < data.length; i++) {
        data[i] = outputData[i];
    }

    // 왜곡된 이미지 데이터를 캔버스에 다시 그립니다.
    ctx.putImageData(imageData, foreheadCenter.x - radius, foreheadCenter.y - radius);
}

export { applyEnhancedMouthDistortion, applyEnhancedLensDistortion, stretchForehead };