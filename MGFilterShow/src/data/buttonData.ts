import RCeye from '../images/RCeye.png';
import MUSTACHE from '../images/mustache.png';
import BALD from '../images/mumuri.png';
import MINIONS from '../images/minions.png';
import SMILE from '../images/smileMouth2.png';

export const buttonData = [
    { buttonText: '눈 필터 적용', filterPath: RCeye,filterType:'eyeFilter' },
    { buttonText: '머리 필터 적용', filterPath: BALD,filterType:'baldFilter' },
    { buttonText: '수염 필터 적용', filterPath: MUSTACHE,filterType:'mustacheFilter' },
    { buttonText: '얼굴외각 필터 적용', filterPath: MINIONS,filterType:'faceOutlineFilter' },
    { buttonText: '입 필터 적용', filterPath: SMILE,filterType:'mouthFilter' },
    { buttonText: '코 왜곡 필터 적용',filterType:'noseEnlarge' },
    { buttonText: '입 왜곡 필터 적용',filterType:'smile' },
    { buttonText: '이마 왜곡 필터 적용',filterType:'foreHead' },
    // 원하는 만큼 버튼을 추가할 수 있습니다.
];