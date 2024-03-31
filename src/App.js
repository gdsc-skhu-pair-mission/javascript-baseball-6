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
  const userAnswer = await InputAnswer();
  const [strike, ball] = CompareAnswer(answer, userAnswer);

  if (strike === 3) {
    Console.print('3스트라이크');
    Console.print('3개의 숫자를 모두 맞히셨습니다! 게임 종료');

    // 여기에 재시작 함수를 추가
  }
  if (strike === 0 && ball === 0) {
    Console.print('낫싱');
  }
  if (ball > 0 || ball < 3) {
    if (strike > 0 || strike < 3) {
      Console.print(`${ball}볼 ${strike}스트라이크`);
    }
  }
}

class App {
  // 아직 this를 사용하지않아서 임시로 에러를 해결하기 위해 eslint-disable를 사용하였습니다.
  // eslint-disable-next-line class-methods-use-this
  async play() {
    Console.print('숫자 야구 게임을 시작합니다.');
    const correctAnswer = RandomAnswer();
    const userAnswer = await InputAnswer();
    await CompareAnswer(correctAnswer, userAnswer);
  }
}
const game = new App();
game.play();

export default App;
