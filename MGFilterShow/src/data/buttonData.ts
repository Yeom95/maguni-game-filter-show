import RCeye from '../images/RCeye.png';
import MUSTACHE from '../images/mustache.png';
import BALD from '../images/mumuri.png';
import MINIONS from '../images/minions.png';
import SMILE from '../images/smileMouth2.png';
import DISH from '../images/dish.png';

export const buttonData = [
    { buttonText: '눈 필터 적용', filterPath: RCeye,filterType:'eyeFilter' },
    { buttonText: '머리 필터 적용', filterPath: BALD,filterType:'baldFilter' },
    { buttonText: '수염 필터 적용', filterPath: MUSTACHE,filterType:'mustacheFilter' },
    { buttonText: '얼굴외각 필터 적용', filterPath: MINIONS,filterType:'faceOutlineFilter' },
    { buttonText: '입 필터 적용', filterPath: SMILE,filterType:'mouthFilter' },
    { buttonText: '접시 벌칙 적용', filterPath: DISH,filterType:'fallingImage' },
    // 원하는 만큼 버튼을 추가할 수 있습니다.
];