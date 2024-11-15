import { useState, useRef, useEffect } from 'react';
import './App.css';
import Webcam from 'react-webcam';

const videoSize = {
    width: 640,
    height: 480,
};

function App() {
    const webcamRef = useRef<Webcam>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const initialLoadedRef = useRef<boolean>(false);

    useEffect(() => {
        const canvasContext = canvasRef.current?.getContext('2d');

        if (!canvasContext || initialLoadedRef.current) {return;}

        initialLoadedRef.current = true;
    }, []);

    return (
        <main>
            <div className='test-button-container'>

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
            <p className="status">{status}</p>
        </main>
    );
}

export default App;