import { Random, Console } from '@woowacourse/mission-utils';

function RandomAnswer() {
  const CORRECT_ANSWER = [];

  while (CORRECT_ANSWER.length < 3) {
    const number = Random.pickNumberInRange(1, 9);
    if (!CORRECT_ANSWER.includes(number)) {
      CORRECT_ANSWER.push(number);
    }
  }
  return CORRECT_ANSWER;
}

async function InputAnswer() {
  let userInput;
  let userAnswer;

  userInput = await Console.readLineAsync('숫자를 입력해주세요 : ');
  if (Number.isNaN(Number(userInput))) {
    throw new Error('숫자가 아닌 것을 입력하시면 안됩니다.');
  }
  if (userInput.length !== 3) {
    throw new Error('3자리 수를 입력해주세요.');
  }

  userAnswer = Array.from(userInput).map(Number);

  if (new Set(userAnswer).size !== userAnswer.length) {
    throw new Error('중복된 수를 입력하시면 안됩니다.');
  }
  if (userAnswer.some((number) => number < 1 || number > 9)) {
    throw new Error('1 ~ 9 사이의 수를 입력해주세요.');
  }

  return userAnswer;
}

async function CompareAnswer(CORRECT_ANSWER, userAnswer) {
  let strike = 0;
  let ball = 0;

  for (let i = 0; i < 3; i++) {
    if (userAnswer[i] === CORRECT_ANSWER[i]) strike++;
    else if (CORRECT_ANSWER.includes(userAnswer[i])) ball++;
  }
  return [strike, ball];
}

async function playNumberGame() {
  const answer = RandomAnswer();

  while (true) {
    // eslint-disable-next-line no-await-in-loop
    const userAnswer = await InputAnswer();
    // eslint-disable-next-line no-await-in-loop
    const [strike, ball] = await CompareAnswer(answer, userAnswer);
    let resultMessage = '';

    if (ball > 0) {
      resultMessage += `${ball}볼 `;
    }
    if (strike > 0) {
      resultMessage += `${strike}스트라이크`;
    }
    if (strike === 0 && ball === 0) {
      resultMessage = '낫싱';
    }
    Console.print(resultMessage);
    if (strike === 3) {
      Console.print('3개의 숫자를 모두 맞히셨습니다! 게임 종료');
      break;
    }
  }

  // 재시작 로직 추가
}

class App {
  // 아직 this를 사용하지않아서 임시로 에러를 해결하기 위해 eslint-disable를 사용하였습니다.
  // eslint-disable-next-line class-methods-use-this
  async play() {
    Console.print('숫자 야구 게임을 시작합니다.');
    await playNumberGame();
  }
}
const game = new App();
game.play();

export default App;
