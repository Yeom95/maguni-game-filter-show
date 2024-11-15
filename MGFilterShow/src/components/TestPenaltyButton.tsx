import { useState } from 'react';
import { loadDetectionModel } from '../utils/load-detection-model';
import { estimateFacesLoop } from '../utils/estimateFacesLoop';
import { FaceLandmarksDetector } from '@tensorflow-models/face-landmarks-detection';
import Webcam from 'react-webcam';

function TestPenaltyButton(
    buttonText:string,
    filterPath:string,
    canvas:CanvasRenderingContext2D,
    webcamRef:React.RefObject<Webcam>,
    videoSize:{ width: number; height: number },
) {

    const [status, setStatus] = useState<'Initializing...' | 'Load Model...' | 'Model Loaded'>('Initializing...');

    const setFilter = () => {

        const image = new Image();
        image.src = filterPath;

        setStatus('Load Model...');

        loadDetectionModel().then((model: FaceLandmarksDetector) => {
            setStatus('Model Loaded');
            requestAnimationFrame(() =>
                estimateFacesLoop(model, image, canvas, webcamRef, videoSize),
            );
        });
    };



    return (
        <>
            <button id = "penaltyTestButton" onClick={() => setFilter()}>{buttonText}</button>
        </>
    );
}

export default TestPenaltyButton;
