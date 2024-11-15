import Webcam from 'react-webcam';
import { handleStartPenaltyFilter } from '../utils/startFilter';

// Props 타입 정의
type TestPenaltyButtonProps = {
    buttonText: string;
    filterPath: string;
    canvas: CanvasRenderingContext2D;
    webcamRef: React.RefObject<Webcam>;
    videoSize: { width: number; height: number };
    filterType:string;
};

function TestPenaltyButton({
    buttonText,
    filterPath,
    filterType,
}: TestPenaltyButtonProps) {

    const setFilter = () => {
        const image = new Image();
        image.src = filterPath;

        console.log('SET FILTER');

        handleStartPenaltyFilter({ image,filterType });
    };

    return (
        <>
            <button id="penaltyTestButton" onClick={() => setFilter()}>
                {buttonText}
            </button>
        </>
    );
}

export default TestPenaltyButton;