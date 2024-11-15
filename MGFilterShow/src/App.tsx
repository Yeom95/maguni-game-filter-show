import { useRef, useEffect, useState } from 'react';
import './App.css';
import Webcam from 'react-webcam';
import { buttonData } from './data/buttonData';
import TestPenaltyButton from './components/TestPenaltyButton';
import { startFilter } from './utils/startFilter';

const videoSize = {
    width: 640,
    height: 480,
};

function App() {
    const webcamRef = useRef<Webcam>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const initialLoadedRef = useRef<boolean>(false);
    const canvasContext = useRef<CanvasRenderingContext2D | null>(null);
    const [isCanvasReady, setIsCanvasReady] = useState(false); // canvas 상태 관리

    useEffect(() => {
        if (canvasRef.current) {
            canvasContext.current = canvasRef.current.getContext('2d');
        }

        if (!canvasContext.current || initialLoadedRef.current) {return;}

        initialLoadedRef.current = true;
        setIsCanvasReady(true); // canvasContext가 설정되었음을 표시

        // Webcam의 비디오 요소 가져오기
        const video = webcamRef.current?.video;

        startFilter(canvasContext.current,video);
    }, []);

    return (
        <main>
            <div className='test-button-container'>
                {isCanvasReady && buttonData.map((button, index) => (
                    <TestPenaltyButton
                        key={index}
                        buttonText={button.buttonText}
                        filterPath={button.filterPath}
                        canvas={canvasContext.current!}
                        webcamRef={webcamRef}
                        videoSize={videoSize}
                        filterType={button.filterType}
                    />
                ))}
            </div>
            <div className="webcam-container">
                <Webcam
                    width={videoSize.width}
                    height={videoSize.height}
                    ref={webcamRef}
                />
                <canvas
                    width={videoSize.width}
                    height={videoSize.height}
                    ref={canvasRef}
                    className="filter-canvas"
                />
            </div>
        </main>
    );
}

export default App;